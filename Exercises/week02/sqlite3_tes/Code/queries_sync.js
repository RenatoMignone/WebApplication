// Enforce strict mode
'use strict';

// Import sqlite3 module
const sqlite = require('sqlite3');

// Define queries function with max_count parameter
function queries(max_count) {
    // Initialize count variable
    let count = 0;
    // Initialize nextPrintFlag variable
    let nextPrintFlag = false;

    // Open database connection
    const db = new sqlite.Database('../Databases/data.sqlite', (err) => { if (err) throw err; });

    // Define methods object
    const methods = {
        // Define insert method
        insert: () => {
            // Increment count
            count++;
            // Insert a row into the numbers table
            db.run('insert into numbers(number) values(1)', (err) => {
                if (err) throw err; // Throw error if any
                else methods.next(); // Call next method
            });
        },
        // Define print method
        print: () => {
            // Query the count of rows in the numbers table
            db.all('select count(*) as tot from numbers', (err, rows) => {
                if(err) throw err; // Throw error if any
                console.log(rows[0].tot); // Log the count to the console
                methods.next(); // Call next method
            });
        },
        // Define next method
        next: () => {
            // Check if count exceeds max_count
            if(count > max_count) {
                db.close(); // Close the database connection
                return; // Exit the function
            }
            // Check if nextPrintFlag is false
            if (!nextPrintFlag) {
                nextPrintFlag = true; // Set nextPrintFlag to true
                methods.insert(); // Call insert method
            } else { // If nextPrintFlag is true
                nextPrintFlag = false; // Set nextPrintFlag to false
                methods.print(); // Call print method
            }
        }
    }
    // Return methods object
    return methods;
}

// Create runner object with max_count 100
const runner = queries(100);
// Call next method of runner
runner.next();


