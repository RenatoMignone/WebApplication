/*
 * Web Applications - API Utility Functions
 */

import dayjs from 'dayjs';

//---------------------------------------------------------------------------------
//------------------------------- SERVER URL --------------------------------------
//---------------------------------------------------------------------------------
const SERVER_URL = 'http://localhost:3001/api/';


//---------------------------------------------------------------------------------
//------------------------------- UTILITY FUNCTIONS -------------------------------
//---------------------------------------------------------------------------------

/**
 * A utility function for parsing the HTTP response.
 * Always expects JSON from the server, even for errors.
 */
function getJson(httpResponsePromise) {
  // server API always return JSON, in case of error the format is the following { error: <message> } 
  return new Promise((resolve, reject) => {
    httpResponsePromise
      .then((response) => {
        if (response.ok) {

         // the server always returns a JSON, even empty {}. Never null or non json, otherwise the method will fail
         response.json()
            .then( json => resolve(json) )
            .catch( err => reject({ error: "Cannot parse server response" }))

        } else {
          // analyzing the cause of error
          response.json()
            .then(obj => 
              reject(obj)
              ) // error msg in the response body
            .catch(err => reject({ error: "Cannot parse server response" })) // something else
        }
      })
      .catch(err => 
        reject({ error: "Cannot communicate"  })
      ) // connection error
  });
}


//---------------------------------------------------------------------------------
//------------------------------- API: FILMS --------------------------------------
//---------------------------------------------------------------------------------

/**
 * Get the list of films from the server.
 * Optionally filtered by a filter parameter.
 * Converts watchDate to dayjs object if present.
 */
const getFilms = async (filter) => {
  // film.watchDate could be null or a string in the format YYYY-MM-DD
  return getJson(
    // if filter is set, use the filter API, otherwise use the default API
    filter 
      ? fetch(SERVER_URL + 'films?filter=' + filter)
      : fetch(SERVER_URL + 'films')
  ).then( json => {
    return json.map((film) => {
      const clientFilm = {
        id: film.id,
        title: film.title,
        favorite: film.favorite,
        rating: film.rating,
        user: film.user
      }
      if (film.watchDate != null)
        clientFilm.watchDate = dayjs(film.watchDate);
      return clientFilm;
    })
  })
}

//---------------------------------------------------------------------------------

/**
 * Add a new film to the server.
 * Converts favorite to 0/1 and watchDate to string.
 */
const addFilm = async (film) => {
  // Convert favorite to 0/1 for server, and watchDate to string
  const body = {
    title: film.title,
    favorite: film.favorite ? 1 : 0,
    watchDate: film.watchDate ? dayjs(film.watchDate).format('YYYY-MM-DD') : null,
    rating: film.rating,
  };
  return getJson(
    fetch(SERVER_URL + 'films', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  );
}

//---------------------------------------------------------------------------------

/**
 * Edit an existing film on the server.
 * Converts favorite to 0/1 and watchDate to string.
 */
const editFilm = async (film) => {
  const body = {
    id: film.id,
    title: film.title,
    favorite: film.favorite ? 1 : 0,
    watchDate: film.watchDate ? dayjs(film.watchDate).format('YYYY-MM-DD') : null,
    rating: film.rating,
  };
  return getJson(
    fetch(SERVER_URL + `films/${film.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  );
}

//---------------------------------------------------------------------------------

/**
 * Delete a film from the server by id.
 */
const deleteFilm = async (id) => {
  return getJson(
    fetch(SERVER_URL + `films/${id}`, {
      method: 'DELETE',
    })
  );
}

//---------------------------------------------------------------------------------

/**
 * Update the favorite property of a film in-line.
 * Used for quick favorite toggling.
 */
const updateFavorite = async (film) => {
  const body = {
    id: film.id,
    favorite: film.favorite ? 1 : 0,
    title: film.title,
    watchDate: film.watchDate ? dayjs(film.watchDate).format('YYYY-MM-DD') : null,
    rating: film.rating,
  };
  return getJson(
    fetch(SERVER_URL + `films/${film.id}/favorite`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  );
}

//---------------------------------------------------------------------------------

/**
 * Update the rating of a film in-line.
 * Uses a delta API if rating is set, otherwise falls back to editFilm.
 */
const updateRating = async (film, newRating) => {
  // If rating is not set, fallback to editFilm
  if (!film.rating) {
    // fallback to editFilm
    return editFilm({ ...film, rating: newRating });
  }
  // Use change-rating API with delta
  const delta = newRating - film.rating;
  if (delta === 0) return Promise.resolve(film);
  const body = {
    id: film.id,
    deltaRating: delta,
  };
  return getJson(
    fetch(SERVER_URL + 'films/change-rating', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  );
}

//---------------------------------------------------------------------------------
//------------------------------- EXPORT API OBJECT -------------------------------
//---------------------------------------------------------------------------------

const API = { getFilms, addFilm, editFilm, deleteFilm, updateFavorite, updateRating };
export default API;