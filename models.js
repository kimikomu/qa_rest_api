'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sortAnswers = function(a, b) {
    if(a.votes === b.votes) {
        return b.updatedAt - a.updatedAt;
    }
    return b.votes - a.votes;
}

const AnswerSchema = new Schema({
    text: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    votes: {type: Number, defauly: 0}
});

const QuestionSchema = new Schema({
    test: String,
    createdAt: {type: Date, default: Date.now},
    answers: [AnswerSchema]
});

AnswerSchema.method('update', function(updates, callback) {
    Object.assign(this, updates, {updatedAt: new Date()});
    this.parent().save(callback);
});

AnswerSchema.method('vote', function(votes, callback) {
    if(vote === 'up') {
        this.votes += 1;
    } else {
        this.votes -= 1;
    }
    this.parent().save(callback);    
});

// add a hook to keep answer votes sorted
QuestionSchema.pre('save', function(next) {
    this.answers.sort(sortAnswers);
    next();
});

const Question = mongoose.model('Questions', QuestionSchema);

module.exports.Question = Question;