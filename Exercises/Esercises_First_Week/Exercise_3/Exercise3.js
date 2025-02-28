"use strict";

// Constructor function for Answer
function Answer(response, respondentName, score, date) {
  this.response = response;
  this.respondentName = respondentName;
  this.score = score;
  this.date = new Date(date);
}

// Constructor function for Question
function Question(question, questionerName, date) {
  this.question = question;
  this.questionerName = questionerName;
  this.date = new Date(date);
  this.answers = [];
}

Question.prototype.add = function(answer) {
  this.answers.push(answer);
};

Question.prototype.findAll = function(name) {
  return this.answers.filter(answer => answer.respondentName === name);
};

Question.prototype.afterDate = function(date) {
  let givenDate = new Date(date);
  return this.answers.filter(answer => answer.date > givenDate);
};

Question.prototype.listByDate = function() {
  return this.answers.slice().sort((a, b) => a.date - b.date);
};

Question.prototype.listByScore = function() {
  return this.answers.slice().sort((a, b) => b.score - a.score);
};

// Create an instance of Question with at least four Answers
let question = new Question("What is JavaScript?", "Alice", "2023-01-01");

question.add(new Answer("JavaScript is a programming language.", "Bob", 10, "2023-01-02"));
question.add(new Answer("It is used for web development.", "Charlie", 5, "2023-01-03"));
question.add(new Answer("JavaScript can run on both client and server sides.", "Dave", 8, "2023-01-04"));
question.add(new Answer("It is not the same as Java.", "Eve", 7, "2023-01-05"));

// Test the methods
console.log("All answers by Charlie: ", question.findAll("Charlie"));
console.log("Answers after 2023-01-03: ", question.afterDate("2023-01-03"));
console.log("Answers sorted by date: ", question.listByDate());
console.log("Answers sorted by score: ", question.listByScore());
