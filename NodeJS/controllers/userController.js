const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { User } = require('../models/user');

// => localhost:8080/books/
router.get('/', (req,res) => {
	User.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving Books :' + JSON.stringify(err, undefined, 2));}
	});
});



module.exports = router;