'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');

const jsonParser = require('body-parser').json;
const logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

// set up database connection
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa');

const db = mongoose.connection;

db.on('error', function(err) {
    console.error('Connection error:', err);
});

db.once('open', function() {
    console.log('Db connection successful');
});

// set up headers to grant permissions to be used by a web browser
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE');
        return res.status(200).json({});
    }
    next();
});

// set up routes
app.use('/questions', routes);

// handle errors
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// set up port
const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`The app is listening on port ${port}`);
});

