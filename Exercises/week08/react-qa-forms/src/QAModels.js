'use strict';

import dayjs from "dayjs";

// -------------------- Answer Constructor --------------------
// Represents an answer to a question
function Answer(id, text, respondent, score, date, questionId) {
    this.id = id; // Unique identifier for the answer
    this.text = text; // The content of the answer
    this.respondent = respondent; // The person who provided the answer
    this.score = score; // The score of the answer (upvotes/downvotes)
    this.date = dayjs(date); // The date the answer was provided
    this.questionId = questionId; // The ID of the related question

    // Returns a string representation of the answer
    this.str = function() { 
        return `${this.id}: ${this.text} (by ${this.respondent}) on ${this.date.format('YYYY-MM-DD')}, score: ${this.score}, questionId: ${this.questionId}`;
    }
}

// -------------------- Question Constructor --------------------
// Represents a question with its associated answers
function Question(id, text, questioner, date) {
    this.id = id; // Unique identifier for the question
    this.text = text; // The content of the question
    this.questioner = questioner; // The person who asked the question
    this.date = date; // The date the question was asked
    this.answers = []; // List of answers associated with the question

    // Adds an answer to the question
    this.addAnswer = (ans) => {
        this.answers.push(ans);
    }

    // Returns a copy of the list of answers
    this.getAnswers = () => {
        return [...this.answers];
    }

    // Initializes the question with some default answers
    this.init = () => {
        this.answers.push(
            new Answer(1, 'for of', 'Alice', 3, dayjs('2024-03-07')),
            new Answer(2, 'for i=0,i<N,i++', 'Harry', 1, dayjs('2024-03-04')),
            new Answer(3, 'for in', 'Harry', -2, dayjs('2024-03-02')),
            new Answer(4, 'i=0 while(i<N)', 'Carol', -1, dayjs('2024-03-01'))
        );
    }

    // Returns a string representation of the question
    this.str = function() { 
        return `${this.text} asked by ${this.questioner} on ${this.date.format("YYYY-MM-DD")}`;
    };
}

export { Question, Answer };