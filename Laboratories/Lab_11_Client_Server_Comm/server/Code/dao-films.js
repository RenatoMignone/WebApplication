'use strict';

/* Data Access Object (DAO) module for accessing films data */

/*===========================================================================*/
// we import the module defined by the file db.js
const db = require('./db');
const dayjs = require("dayjs");

/*===========================================================================*/
// we define the filterValues object that contains the filter functions
// the filter functions are used to filter the films list
// this means that this is used to filter the films list based on the filter defined by the user
// the filter functions return a boolean value, if the boolean value is true, the film is included in the filtered films list
const filterValues = {
  'favorite':  { filterFunction: film => film.favorite },
  'best':      { filterFunction: film => film.rating >= 5 },
  'lastmonth': { filterFunction: film => isSeenLastMonth(film) },
  'unseen':    { filterFunction: film => film.watchDate ? false : true },
  'all':       { filterFunction: film => true },
};

/*===========================================================================*/
// we define the isSeenLastMonth function that checks if the film was seen last month
// this function is used to filter the films list based on the filter defined by the user
const isSeenLastMonth = (film) => {
  if('watchDate' in film && film.watchDate) {
    const diff = dayjs(film.watchDate).diff(dayjs(),'month');
    const isLastMonth = diff <= 0 && diff > -1;
    return isLastMonth;
  }
}

/*===========================================================================*/
// we define the convertFilmFromDbRecord function that converts the film from the db record
// so we extract the value of the film from the database, and then we associate the value to the film object
const convertFilmFromDbRecord = (dbRecord) => {
  const film = {};
  film.id = dbRecord.id;
  film.title = dbRecord.title;
  film.favorite = dbRecord.favorite;
  film.watchDate = dbRecord.watchdate;
  film.rating = dbRecord.rating;
  //we return the film object
  return film;
}

/*===========================================================================*/
// we define the listFilms function that lists the films
// this function is used to list the films based on the filter defined by the user
// what does the "exports" mean?
// The exports object is used to export the functions defined in the module
// this means that the functions defined in the module can be used in other modules

exports.listFilms = (filter) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films';
    // we use the db.all method to execute the SQL query
    db.all(sql, (err, rows) => {
      if (err) { reject(err); }

      // the callback of the map method is used to convert the film from the db record
      const films = rows.map((e) => {
        const film = convertFilmFromDbRecord(e);
        delete film.watchdate;
        return film;
      });

      // if the filter is defined, we use the filterValues object to filter the films list
      if (filter) {
        //the hasOwnProperty method is used to check if the filter is defined in the filterValues object
        if (filterValues.hasOwnProperty(filter)) 
          // this is the resolve method of the promise if the filter is defined in the filterValues object
          // its role is to filter the films list based on the filter defined by the user
          // the input of the .filter method is the filter function defined in the filterValues object
          // the filter function returns a boolean value
          // if the boolean value is true, the film is included in the filtered films list
          resolve(films.filter(filterValues[filter].filterFunction));
          return;
      }

      // this is the resolve method of the promise if the filter is not defined in the filterValues object
      resolve(films);
    });
  });
};

/*===========================================================================*/
// we define the getFilm function that gets the film
// this function is used to get the film based on the id
exports.getFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE id=?';
    // the id is the parameter of the SQL query
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      }
      if (row == undefined) {
        resolve({ error: 'Film not found.' });
      } else {
        const film = convertFilmFromDbRecord(row);
        resolve(film);
      }
    });
  });
};

/*===========================================================================*/
// we define the createFilm function that creates the film in the database
exports.createFilm = (film) => {
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO films (title, favorite, watchDate, rating) VALUES(?, ?, ?, ?)';
    db.run(sql, [film.title, film.favorite, film.watchDate, film.rating], function (err) {
      if (err) {
        reject(err);
      }
      resolve(exports.getFilm(this.lastID));
    });
  });
};

/*===========================================================================*/
// we define the updateFilm function that updates the film in the database
exports.updateFilm = (id, film) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET title = ?, favorite = ?, watchDate = ?, rating = ? WHERE id = ?';
    db.run(sql, [film.title, film.favorite, film.watchDate, film.rating, id], function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes !== 1) {
        resolve({ error: 'Film not found.' });
      } else {
        resolve(exports.getFilm(id)); 
      }
    });
  });
};

/*===========================================================================*/
// we define the updateFilmRating function that updates the film rating in the database
exports.updateFilmRating = (id, deltaRating) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE films SET rating=rating+? WHERE id = ?';
    db.run(sql, [deltaRating, id], function (err) {
      if (err) {
        reject(err);
      }
      if (this.changes !== 1) {
        resolve({ error: 'Film not found.' });
      } else {
        resolve(exports.getFilm(id)); 
      }
    });
  });
};

/*===========================================================================*/
// we define the deleteFilm function that deletes the film from the database
exports.deleteFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM films WHERE id = ?';
    db.run(sql, [id], (err) => {
      if (err) {
        reject(err);
      } else
        resolve(null);
    });
  });
}
/*===========================================================================*/
