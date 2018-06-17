const mongoose = require('mongoose');
 
var Book = mongoose.model('Book',{
    isbn: {type: String},
	title: {type: String},
	author: {type: String},
	publisher: {type: String},
	category: {type: String},
	language: {type: String},
	summary: {type: String},
	availability: {type: Number}
});

module.exports = { Book };