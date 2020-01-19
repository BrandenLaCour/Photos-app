const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/register', (req, res) => {
	const message = req.session.message
	req.session.message = ''
	res.render('auth/new.ejs', {message: message})
})

router.post('/register', async (req, res, next) => {

	try {
		const foundUser = await User.findOne({username: req.body.username})
		if (!foundUser){
			const createdUser = await User.create(req.body)
			req.session.message = 'Thanks for creating an account!'
			res.redirect('/')
				
		}
		else {
			req.session.message = 'Username already taken'
			res.redirect('/auth/register')
		}
		
	} catch(err) {
		next(err)
	}
	
})


router.get('/login', async (req, res) => {

	res.render('auth/login.ejs')
})



router.post('/login', async (req, res, next) => {

	try {

	











		res.redirect('/')
	}
	catch(err){
		next(err)
	}

})

















module.exports = router