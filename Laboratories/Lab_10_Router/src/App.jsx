import { useState } from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { FilmTable } from './components/FilmLibrary.jsx';
import FilmForm from './components/FilmForm.jsx';
import { Filters } from './components/Filters.jsx'; // <-- import the new Filters component
import dayjs from 'dayjs';
import './App.css'

// Initial films data
const initialFilms = [
  { id: 1, title: "Pulp Fiction", favorite: true, watchDate: dayjs("2024-03-10"), rating: 5 },
  { id: 2, title: "21 Grams", favorite: true, watchDate: dayjs("2024-03-17"), rating: 4 },
  { id: 3, title: "Star Wars", favorite: false, watchDate: undefined, rating: undefined },
  { id: 4, title: "Matrix", favorite: false, watchDate: dayjs("2024-03-21"), rating: 5 },
  { id: 5, title: "Shrek", favorite: false, watchDate: dayjs("2024-03-16"), rating: 3 }
];

// ----------

// Header component for the application, displays the navbar.
function MyHeader() {
  return (
    <Navbar bg="primary" variant="dark" className="mb-4">
      <Container fluid>
        <Navbar.Brand>
          <i className="bi bi-collection-play" /> Film Library
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

// ----------

// Footer component for the application, displays the footer.
function MyFooter() {
  return (
    <footer>
      <p>&copy; Web Applications</p>
    </footer>
  );
}

// ----------

// Main application content, handles routing, state, and logic for films and filters.
function AppContent() {
  const [films, setFilms] = useState(initialFilms);
  const navigate = useNavigate();
  const location = useLocation();

  // Filters definition
  const filters = {
    'all': { label: 'All', filterFunction: () => true },
    'favorite': { label: 'Favorites', filterFunction: film => film.favorite },
    'best': { label: 'Best Rated', filterFunction: film => film.rating >= 5 },
    'lastmonth': { label: 'Seen Last Month', filterFunction: film => isSeenLastMonth(film) },
    'unseen': { label: 'Unseen', filterFunction: film => !film.watchDate }
  };
  const filterKeys = Object.keys(filters);

  // Determine active filter from URL
  let activeFilter = 'all';
  if (location.pathname.startsWith('/filter/')) {
    const urlFilter = location.pathname.split('/')[2];
    if (filterKeys.includes(urlFilter)) activeFilter = urlFilter;
  }

  // Add a new film to the list and navigate back to the current filter.
  function addFilm(film) {
    const newId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;
    setFilms(films => [...films, { ...film, id: newId }]);
    navigate(`/filter/${activeFilter}`);
  }

  // Edit an existing film and navigate back to the current filter.
  function editFilm(updatedFilm) {
    setFilms(films => films.map(f => f.id === updatedFilm.id ? updatedFilm : f));
    navigate(`/filter/${activeFilter}`);
  }

  // Delete a film by id.
  function deleteFilm(id) {
    setFilms(films => films.filter(f => f.id !== id));
  }

  // Toggle the 'favorite' status of a film by id.
  function toggleFavorite(id) {
    setFilms(films => films.map(f => f.id === id ? { ...f, favorite: !f.favorite } : f));
  }

  // Set the rating for a film by id.
  function setRating(id, rating) {
    setFilms(films => films.map(f => f.id === id ? { ...f, rating } : f));
  }

  // Navigate to a selected filter.
  function handleFilterSelect(filterKey) {
    navigate(`/filter/${filterKey}`);
  }

  // Helper to check if a film was seen last month.
  function isSeenLastMonth(film) {
    if (film.watchDate) {
      const diff = film.watchDate.diff(dayjs(), 'month');
      return diff <= 0 && diff > -1;
    }
    return false;
  }

  // Show "+" only on filter routes
  const showAddButton = location.pathname.startsWith('/filter/') || location.pathname === '/';

  // Get a film object by its id.
  function getFilmById(id) {
    return films.find(f => f.id === Number(id));
  }

  // Filters array for sidebar
  const filterArray = filterKeys.map(key => ({ filterName: key, label: filters[key].label }));

  return (
    <Container fluid>
      <Row>
        <Col>
          <MyHeader />
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="sidebar">
          <Filters items={filterArray} selected={activeFilter} onSelect={handleFilterSelect} />
        </Col>
        <Col xs={9}>
          <Routes>
            {/* 
              "/" route:
              - Redirects to "/filter/all" using <Navigate>.
              - Ensures the default view is the full film list.
            */}
            <Route path="/" element={<Navigate to="/filter/all" replace />} />

            {/*
              "/filter/:filterName" route:
              - Displays the film table filtered by the selected filter.
              - Shows the filter name and an "Add Film" button.
              - The FilmTable receives the filtered films and handlers for delete, edit, favorite toggle, and rating.
              - The filter is determined by the URL parameter.
            */}
            <Route path="/filter/:filterName" element={
              <>
                <div className="d-flex flex-row justify-content-between">
                  <h1 className="my-2">Filter: <span>{filters[activeFilter].label}</span></h1>
                  {showAddButton &&
                    <Button variant="success" className="my-2" onClick={() => navigate('/add')}>
                      <i className="bi bi-plus-lg"></i> Add Film
                    </Button>
                  }
                </div>
                <FilmTable
                  films={films.filter(filters[activeFilter].filterFunction)}
                  delete={deleteFilm}
                  onEdit={film => navigate(`/edit/${film.id}`)}
                  onToggleFavorite={toggleFavorite}
                  onSetRating={setRating}
                />
              </>
            } />

            {/*
              "/add" route:
              - Shows the FilmForm for adding a new film.
              - The addFilm handler is passed to the form.
              - onCancel navigates back to the current filter.
            */}
            <Route path="/add" element={
              <>
                <h1 className="my-2">Add Film</h1>
                <FilmForm addFilm={addFilm} onCancel={() => navigate(`/filter/${activeFilter}`)} />
              </>
            } />

            {/*
              "/edit/:filmId" route:
              - Shows the FilmForm for editing an existing film.
              - The EditFilmWrapper extracts the filmId from the URL, finds the film, and passes it to the form.
              - editFilm and onCancel handlers are provided.
            */}
            <Route path="/edit/:filmId" element={
              <>
                <EditFilmWrapper getFilmById={getFilmById} editFilm={editFilm} onCancel={() => navigate(`/filter/${activeFilter}`)} />
              </>
            } />

            {/*
              "*" (catch-all) route:
              - Redirects any unknown route to "/filter/all".
              - Acts as a fallback for invalid URLs.
            */}
            <Route path="*" element={<Navigate to="/filter/all" replace />} />
          </Routes>
        </Col>
      </Row>
      <Row>
        <Col>
          <MyFooter />
        </Col>
      </Row>
    </Container>
  );
}

// ----------

// Wrapper for the edit route, extracts filmId from params and renders FilmForm for editing.
function EditFilmWrapper({ getFilmById, editFilm, onCancel }) {
  const { filmId } = useParams();
  const film = getFilmById(filmId);
  if (!film) return <p>Film not found</p>;
  return <FilmForm editingFilm={film} editFilm={editFilm} onCancel={onCancel} />;
}

// ----------

// Root App component, sets up the router.
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
