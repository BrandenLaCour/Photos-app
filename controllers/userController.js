const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
	const message = req.session.message
	req.session.message = ''
	res.render('users/index.ejs', {message: message})
})





























module.exports = router