const mongoose = require('mongoose');
 
var Reserve = mongoose.model('Reserve',{
    registrationNo: {type: String},
    username: {type: String},
	email: {type: String},
    isbn: {type: String},
	title: {type: String},
	author: {type: String}
	
});

module.exports = { Reserve };