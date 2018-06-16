const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Suggest } = require('../models/suggest');

// => localhost:8080/suggests/
router.get('/', (req,res) => {
	Suggest.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving Suggest :' + JSON.stringify(err, undefined, 2));}
	});
});

router.get('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Suggest.findById(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Retriving Suggest :' + JSON.stringify(err, undefined, 2));}
	});
});

router.post('/', (req, res) => {
	var suggest = new Suggest({
		title: req.body.title,
		author: req.body.author,
	});
	suggest.save((err, doc) => {
		if(!err){ res.send(doc);}
		else { console.log('Error in Suggest Save :' + JSON.stringify(err, undefined, 2));}
	});
});

router.put('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

	var suggest = {
		title: req.body.title,
		author: req.body.author,
	};

	Suggest.findByIdAndUpdate(req.params.id, {$set: suggest}, {new: true}, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2));}
	});
});

router.delete('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Suggest.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Suggest Delete :' + JSON.stringify(err, undefined, 2));}
	});
});

module.exports = router;