const express = require('express')
const router = express.Router()





router.get('/new', (req, res) => {
	const message = req.session.message
	req.session.message = ''
	res.render('photos/new.ejs', {message: message})
})























module.exports = router