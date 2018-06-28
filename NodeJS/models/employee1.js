const mongoose = require('mongoose');
 
var Employee1 = mongoose.model('Employee1',{
    name: {type: String},
	email: {type: String},
	mobile: {type: String},
	position: {type: String},
	salary: {type: Number},
});

module.exports = { Employee1 };