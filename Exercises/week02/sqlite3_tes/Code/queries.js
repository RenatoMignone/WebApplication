//////////////////////////////////////////////////////////////////////
// Desc: This file contains the code to insert a row into the numbers
// table and query the count of rows in the numbers table 100 times.
//////////////////////////////////////////////////////////////////////

// Enforce strict mode
'use strict';

// Import sqlite3 module
const sqlite = require('sqlite3');

// Open database connection
const db = new sqlite.Database('../Databases/data.sqlite', (err) => { if (err) throw err; });

for(let i=0; i<100; i++) {
    // Insert a row into the numbers table
    db.run('insert into numbers(number) values(1)', (err) => { if (err) throw err; });
    // Query the count of rows in the numbers table
    db.all('select count(*) as tot from numbers', (err, rows) => {
        if(err) throw err; // Throw error if any
        console.log(rows[0].tot); // Log the count to the console
    });
}

// Close the database connection
db.close();

