/*
 * Web Applications
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import dayjs from 'dayjs';

import { React, useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Routes, Route, Outlet, Link, useParams, Navigate } from 'react-router';

//import FILMS from './films';

import { GenericLayout, NotFoundLayout, TableLayout, AddLayout, EditLayout } from './components/Layout';
import API from './API.js';


//---------------------------------------------------------------------------------
//----------------------------------- APP COMPONENT -------------------------------
//---------------------------------------------------------------------------------
function App() {

  //---------------------------------------------------------------------------------
  //------------------------------- STATE VARIABLES --------------------------------
  //---------------------------------------------------------------------------------
  const [filmList, setFilmList] = useState([]);

  //---------------------------------------------------------------------------------
  //------------------------------- USE EFFECTS ------------------------------------
  //---------------------------------------------------------------------------------
  // Always load films on mount
  useEffect(() => {
    API.getFilms()
    .then(films => {
      setFilmList(films);
    })
    .catch(e => { console.log(e); } ); 
  }, []);

  //---------------------------------------------------------------------------------
  //------------------------------- FILTERS DEFINITION -----------------------------
  //---------------------------------------------------------------------------------
  /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - A URL for the router
   * - A filter function applied before passing the films to the FilmTable component
   */

  // The filter function is called for each film and must return true if the film must be shown
  const filters = {
    'all': { label: 'All', url: '/', filterFunction: () => true },
    'favorite': { label: 'Favorites', url: '/filter/favorite', filterFunction: film => film.favorite },
    'best': { label: 'Best Rated', url: '/filter/best', filterFunction: film => film.rating >= 5 },
    'lastmonth': { label: 'Seen Last Month', url: '/filter/lastmonth', filterFunction: film => isSeenLastMonth(film) },
    'unseen': { label: 'Unseen', url: '/filter/unseen', filterFunction: film => film.watchDate ? false : true }
  };

  //---------------------------------------------------------------------------------
  //------------------------------- FILTER HELPERS ---------------------------------
  //---------------------------------------------------------------------------------
  // This function is used to filter the films seen in the last month
  // It is used in the filter function of the filter 'lastmonth'
  const isSeenLastMonth = (film) => {
    if ('watchDate' in film) {  // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(), 'month')
      const isLastMonth = diff <= 0 && diff > -1;      // last month
      return isLastMonth;
    }
  }

  //---------------------------------------------------------------------------------
  //------------------------------- FILTERS TO ARRAY -------------------------------
  //---------------------------------------------------------------------------------
  const filtersToArray = Object.entries(filters);
  //console.log(JSON.stringify(filtersToArray));

  // NB: to implicitly return an object in an arrow function, use () around the object {}
  // const filterArray = filtersToArray.map( e => ({filterName: e[0], ...e[1]}) );
  // alternative with destructuring directly in the parameter of the callback 
  const filterArray = filtersToArray.map(([filterName, obj ]) =>
     ({ filterName: filterName, ...obj }));

  //---------------------------------------------------------------------------------
  //------------------------------- FILM OPERATIONS --------------------------------
  //---------------------------------------------------------------------------------
  // The following functions are using the API intergration with the backend.

  //Does the delete request of a specific film
  function deleteFilm(filmId) {
    API.deleteFilm(filmId)
      .then(() => API.getFilms())
      .then(films => setFilmList(films))
      .catch(e => { console.log(e); });
  }

  // Does the edit request of a specific film
  function editFilm(film) {
    API.editFilm(film)
      .then(() => API.getFilms())
      .then(films => setFilmList(films))
      .catch(e => { console.log(e); });
  }

  // Does the add request of a specific film
  function addFilm(film) {
    API.addFilm(film)
      .then(() => API.getFilms())
      .then(films => setFilmList(films))
      .catch(e => { console.log(e); });
  }

  // For in-line favorite and rating updates
  // This one is used when the films is marked as favorite or not
  // It is used inline in the FilmLibrary component
  function editFilmFavorite(film, newFavorite) {
    API.updateFavorite({ ...film, favorite: newFavorite })
      .then(() => API.getFilms())
      .then(films => setFilmList(films))
      .catch(e => { console.log(e); });
  }

  function editFilmRating(film, newRating) {
    if (film.rating === newRating) return; // do not trigger update if same
    API.updateRating(film, newRating)
      .then(() => API.getFilms())
      .then(films => setFilmList(films))
      .catch(e => { console.log(e); });
  }








  //---------------------------------------------------------------------------------
  //------------------------------- RENDERING --------------------------------------
  //---------------------------------------------------------------------------------
  
  // This is the return value of the App component. When another component will call the App one, 
  // it will be rendered with the following structure. The main.jsx file will call the App component

  // The GenericLayout component is the main layout of the application. It contains the header and the footer.
  // This is defined inside the path: ./components/Layout.jsx, and is used to wrap the different layouts of the application.

  return (
      // The "Container" component is a Bootstrap component that provides a responsive fixed width container.
      <Container fluid>

        {/* ------------------------------------------------------------------------- */}
        {/* The "Routes" component is defined by the react-router library. It is used to define the 
            different routes of the application, so the different endpoints of the frontend web page. */}
        <Routes>

          {/* ------------------------------------------------------------------------- */}
          {/* The "Route" component is used to define a route. The "path" prop is the URL path of the route.*/}
          {/* Here we are doing a sort of encapsulation. We define as based path the "/" one, and after it*/}
          {/* We will define the other ones, so all the paths defined after the "/" */}
          <Route path="/" element={
            <GenericLayout filterArray={filterArray} 
            />
          }>

            {/* ------------------------------------------------------------------------- */}
            {/* The index route renders the TableLayout for the root path */}
            <Route index element={

              // The "TableLayout" component is used to define the table layout of the application.
              <TableLayout 
                 // All these props are passed to the TableLayout component, that will use them to render the table                 
                 filmList={filmList} 
                 setFilmList={setFilmList} 
                 filters={filters} 
                 deleteFilm={deleteFilm} 
                 editFilm={editFilm}
                 editFilmFavorite={editFilmFavorite} 
                 editFilmRating={editFilmRating}
                />
            }/>

            {/* ------------------------------------------------------------------------- */}
            {/* The "add" route renders the AddLayout for adding a new film */}
            <Route path="add" element={
              
              // The "AddLayout" component is used to defined how to render the add film page
              // takes as input the addFilm function, that will be used to add a new film
              <AddLayout addFilm={addFilm} 
              />}

            />

            {/* ------------------------------------------------------------------------- */}
            {/* The "edit/:filmId" route renders the EditLayout for editing a film */}
            <Route path="edit/:filmId" element={
              
              // The "EditLayout" component is used to defined how to render the edit film page
              // takes as input the editFilm function, that will be used to edit a film
              <EditLayout films={filmList} editFilm={editFilm} 
              />} 
            
            />

            {/* ------------------------------------------------------------------------- */}
            {/* The "filter/:filterId" route renders the TableLayout with a specific filter */}
            <Route path="filter/:filterId" element={

              // This one here will be used to render the table layout with a specific filter
              // so based on the id of the filter, we display a different table based on the filter function
              <TableLayout 
                 filmList={filmList} 
                 setFilmList={setFilmList}
                 filters={filters} 
                 deleteFilm={deleteFilm} 
                 editFilm={editFilm}
                 editFilmFavorite={editFilmFavorite} 
                 editFilmRating={editFilmRating}
              />

            }/>

            {/* ------------------------------------------------------------------------- */}
            {/* The "*" route renders the NotFoundLayout for any undefined path */}
            <Route path="*" element={
              
              // Whenever there is a path that is not defined, we will render the NotFoundLayout component
              <NotFoundLayout 
              />} 
            
            />

          </Route>

        </Routes>

      </Container>
  );
}


export default App;
