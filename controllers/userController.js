const express = require('express')
const router = express.Router()
const User = require('../models/user')

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





























module.exports = router