const mongoose = require('mongoose')





const photoSchema = new mongoose.Schema({

	title: String,
	url: String,
	date: Date()

})




const Photo = mongoose.model('Photo', photoSchema)


module.exports = Photo