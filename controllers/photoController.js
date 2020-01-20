const express = require('express')
const router = express.Router()
const Photo = require('../models/photo')




router.get('/new', (req, res) => {
	const message = req.session.message
	req.session.message = ''
	res.render('photos/new.ejs', {message: message})
})

router.post('/', async (req, res, next) => {
	
	try {
		const createdPhoto = await Photo.create(req.body)
		req.session.message = 'Photo Successfully Created'
		res.redirect('/')

	}
	catch(err){

		next(err)
	}

})





















module.exports = router