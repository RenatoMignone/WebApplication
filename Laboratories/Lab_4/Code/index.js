'use strict';

/*** Importing modules ***/
const express = require('express');
const morgan = require('morgan');
const { check, validationResult, body } = require('express-validator');

const filmDao = require('./dao-films');

/*** init express and set-up the middlewares ***/
const app = express();
app.use(morgan('dev'));
app.use(express.json());

/*** Utility Functions ***/
const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};

/*** Films APIs ***/

// 1. Retrieve the list of all the available films.
app.get('/api/films', 
  (req, res) => {
    filmDao.listFilms(req.query.filter)
      .then(films => res.json(films))
      .catch((err) => res.status(500).json(err));
  }
);

// 2. Retrieve a film, given its “id”.
app.get('/api/films/:id',
  [ check('id').isInt({min: 1}) ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json( errors.errors );
    }
    try {
      const result = await filmDao.getFilm(req.params.id);
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result);
    } catch (err) {
      res.status(500).end();
    }
  }
);

// 3. Create a new film, by providing all relevant information.
app.post('/api/films',
  [
    check('favorite').isBoolean(),
    check('watchDate').isLength({min: 10, max: 10}).isISO8601({strict: true}).optional({checkFalsy: true}),
    check('rating').isInt({min: 1, max: 5}),
  ], 
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json( errors.errors );
    }

    const film = {
      title: req.body.title,
      favorite: req.body.favorite,
      watchDate: req.body.watchDate,
      rating: req.body.rating,
    };

    try {
      const result = await filmDao.createFilm(film);
      res.json(result);
    } catch (err) {
      res.status(503).json({ error: `Database error during the creation of new film: ${err}` }); 
    }
  }
);

// 4. Update an existing film, by providing all the relevant information
app.put('/api/films/:id',
  [
    check('id').isInt({min: 1}),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json( errors.errors );
    }

    const filmId = Number(req.params.id);
    if (req.body.id && req.body.id !== filmId) {
      return res.status(422).json({ error: 'URL and body id mismatch' });
    }

    try {
      const film = await filmDao.getFilm(filmId);
      if (film.error)
        return res.status(404).json(film);
      const newFilm = {
        title: req.body.title || film.title,
        favorite: req.body.favorite || film.favorite,
        watchDate: req.body.watchDate || film.watchDate,
        rating: req.body.rating || film.rating,
      };
      const result = await filmDao.updateFilm(film.id, newFilm);
      if (result.error)
        res.status(404).json(result);
      else
        res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the update of film ${req.params.id}` });
    }
  }
);

// 5. Mark an existing film as favorite/unfavorite
app.put('/api/films/:id/favorite',
  [
    check('id').isInt({min: 1}),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json( errors.errors );
    }

    const filmId = Number(req.params.id);
    if (req.body.id && req.body.id !== filmId) {
      return res.status(422).json({ error: 'URL and body id mismatch' });
    }

    try {
      const film = await filmDao.getFilm(filmId);
      if (film.error)
        return res.status(404).json(film);
      film.favorite = req.body.favorite;
      const result = await filmDao.updateFilm(film.id, film);
      return res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the favorite update of film ${req.params.id}` });
    }
  }
);

// 6. Change the rating of a specific film
app.post('/api/films/change-rating',
  [
    check('id').isInt({min: 1}),
  ],
  async (req, res) => {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      return res.status(422).json( errors.errors );
    }

    try {
      const filmId = req.body.id;
      const deltaRating = req.body.deltaRating;
      const result = await filmDao.updateFilmRating(filmId, deltaRating);
      return res.json(result); 
    } catch (err) {
      res.status(503).json({ error: `Database error during the rating update of film ${req.params.id}` });
    }
  }
);

// 7. Delete an existing film, given its "id"
app.delete('/api/films/:id',
  async (req, res) => {
    try {
      await filmDao.deleteFilm(req.params.id);
      res.status(200).end();
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of film ${req.params.id}: ${err} ` });
    }
  }
);

// 8. Search films by title
app.get('/api/films/search/:title',
  async (req, res) => {
    try {
      const title = req.params.title;
      const sql = 'SELECT * FROM films WHERE title LIKE ?';
      db.all(sql, [`%${title}%`], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        const films = rows.map(row => ({
          id: row.id,
          title: row.title,
          favorite: row.favorite,
          watchDate: row.watchdate,
          rating: row.rating
        }));
        res.json(films);
      });
    } catch (err) {
      res.status(500).json({ error: `Database error during the search of films: ${err}` });
    }
  }
);

// Activating the server
const PORT = 3001;
app.listen(PORT, ()=>console.log(`Server running on http://localhost:${PORT}/`));
