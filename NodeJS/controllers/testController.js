const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Test } = require('../models/test');
var { Register } = require('../models/register');
var email1;
var password1;
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
		email1 = req.body.email
        password1 = req.body.password  
         
    Register.findOne({email: email1}, function(err, objs){
		/*console.log('objs >>>>>.', objs)
		console.log('password >>>>>.',objs.password)
		console.log('password1 >>>>>.',password1)*/
            if (objs.password === password1)
            {
				// res.send('Successfull'+ JSON.stringify(err, undefined, 2));
				res.json({
					success: true,
					msg: 'Successfully logged in'
				})
            }else{
				
				res.json({
					success: false,
					msg: 'Fail logged in'
				})
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