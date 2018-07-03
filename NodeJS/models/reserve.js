const mongoose = require('mongoose');
 
var Reserve = mongoose.model('Reserve',{
    registrationNo: {type: String},
    username: {type: String},
	email: {type: String},
    isbn: {type: String},
	title: {type: String},
    author: {type: String},
    reserveDate: {type: Date},
    dueDate: {type: Date},
    fineAmount: {type: Number}
	
});

module.exports = { Reserve };