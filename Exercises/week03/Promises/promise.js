"use strict";

function waitPromise(duration) {
    // Create and return a new promise
    return new Promise((resolve, reject) => {
        // If the argument is invalid,
        // reject the promise
        if (duration < 0) {
            reject(new Error('Time travel not yet implemented'));
        } else {
            // otherwise, wait asynchronously and then
            // resolve the Promise; setTimeout will
            // invoke resolve() with no arguments:
            // the Promise will fulfill with
            // the undefined value
            setTimeout(resolve, duration);
        }
    });
}

waitPromise(-1).then((result) => {
        console.log("Success: ", result);
    }).catch((error) => {
        console.log("Error: ", error);
    });
    // if a function returns a Promise...
waitPromise(1000).then(() => {
        console.log("Success!");
    }).catch((error) => {
        console.log("Error: ", error);
});