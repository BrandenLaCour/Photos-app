const mongoose = require('mongoose')





const photoSchema = new mongoose.Schema({

	title: String,
	url: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	desc: String,
	user: {
		type: String,
		required: true
	}

})




const Photo = mongoose.model('Photo', photoSchema)


module.exports = Photo