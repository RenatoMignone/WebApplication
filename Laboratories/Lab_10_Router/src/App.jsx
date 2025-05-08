import { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation, Navigate, Outlet, Link, useOutletContext } from 'react-router-dom';
import { FilmTable } from './components/FilmLibrary.jsx';
import FilmForm from './components/FilmForm.jsx';
import { Filters } from './components/Filters.jsx';
import MyNavbar from './components/MyNavbar.jsx'; // <-- import the new navbar component
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

// Footer component for the application, displays the footer.
function MyFooter() {
  return (
    <footer>
      <p>&copy; Web Applications</p>
    </footer>
  );
}

// ----------

// Main application content, handles state and logic for films and filters.
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

  // Determine active filter from URL (default to 'all')
  let activeFilter = 'all';
  if (location.pathname.startsWith('/filter/')) {
    const urlFilter = location.pathname.split('/')[2];
    if (filterKeys.includes(urlFilter)) activeFilter = urlFilter;
  } else if (location.pathname === '/filter') {
    activeFilter = 'all';
  }

  // Add a new film to the list and navigate back to the filter.
  function addFilm(film) {
    const newId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;
    setFilms(films => [...films, { ...film, id: newId }]);
    navigate('/filter');
  }

  // Edit an existing film and navigate back to the filter.
  function editFilm(updatedFilm) {
    setFilms(films => films.map(f => f.id === updatedFilm.id ? updatedFilm : f));
    navigate('/filter');
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
    navigate(filterKey === 'all' ? '/filter' : `/filter/${filterKey}`);
  }

  // Helper to check if a film was seen last month.
  function isSeenLastMonth(film) {
    if (film.watchDate) {
      const diff = film.watchDate.diff(dayjs(), 'month');
      return diff <= 0 && diff > -1;
    }
    return false;
  }

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
          <MyNavbar /> {/* Use the new navbar component */}
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="sidebar">
          <Filters items={filterArray} selected={activeFilter} onSelect={handleFilterSelect} />
        </Col>
        <Col xs={9}>
          {/* Outlet for nested routes */}
          <Outlet context={{
            films, filters, activeFilter, deleteFilm, toggleFavorite, setRating, navigate, addFilm, editFilm, getFilmById, filterArray, handleFilterSelect
          }} />
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

// FilterPage: shows the film table with the current filter and add button
function FilterPage() {
  // Get context from Outlet
  const { films, filters, activeFilter, deleteFilm, toggleFavorite, setRating, navigate } = useOutletContext();

  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <h1 className="my-2">Filter: <span>{filters[activeFilter].label}</span></h1>
        <Button variant="success" className="my-2" onClick={() => navigate('/add')}>
          <i className="bi bi-plus-lg"></i> Add Film
        </Button>
      </div>
      <FilmTable
        films={films.filter(filters[activeFilter].filterFunction)}
        delete={deleteFilm}
        onEdit={film => navigate(`/edit/${film.id}`)}
        onToggleFavorite={toggleFavorite}
        onSetRating={setRating}
      />
    </>
  );
}

// AddPage: shows the FilmForm for adding a film
function AddPage() {
  const { addFilm, activeFilter, navigate } = useOutletContext();
  return (
    <>
      <h1 className="my-2">Add Film</h1>
      <FilmForm addFilm={addFilm} onCancel={() => navigate('/filter')} />
    </>
  );
}

// EditPage: shows the FilmForm for editing a film
function EditPage() {
  const { getFilmById, editFilm, navigate } = useOutletContext();
  const { filmId } = useParams();
  const film = getFilmById(filmId);
  if (!film) return <p>Film not found</p>;
  return <FilmForm editingFilm={film} editFilm={editFilm} onCancel={() => navigate('/filter')} />;
}

// ----------

// Root App component, sets up the router with nested routes.
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root route with layout and sidebar */}
        <Route path="/" element={<AppContent />}>
          {/* Default: redirect to /filter */}
          <Route index element={<Navigate to="/filter" replace />} />
          {/* Filter table */}
          <Route path="filter" element={<FilterPage />} />
          <Route path="filter/:filterName" element={<FilterPage />} />
          {/* Add film */}
          <Route path="add" element={<AddPage />} />
          {/* Edit film */}
          <Route path="edit/:filmId" element={<EditPage />} />
          {/* Catch-all: redirect to /filter */}
          <Route path="*" element={<Navigate to="/filter" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
