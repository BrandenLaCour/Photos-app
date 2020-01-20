const express = require('express')
const router = express.Router()
const User = require('../models/user')

//index page
router.get('/', async (req, res, next) => {
	const message = req.session.message
	req.session.message = ''

	try {
		console.log('ran users find');
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
		res.render('users/show.ejs', {user: foundUser, photos: foundUser.photos})
	}
	catch(err){
		next(err)

	}
})



























module.exports = router