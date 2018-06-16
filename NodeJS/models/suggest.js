const mongoose = require('mongoose');
 
var Suggest = mongoose.model('Suggest',{
	title: {type: String},
	author: {type: String}
});

module.exports = { Suggest };