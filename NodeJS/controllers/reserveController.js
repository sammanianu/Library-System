const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Reserve } = require('../models/reserve');

// => localhost:8080/reserves/
router.get('/', (req,res) => {
	Reserve.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving Reserve :' + JSON.stringify(err, undefined, 2));}
	});
});

router.get('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Reserve.findById(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Retriving Reserve :' + JSON.stringify(err, undefined, 2));}
	});
});

router.post('/', (req, res) => {
	var reserve = new Reserve({
		registrationNo: req.body.registrationNo,
        username: req.body.username,
		email: req.body.email,
		isbn: req.body.isbn,
		title: req.body.title,
		author: req.body.author
	});
	reserve.save((err, doc) => {
		if(!err){ res.send(doc);}
		else { console.log('Error in Reserve Save :' + JSON.stringify(err, undefined, 2));}
	});
});

router.put('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

	var reserve = {
		registrationNo: req.body.registrationNo,
        username: req.body.username,
		email: req.body.email,
		isbn: req.body.isbn,
		title: req.body.title,
		author: req.body.author
	};

	Reserve.findByIdAndUpdate(req.params.id, {$set: reserve}, {new: true}, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2));}
	});
});

router.delete('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Reserve.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Reserve Delete :' + JSON.stringify(err, undefined, 2));}
	});
});

module.exports = router;