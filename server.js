require('dotenv').config()
require('./db/db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT
const session = require('express-session')
//middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

const authController = require('./controllers/authController')
app.use('/auth', authController)
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false
}))

app.get('/', (req, res) => {
	
	res.render('home.ejs')
})

app.get('*', (req, res) => {
	res.status(404).send('404 page not found')
})





 










app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})