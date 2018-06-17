const mongoose = require('mongoose');
 
var Register = mongoose.model('Register',{
	registrationNo: {type: String},
	username: {type: String},
	email: {type: String},
	year: {type: String},
	address: {type: String},
	mobile: {type: String},
	password: {type: String}
});

module.exports = { Register };