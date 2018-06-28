const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee1 } = require('../models/employee1');

// => localhost:8080/employee1s/
router.get('/', (req,res) => {
	Employee1.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving Employee1 :' + JSON.stringify(err, undefined, 2));}
	});
});

router.get('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Employee1.findById(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Retriving Employee1s :' + JSON.stringify(err, undefined, 2));}
	});
});

router.post('/', (req, res) => {
	var employee1 = new Employee1({
        name: req.body.name,
		email: req.body.email,
        mobile: req.body.mobile,
        position: req.body.position,
		salary: req.body.salary,
	});
	employee1.save((err, doc) => {
		if(!err){ res.send(doc);}
		else { console.log('Error in Employee1 Save :' + JSON.stringify(err, undefined, 2));}
	});
});

router.put('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

	var employee1 = {
		name: req.body.name,
		email: req.body.email,
        mobile: req.body.mobile,
        position: req.body.position,
		salary: req.body.salary,
	};

	Employee1.findByIdAndUpdate(req.params.id, {$set: employee1}, {new: true}, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2));}
	});
});

router.delete('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Employee1.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Employee1 Delete :' + JSON.stringify(err, undefined, 2));}
	});
});

module.exports = router;