const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')
const User = require('../models/user')


//new route
router.get('/new', (req, res) => {
	let message = req.session.message
	req.session.message = ''

	if (req.session.username){
		res.render('photos/new.ejs', {message: message})
	}
	else {
		req.session.message = 'You must be logged in to view that page'
		res.redirect('/auth/login')
	}
	
})

//create route
router.post('/', async (req, res, next) => {
	
	try {
		
		const photoInfo = req.body
		photoInfo.user = req.session.username
		//add the user to the new photo
		const createdPhoto = await Photo.create(req.body)
		//find user with session, update user with new photo to array
		const foundUser = await User.findById(req.session.userId)
		foundUser.photos.push(createdPhoto._id)
		//get user, push photo into its array
		const updateResult = await User.update({_id: req.session.userId}, foundUser, {new: true})
		req.session.message = 'Photo Successfully Created'
		res.redirect('/')

	}
	catch(err){

		next(err)
	}

})


//index route
router.get('/', async (req, res, next) => {
	const message = req.session.message
	req.session.message = ''
	const foundPhotos = await Photo.find({})
	res.render('photos/index.ejs',{photos: foundPhotos, message: message} )
})

//show route
router.get('/:id', async (req, res, next) => {
	
	const foundPhoto = await Photo.findById(req.params.id)
	res.render('photos/show.ejs', { photo: foundPhoto})
})


//edit route

router.get('/:id/edit', async (req, res, next) => {
	const message = req.session.message
	req.session.message = ''

	//find photo to edit
	try {
		
		const foundPhoto = await Photo.findById(req.params.id)
		res.render('photos/edit.ejs', {photo: foundPhoto, message: message})
	}
	catch(err){
		next(err)
	}

	

})


//update route
router.put('/:id', async (req, res, next) => {
	
	try {
		const updatedPhoto = await Photo.update({_id: req.params.id}, req.body, {new: true})
		res.redirect(`/photos/${req.params.id}`)
	}
	catch(err){

		next(err)
	}
})

//delete route
router.delete('/:id', async (req, res, next) => {
	
	try {

		const deletedPhoto = await Photo.findByIdAndRemove(req.params.id)
		req.session.message = 'Photo deleted successfully'
		res.redirect('/photos')
	}
	catch(err){


	}
})












module.exports = router