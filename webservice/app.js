var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var membersRouter = require('./routes/membersRoutes');
var moviesRouter = require('./routes/moviesRoutes');

require('./config/database')


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/members', membersRouter);
app.use('/api/movies', moviesRouter);

module.exports = app;
