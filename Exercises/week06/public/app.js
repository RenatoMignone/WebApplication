'use strict';

/*
 * [2023/2024]
 * Web Applications
 * This script manages the voting system for answers and dynamically updates the UI.
 */

import { getAllAnswers } from './API.js';

// ----------------------------------------------------------------------
// Function to handle voting for an answer
// ----------------------------------------------------------------------
function vote(id) {
    // Increment the score of the answer with the given id
    answerList.forEach(e => { if (e.id == id) e.score += 1; });

    // Clear the current list of answers from the UI
    clearAnswers();

    // Recreate the list of answers with the updated data
    createAnswerList(answerList);
}

// ----------------------------------------------------------------------
// Function to clear all answers from the table
// ----------------------------------------------------------------------
function clearAnswers() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = "";  // Be cautious of XSS when using innerHTML
}

// ----------------------------------------------------------------------
// Function to create a table row (tr) for a single answer
// ----------------------------------------------------------------------
function createAnswerNode(ans) {
    // Create table cells (td) for each property of the answer
    const newTd1 = document.createElement("td");
    const newContentDate = document.createTextNode(ans.date.format('YYYY-MM-DD'));
    newTd1.appendChild(newContentDate);

    const newTd2 = document.createElement("td");
    newTd2.innerHTML = ans.text;  // Be cautious of XSS: sanitize the value if needed

    const newTd3 = document.createElement("td");
    const newContentRespondent = document.createTextNode(ans.respondent);
    newTd3.appendChild(newContentRespondent);

    const newTd4 = document.createElement("td");
    const newContentScore = document.createTextNode(ans.score);
    newTd4.appendChild(newContentScore);

    const newTd5 = document.createElement("td");
    const newButton = document.createElement("button");
    newButton.className = "btn btn-primary";
    newButton.id = ans.id;
    newButton.textContent = "Vote";
    newTd5.appendChild(newButton);

    // Add an event listener to the button to handle voting
    newButton.addEventListener('click', event => {
        vote(event.target.id);
    });

    // Create a table row (tr) and append all cells to it
    const newTr = document.createElement("tr");
    newTr.appendChild(newTd1);
    newTr.appendChild(newTd2);
    newTr.appendChild(newTd3);
    newTr.appendChild(newTd4);
    newTr.appendChild(newTd5);

    return newTr;
}

// ----------------------------------------------------------------------
// Function to populate the table with a list of answers
// ----------------------------------------------------------------------
function createAnswerList(answerList) {
    const tableBody = document.getElementById('answers');
    for (let ans of answerList) {
        const newRow = createAnswerNode(ans);
        tableBody.appendChild(newRow);
    }
}

// ----------------------------------------------------------------------
// Main Execution
// ----------------------------------------------------------------------

// Create the data structure by fetching answers from the API
let answerList = await getAllAnswers(1);

// Populate the table with the fetched answers
createAnswerList(answerList);

