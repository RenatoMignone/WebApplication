'use strict';

/* Data Access Object (DAO) module for accessing films data */

const db = require('./db');
const dayjs = require("dayjs");

const filterValues = {
  'favorite':  { filterFunction: film => film.favorite },
  'best':      { filterFunction: film => film.rating >= 5 },
  'lastmonth': { filterFunction: film => isSeenLastMonth(film) },
  'unseen':    { filterFunction: film => film.watchDate ? false : true },
  'all':       { filterFunction: film => true },
};

const isSeenLastMonth = (film) => {
  if('watchDate' in film && film.watchDate) {
    const diff = dayjs(film.watchDate).diff(dayjs(),'month');
    const isLastMonth = diff <= 0 && diff > -1;
    return isLastMonth;
  }
}

const convertFilmFromDbRecord = (dbRecord) => {
  const film = {};
  film.id = dbRecord.id;
  film.title = dbRecord.title;
  film.favorite = dbRecord.favorite;
  film.watchDate = dbRecord.watchdate;
  film.rating = dbRecord.rating;
  return film;
}

exports.listFilms = (filter) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films';
    db.all(sql, (err, rows) => {
      if (err) { reject(err); }

      const films = rows.map((e) => {
        const film = convertFilmFromDbRecord(e);
        delete film.watchdate;
        return film;
      });

      if (filter) {
        if (filterValues.hasOwnProperty(filter)) 
          resolve(films.filter(filterValues[filter].filterFunction));
          return;
      }
      resolve(films);
    });
  });
};

exports.getFilm = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM films WHERE id=?';
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
