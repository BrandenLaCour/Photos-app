const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')
const User = require('../models/user')



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

router.post('/', async (req, res, next) => {
	
	try {
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





















module.exports = router