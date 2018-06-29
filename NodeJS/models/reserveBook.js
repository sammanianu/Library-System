const mongoose = require('mongoose');
 
var ReserveBook = mongoose.model('ReserveBook',{
    isbn: {type: String},
	title: {type: String},
	author: {type: String}
});

module.exports = { ReserveBook };