const mongoose = require('mongoose');
 
var Employee = mongoose.model('Employee',{
    name: {type: String},
	email: {type: String},
	mobile: {type: String},
	position: {type: String},
	salary: {type: Number},
});

module.exports = { Employee };