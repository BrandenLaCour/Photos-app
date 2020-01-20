require('dotenv').config()
require('./db/db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT
const session = require('express-session')
const methodOverride = require('method-override')
//middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false
}))
app.use(methodOverride('_method'))

//controllers
const authController = require('./controllers/authController')
app.use('/auth', authController)
const photoController = require('./controllers/photoController')
app.use('/photos', photoController)
const userController = require('./controllers/userController')
app.use('/users', userController)

app.get('/', (req, res) => {
	
	let message = req.session.message
	req.session.message = ''
	res.render('home.ejs', {message: message})
})

app.get('*', (req, res) => {
	res.status(404).send('404 page not found')
})





 










app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})