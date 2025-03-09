"use strict";

const dayjs = require('dayjs');

/*----------------------------------------------------------------------*/
/*
Each answer should contain:
- Response (text)
- Respondent name
- Score (integer number, positive or negative)
- Date
*/

// Constructor for the answer
function Answer(text, respondent, score, date) {
    this.text = text;
    this.respondent = respondent;
    // Convert score to integer
    this.score = parseInt(score, 10);
    // Use dayjs for date
    this.date = dayjs(date);
}

/*----------------------------------------------------------------------*/
/*
A question is made of:
- Question (text)
- Questioner name
- Date
- List of answers
*/

// Constructor for the question
function Question(question, questioner, date) {
    this.question = question;
    // Fixed the questioner’s name
    this.questioner = questioner;
    this.date = dayjs(date);
    this.answers = [];

    // Methods of the class
    this.add = (ans) => this.answers.push(ans);

    this.findAll = (name) => this.answers.filter(ans => ans.respondent === name);

    this.afterDate = (date) => this.answers.filter(ans => ans.date.isAfter(date));

    this.listByDate = () => [...this.answers].sort((a,b) => a.date.diff(b.date));
}

/*----------------------------------------------------------------------*/
const answers_text = [
    ["Hello World", "Antonio", "0", "2025-03-03"],
    ["Hello World 2", "Enrico", "0", "2025-03-04"],
    ["Fine", "Antonio", "2", "2025-03-05"]
];

/*----------------------------------------------------------------------*/
// Updated the questioner’s name to "Enrico"
const question1 = new Question("How are you today?", "Enrico", "2025-03-02");

/*----------------------------------------------------------------------*/
for(let i = 0; i < answers_text.length; i++) {
    const answer = new Answer(
        answers_text[i][0],
        answers_text[i][1],
        answers_text[i][2],
        answers_text[i][3]
    );
    question1.add(answer);
}

/*----------------------------------------------------------------------*/
// Examples of calling the methods
console.log("--- findAll('Antonio') ---");
console.log(question1.findAll("Antonio"));

console.log("\n--- afterDate(2025-03-04) ---");
console.log(question1.afterDate(dayjs("2025-03-04")));

console.log("\n--- listByDate() ---");
console.log(question1.listByDate());

console.log("\n--- All answers ---");
console.log(question1.answers);
