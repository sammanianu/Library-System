const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Test } = require('../models/test');
var { Register } = require('../models/register');

// => localhost:8080/test/
router.get('/', (req,res) => {
	Test.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving Test :' + JSON.stringify(err, undefined, 2));}
	});
});

router.get('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Test.findById(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Retriving Test :' + JSON.stringify(err, undefined, 2));}
	});
});

/*router.post('/', (req, res) => {
	var test = new Test({
		email: req.body.email,
		password: req.body.password,
	});
	test.save((err, doc) => {
		if(!err){ res.send(doc);}
		else { console.log('Error in Test Save :' + JSON.stringify(err, undefined, 2));}
	});
});*/

router.post('/', (req, res) => {
	console.log('request body >>>>>>>>', req.body.email)
		var email = req.body.email
        var password = req.body.password  
         
    Register.find({email: email}, function(err, objs){
		console.log('objs >>>>>.', objs)
            if (objs.password === password)
            {
				// res.send('Successfull'+ JSON.stringify(err, undefined, 2));
				res.json({
					success: true,
					msg: 'Successfully logged in'
				})
            }else{
                res.send('Error'+ JSON.stringify(err, undefined, 2));
            }
        });
});


router.put('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

	var test = {
		email: req.body.email,
		password: req.body.password,
	};

	Test.findByIdAndUpdate(req.params.id, {$set: test}, {new: true}, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2));}
	});
});

router.delete('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Test.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Test Delete :' + JSON.stringify(err, undefined, 2));}
	});
});

module.exports = router;