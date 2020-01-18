require('dotenv').config()
require('./db/db')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT


//middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))


app.get('/', (req, res) => {
	res.send('At home');
})


















app.listen(PORT, () => {
	console.log(`App is listening on port ${PORT}`);
})