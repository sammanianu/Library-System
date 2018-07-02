const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Login } = require('../models/login');
var { Register } = require('../models/register');
var email1;
var password1;


router.get('/', (req,res) => {
	Login.find((err, docs) => {
		if (!err) {res.send(docs);}
		else { console.log('Error in Retriving Login :' + JSON.stringify(err, undefined, 2));}
	});
});

router.get('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Login.findById(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Retriving Login :' + JSON.stringify(err, undefined, 2));}
	});
});

router.post('/', (req, res) => {
	/*console.log('request body >>>>>>>>', req.body.email)*/
		email1 = req.body.email;
        password1 = req.body.password ; 
         
    Register.findOne({email: email1}, function(err, objs){
		/*console.log('objs >>>>>.', objs)
		console.log('password >>>>>.',objs.password)
		console.log('password1 >>>>>.',password1)*/
            if (objs.password === password1)
            {
				// res.send('Successfull'+ JSON.stringify(err, undefined, 2));
				res.json({
					success: true,
					registrationNo: objs.registrationNo,
					username: objs.username,
					year: objs.year,
					mobile: objs.mobile,
					address: objs.address,
					password: objs.password,
					msg: 'Successfully logged in'
				});
            }else{
				
				res.json({
					success: false,
					msg: 'Fail to logged in'
				});
            }
        });
});

router.put('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

	var reg = {
		email: req.body.email,
		password: req.body.password,
		
	};

	Login.findByIdAndUpdate(req.params.id, {$set: reg}, {new: true}, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2));}
	});
});

router.delete('/:id', (req,res) => {
	if (!ObjectId.isValid(req.params.id))
		return res.status(400).send('No record with given id : ${req.params.id}');

		Login.findByIdAndRemove(req.params.id, (err, doc) => {
		if (!err) {res.send(doc);}
		else { console.log('Error in Login Delete :' + JSON.stringify(err, undefined, 2));}
	});
});


module.exports = router;