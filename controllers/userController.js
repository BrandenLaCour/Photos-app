const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Photo = require('../models/photo')
//index page
router.get('/', async (req, res, next) => {
	const message = req.session.message
	req.session.message = ''

	try {
	
		const usersFound = await User.find({})
		res.render('users/index.ejs', {users: usersFound, message: message})
	}
	catch(err){
		next(err)

	}
	
})

//show page
router.get('/:id', async (req, res, next) => {
	
	try {
		//find user, then access photos array
		const foundUser = await User.findById(req.params.id).populate('photos')
		res.render('users/show.ejs', {user: foundUser, photos: foundUser.photos, username: req.session.username})
	}
	catch(err){
		next(err)

	}
})

//delete

router.delete('/:id', async (req, res, next) => {
	
	try {
		//find user, delete all photos associated with user, then delete user
		const foundUser = await User.findById(req.params.id)
		const removedPhotos = await Photo.remove({user: foundUser.username})
		const removedUser = await User.findByIdAndRemove(req.params.id)
		req.session.message = 'Account has been deleted'
		res.redirect('/')
	}
	catch(err){
		next(err)
	}
})























module.exports = router