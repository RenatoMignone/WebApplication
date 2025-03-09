// Enforce strict mode
'use strict';

// Import sqlite3 module
const sqlite = require('sqlite3');

// Open database connection
const db = new sqlite.Database('../Databases/exams.sqlite', (err) => { if (err) throw err; });

// Initialize result array
let result = [];

// SQL query to join course and score tables
let sql = "SELECT * FROM course LEFT JOIN score ON course.code=score.coursecode";

// Execute SQL query
db.all(sql, (err, rows) => {
    if (err) throw err; // Throw error if any
    // Iterate over each row in the result
    for (let row of rows) {
        console.log(row); // Log the row to the console
        // Log specific columns (commented out)
        //console.log(row.code, row.name);
        result.push(row); // Add row to result array
    }
});

// Log separator
console.log('********************');

// Iterate over each row in the result array
for (let row of result) {
    console.log(row.code, row.name); // Log specific columns
}

// Log end of list message
console.log('*** END of list ***');
