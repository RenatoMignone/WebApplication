"use strict";

// Define an array with all the scores
let scores = [10, -5, 20, 15, -10, 5, 0, -3];

// Duplicate the array
let modifiedScores = scores.slice();

// Eliminate all negative scores
let NN = 0;
modifiedScores = modifiedScores.filter(score => {
  if (score < 0) {
    NN++;
    return false;
  }
  return true;
});

// Eliminate the two lowest-ranking scores
modifiedScores.sort((a, b) => a - b);
modifiedScores = modifiedScores.slice(2);

// Add NN+2 new scores with the value equal to the rounded average of the existing scores
let sum = modifiedScores.reduce((a, b) => a + b, 0);
let avg = Math.round(sum / modifiedScores.length);
for (let i = 0; i < NN + 2; i++) {
  modifiedScores.push(avg);
}

// Print both arrays
console.log("Original Scores: ", scores);
console.log("Modified Scores: ", modifiedScores);
