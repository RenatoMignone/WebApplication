"use strict";


/*----------------------------------------------------------------------*/
/*
Each answer should contain:
- Response (text)
- Respondent name
- Score (integer number, positive or negative)
- Date
*/

//Constructor for the answer
function Answer(text, respondent, score, date) {
    //in this case, a new object is created, and it is named "this"
    //we can refer to the new object, with this new keyword
    this.text = text;
    this.respondent = respondent;
    this.score = score;
    this.date = date
} 


/*----------------------------------------------------------------------*/
/*
A question, instead, is made of:
- Question (text)
- Questioner name
- Date
- List of answers
*/

//Constructor for the question
function Question(question, questioner, date) {
    this.question = question;
    this.questioner = questioner;
    this.date = date;
    this.answers = [];

    //List of the methods implemented for the question class
    //The result of this instruction is what the function returns
    //If we instead put the curly braces, the return value would be undefined
    this.add = (ans) => this.answers.push(ans);


    // this.findAll = () => this.answers;       // returns the same list of answers
    // this.findAll = () => [...this.answers];  // returns a new array [a1, a2, a2]
    // this.findAll = () => [this.answers];     // returns the same array inside another one. [[a1, a2, a3]]

    this.findAll = (name) => {
        let answers = [];
        for (let answer of this.answers){
            if (answer.respondent === name) answers.push(answer);
        }
    return answers;
    }
}

/*----------------------------------------------------------------------*/


const answers_text = [
    ["Hello World  ", "Antonio", "0", "2025-03-03"],    //answer 1
    ["Hello World 2", "Enrico", "0", "2025-03-04"],     //answer 2
    ["Fine", "Antonio", "2", "2025-03-05"]              //answer 3
]

/*----------------------------------------------------------------------*/

const question1 = new Question("How are you today?","Encrico","2025-03-02");


/*----------------------------------------------------------------------*/

for(let i=0;i<answers_text.length;i++){
    const answer = new Answer(answers_text[i][0], answers_text[i][1], answers_text[i][2], answers_text[i][3]);
    question1.add(answer);
}

// console.log(question1);

/*----------------------------------------------------------------------*/

// console.log(question1);
console.log("question 1 find all",question1.findAll("Antonio"));

