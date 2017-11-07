'use strict';

const express = require('express');
const router = express.Router();
const Question = require('./models').Question;

router.param('qID', function(req, res, next, id) {
    Question.findById(id, function(err, doc) {
        if(err) return next(err);
        if(!doc) {
            err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        next();
    });
});

router.param('aID', function(req, res, next, id) {
    req.answer = req.question.answers.id(id);
    if(!req.answer) {
        err = new Error('Not Found');
        err.status = 404;
        return next(err);
    }
    next();
});

// get questions
router.get("/", function(req, res, next){
	Question.find({})
				.sort({createdAt: -1})
				.exec(function(err, questions){
					if(err) return next(err);
					res.json(questions);
				});
});

// post questions
router.post("/", function(req, res, next){
	var question = new Question(req.body);
	question.save(function(err, question){
		if(err) return next(err);
		res.status(201);
		res.json(question);
	});
});

// get question
router.get('/:qID', function(req, res, next) {
        res.json(req.question);
});

// post questions/:qID/answers
router.post('/:qID/answers', function(req, res) {
    req.question.answers.push(req.body);
    req.question.save(function(err, question) {
        if(err) return next(err);
        res.status(201);
        res.json(question);
    });
});

// put questions/:qID/answers/:aid
router.put('/:qID/answers/:aID', function(req, res) {
    req.answer.update(req.body, function(err, result) {
        if(err) return next(err);
        res.json(result);        
    });
});

// delete questions/:qid/answers/:aid
router.delete('/:qID/answers/:aID', function(req, res) {
    req.answer.remove(function(err) {
        req.question.save(function(err, question) {
            if(err) return next(err);
            res.json(question);
        });
    });
});

// post questions/:qid/answers/:aid/vote-up
// post questions/:qid/answers/:aid/vote-down
router.post('/:qID/answers/:aID/vote-:dir', 
    function(req, res, next) {
        if(req.params.dir.search(/^(up|down)$/) === -1) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        } else {
            req.vote = req.params.dir;
            next();
        }
}, 
    function(req, res, next) {
        req.answer.vote(req.vote, function(err, question) {
            if(err) return next(err);            
            res.json(question);
        });
});

module.exports = router;