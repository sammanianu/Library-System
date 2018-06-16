const mongoose = require('mongoose');
 
var Book = mongoose.model('Book',{
    isbn: {type: String},
	title: {type: String},
	author: {type: String},
	publisher: {type: String},
	category: {type: String},
	language: {type: String},
	availability: {type: Boolean}
});

module.exports = { Book };