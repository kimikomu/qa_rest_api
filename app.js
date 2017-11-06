'use strict';

const express = require('express');
const app = express();
const routes = require('./routes');

const jsonParser = require('body-parser').json;
const logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser());

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/qa');

const db = mongoose.connection;

db.on('error', function(err) {
    console.error('Connection error: ', err);
});

db.once('open', function() {
    console.log('Db connection successful');
});

app.use('/questions' ,routes);

// catch 404 
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`The app is listening on port ${port}`);
});

