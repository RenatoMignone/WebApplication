"use strict";

// Import the dayjs library for date handling
const dayjs = require('dayjs');


/*-------------------------------------------------------------------------------------------------------*/
// Function to create a Film object
function Film(id, title, favorite = false, watchDate = undefined, score = undefined) {

    this.id = id;
    this.title = title;
    this.favorite = favorite;
    this.watchDate = watchDate ? dayjs(watchDate) : undefined;
    this.score = score;
}


/*-------------------------------------------------------------------------------------------------------*/
// Function to create a FilmLibrary object
function FilmLibrary() {
    this.films = []; // Array to store films

    /*----------------------------------------------*/
    // Method to add a new film to the library
    this.addNewFilm = function(film) {
        this.films.push(film);
    };

    /*----------------------------------------------*/
    // Method to print the list of films
    this.print = function() {
        console.log("***** List of films *****");
        for(const film of this.films){
            console.log(`Id: ${film.id}, Title: ${film.title}, Favorite: ${film.favorite}, Watch date: ${film.watchDate ? film.watchDate.format('MMMM D, YYYY') : '<not defined>'}, Score: ${film.score !== undefined ? film.score : '<not assigned>'}`);
        }
    };

    /*----------------------------------------------*/
    // Method to sort films by watch date
    this.sortByDate = function() {
        return this.films
            .filter(film => film.watchDate) // Filter films with a watch date
            .sort((a, b) => a.watchDate - b.watchDate) // Sort by watch date
            .concat(this.films.filter(film => !film.watchDate)); // Append films without a watch date
    };

    /*----------------------------------------------*/
    // Method to delete a film by id
    this.deleteFilm = function(id) {
        this.films = this.films.filter(film => film.id !== id);
    };

    /*----------------------------------------------*/
    // Method to reset the watch date of all films
    this.resetWatchedFilms = function() {
        for(const film of this.films)
            film.watchDate = undefined;
    };

    /*----------------------------------------------*/
    // Method to get films with a defined score, sorted by score
    this.getRated = function() {
        return this.films
            .filter(film => film.score !== undefined) // Filter films with a score
            .sort((a, b) => b.score - a.score); // Sort by score in descending order
    };
}



/*-------------------------------------------------------------------------------------------------------*/
// Populate the FilmLibrary with sample data
const myLibrary = new FilmLibrary();
myLibrary.addNewFilm(new Film(1, 'Pulp Fiction', true, '2023-03-10', 5));
myLibrary.addNewFilm(new Film(2, '21 Grams', true, '2023-03-17', 4));
myLibrary.addNewFilm(new Film(3, 'Star Wars'));
myLibrary.addNewFilm(new Film(4, 'Matrix'));
myLibrary.addNewFilm(new Film(5, 'Shrek', false, '2023-03-21', 3));

// Print the FilmLibrary
myLibrary.print();

// Test the methods
console.log("***** Sorted by date *****");
for(const film of myLibrary.films){
    console.log(film.title);
}

console.log("***** After deleting film with id 3 *****");
myLibrary.deleteFilm(3);
myLibrary.print();

console.log("***** After resetting watched films *****");
myLibrary.resetWatchedFilms();
myLibrary.print();

console.log("***** Films filtered, only the rated ones *****");
myLibrary.getRated().forEach(film => console.log(film.title));
