const mongoose = require('mongoose');
 
var Test = mongoose.model('Test',{
	
	email: {type: String},
	password: {type: String}
});

module.exports = { Test };