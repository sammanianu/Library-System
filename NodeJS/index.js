const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const {mongoose} = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var bookController = require('./controllers/bookController.js');
var suggestController = require('./controllers/suggestController.js');
var registerController = require('./controllers/registerController.js');
var User = require('./models/User');

var app = express();
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.listen(8080, () => console.log('Server started at port : 8080'));

app.use('/employees', employeeController);
app.use('/books', bookController);
app.use('/suggests', suggestController);
app.use('/registers', registerController);




