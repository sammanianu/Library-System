const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Register } = require('../models/register');

// => localhost:8080/registers/
router.get('/', (req,res) => {
	Register.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving Registers :' + JSON.stringify(err, undefined, 2));}
	});
});

router.get('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Register.findById(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Retriving Registers :' + JSON.stringify(err, undefined, 2));}
	});
});

router.post('/', (req, res) => {
	var register = new Register({
        username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		registrationNo: req.body.registrationNo,
		year: req.body.year,
		address: req.body.address,
		mobile: req.body.mobile,

	});
	register.save((err, doc) => {
		if(!err){ res.send(doc);}
		else { console.log('Error in Register Save :' + JSON.stringify(err, undefined, 2));}
	});
});

router.put('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

	var reg = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
		registrationNo: req.body.registrationNo,
		year: req.body.year,
		address: req.body.address,
		mobile: req.body.mobile,
	};

	Register.findByIdAndUpdate(req.params.id, {$set: reg}, {new: true}, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2));}
	});
});

router.delete('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Register.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Register Delete :' + JSON.stringify(err, undefined, 2));}
	});
});

module.exports = router;