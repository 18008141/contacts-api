var express 		= require('express');
var path 			= require('path');
var cookieParser 	= require('cookie-parser');
var logger 			= require('morgan');
var indexRouter 	= require('./routes/index');
var usersRouter 	= require('./routes/users');
let dotenv 			= require('dotenv').config();
let mongoose 		= require('mongoose');

const { route } = require('./routes/index');
const cors = require('cors');

var app = express();
app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


const mongoString = process.env.DB_URL;
console.log(mongoString);
mongoose.set('strictQuery', false);
mongoose.connect(mongoString, { dbName: 'uni' });
const db = mongoose.connection;

// connection success
db.on('error', (error) => { console.log(error) });
db.once('connected', () => { console.log('DB connected'); } );

module.exports = app;
