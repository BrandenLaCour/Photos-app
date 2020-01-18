const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const User = require('../models/user')


router.get('/register', (req, res) => {
	
	res.render('auth/new.ejs')
})

router.post('/register', async (req, res, next) => {

	try {
		const createdUser = await User.create(req.body)
		req.session.message = 'thanks for creating an account!'
		res.redirect('/')
	} catch(err) {
		next(err)

	}
	
})



















module.exports = router