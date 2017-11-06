'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Question  = mongoose.model('Questions', QuestionSchema);

module.exports.Question = Question;