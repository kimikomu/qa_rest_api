'use strict';

const express = require('express');
const app = express();

app.use(function(req, res, next) {
    next();
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`The app is listening on port ${port}`);
});

