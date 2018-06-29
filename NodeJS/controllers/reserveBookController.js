const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { ReserveBook } = require('../models/reserveBook');

// => localhost:8080/reserveBooks/
router.get('/', (req,res) => {
	ReserveBook.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving ReserveBooks :' + JSON.stringify(err, undefined, 2));}
	});
});

router.get('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

        ReserveBook.findById(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Retriving ReserveBooks :' + JSON.stringify(err, undefined, 2));}
	});
});

router.post('/', (req, res) => {
	var reserveBook = new ReserveBook({
        isbn: req.body.isbn,
		title: req.body.title,
		author: req.body.author,
		
	});
	reserveBook.save((err, doc) => {
		if(!err){ res.send(doc);}
		else { console.log('Error in ReserveBook Save :' + JSON.stringify(err, undefined, 2));}
	});
});

router.put('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

	var reserveBook = {
		isbn: req.body.isbn,
		title: req.body.title,
		author: req.body.author,
		
	};

	ReserveBook.findByIdAndUpdate(req.params.id, {$set: reserveBook}, {new: true}, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2));}
	});
});

router.delete('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

        ReserveBook.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in ReserveBook Delete :' + JSON.stringify(err, undefined, 2));}
	});
});

module.exports = router;