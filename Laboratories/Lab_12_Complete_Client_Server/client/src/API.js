import dayjs from 'dayjs';

const SERVER_URL = 'http://localhost:3001/api/';


/**
 * A utility function for parsing the HTTP response.
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

/**
 * Getting from the server side and returning the list of films.
 * The list of films could be filtered in the server-side through the optional parameter: filter.
 */
const getFilms = async (filter) => {
  // film.watchDate could be null or a string in the format YYYY-MM-DD
  return getJson(
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

// Add a new film
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

// Edit an existing film
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

// Delete a film
const deleteFilm = async (id) => {
  return getJson(
    fetch(SERVER_URL + `films/${id}`, {
      method: 'DELETE',
    })
  );
}

// Update favorite property in-line
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

// Update rating in-line
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

const API = { getFilms, addFilm, editFilm, deleteFilm, updateFavorite, updateRating };
export default API;