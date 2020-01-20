const mongoose = require('mongoose')





const photoSchema = new mongoose.Schema({

	title: String,
	url: {
		type: String,
		required: true
	}
	date: Date(),
	desc: String

})




const Photo = mongoose.model('Photo', photoSchema)


module.exports = Photo