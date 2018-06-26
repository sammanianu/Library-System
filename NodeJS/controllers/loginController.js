const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Login } = require('../models/login');
var { Register } = require('../models/register');

// => localhost:8080/logins/
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
		else { console.log('Error in Retriving Logins :' + JSON.stringify(err, undefined, 2));}
	});
});

router.post('/', (req, res) => {
		var email = req.body.email
        var password = req.body.password  
         
    Register.find({email: email}, function(err, objs){
            if (objs.password == password)
            {
                res.send('Successfull');
            }else{
                res.send('Error');
            }
        });
});




module.exports = router;