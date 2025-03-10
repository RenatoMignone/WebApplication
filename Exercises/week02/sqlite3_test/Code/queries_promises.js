//////////////////////////////////////////////////
//Desc: This code demonstrates how to use promises 
//to execute queries in a synchronous manner
//////////////////////////////////////////////////

// Enforce strict mode
'use strict';

// Import sqlite3 module
const sqlite = require('sqlite3');

// Open database connection
const db = new sqlite.Database('../Databases/data.sqlite', (err) => { if (err) throw err; });

// Define async function insertOne
async function insertOne() {
    // Return a new Promise
    return new Promise((resolve, reject) => {
        // Insert a row into the numbers table
        db.run('insert into numbers(number) values(1)', (err) => {
            if (err) reject(err); // Reject the promise if error
            else resolve('Done'); // Resolve the promise if success
        });
    });
}

// Define async function printCount
async function printCount() {
    // Return a new Promise
    return new Promise((resolve, reject) => {
        // Query the count of rows in the numbers table
        db.all('select count(*) as tot from numbers', (err, rows) => {
            if(err) reject(err); // Reject the promise if error
            else {
                console.log(rows[0].tot); // Log the count to the console
                resolve(rows[0].tot); // Resolve the promise with the count
            }
        });
    });
}

// Define async function main
async function main() {
    // Loop 100 times
    for(let i=0; i<100; i++) {
        await insertOne(); // Await insertOne function
        await printCount(); // Await printCount function
    }
    // Close the database connection
    db.close();
}

// Call main function
main();
