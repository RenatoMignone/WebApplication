"use strict";

// Define the names as a comma-separated string
let namesString = "Luigi De Russis, Luca Mannella, Fulvio Corno, Juan Pablo Saenz Moreno, Enrico Masala, Antonio Servetti";

// Parse the string and create an array containing one name per array position
let namesArray = namesString.split(',').map(name => name.trim());

// Create a second array by computing the acronyms
let acronymsArray = namesArray.map(name => {
  return name.split(' ').map(word => word[0].toUpperCase()).join('');
});

// Print the resulting list of acronyms and the full names
console.log("Full Names: ", namesArray);
console.log("Acronyms: ", acronymsArray);

// Extra: in alphabetical order of acronym
acronymsArray.sort();
console.log("Acronyms (sorted): ", acronymsArray);
