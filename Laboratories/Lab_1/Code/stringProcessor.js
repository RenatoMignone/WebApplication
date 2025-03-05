"use strict";

// Function to process an array of strings
function processStrings(strings) {
    // Iterate over each string in the array
    for (const str of strings) {
        let result;
        // If the string is shorter than 2 characters, set result to an empty string
        if (str.length < 2) {
            result = '';
        // If the string is 2 or 3 characters long, repeat the first two characters
        } else if (str.length <= 3) {
            result = str[0] + str[1] + str[0] + str[1];
        // Otherwise, take the first two and last two characters
        } else {
            result = str.slice(0, 2) + str.slice(-2);
        }
        // Print the result
        console.log(result);
    }
}

// Test the function with various strings
const testStrings = ['spring', 'it', 'cat', 'a', 'hello', 'world'];
processStrings(testStrings);
