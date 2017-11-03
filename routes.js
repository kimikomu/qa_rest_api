'use strict';

const express = require('express');
const router = express.Router();

// get questions
router.get('/', function(req, res) {
    res.json({response: 'You sent me a GET request'});
});

// post questions
router.post('/', function(req, res) {
    res.json({
        response: 'You sent me a POST request',
        body: req.body
    });
});

// get question
router.get('/:qid', function(req, res) {
    res.json({
        response: `You sent me a GET request for qID ${req.params.qid}`
    });
});

// post questions/:qid/answers
router.post('/:qid/answers', function(req, res) {
    res.json({
        response: 'You sent me a POST request to /answers',
        questionId: req.params.qid,
        body: req.body
    });
});

// put questions/:qid/answers/:aid
router.put('/:qid/answers/:aid', function(req, res) {
    res.json({
        response: 'You sent me a PUT request to /answers',
        questionId: req.params.qid,
        answerId: req.params.aid,
        body: req.body
    });
});

// delete questions/:qid/answers/:aid
router.delete('/:qid/answers/:aid', function(req, res) {
    res.json({
        response: 'You sent me a DELETE request to /answers',
        questionId: req.params.qid,
        answerId: req.params.aid
    });
});

// post questions/:qid/answers/:aid/vote-up
// post questions/:qid/answers/:aid/vote-down
router.post('/:qid/answers/:aid/vote-:dir', function(req, res) {
    res.json({
        response: `You sent me a POST request to /vote=${req.params.dir}`,
        questionId: req.params.qid,
        answerId: req.params.aid,
        vote: req.params.dir
    });
});

module.exports = router;