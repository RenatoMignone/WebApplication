import { useState } from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation, Navigate } from 'react-router-dom';
import { FilmTable } from './components/FilmLibrary.jsx';
import FilmForm from './components/FilmForm.jsx';
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

// Header component
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

// Footer component
function MyFooter() {
  return (
    <footer>
      <p>&copy; Web Applications</p>
    </footer>
  );
}

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

  // Add a new film
  function addFilm(film) {
    const newId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;
    setFilms(films => [...films, { ...film, id: newId }]);
    navigate(`/filter/${activeFilter}`);
  }

  // Edit an existing film
  function editFilm(updatedFilm) {
    setFilms(films => films.map(f => f.id === updatedFilm.id ? updatedFilm : f));
    navigate(`/filter/${activeFilter}`);
  }

  // Delete a film
  function deleteFilm(id) {
    setFilms(films => films.filter(f => f.id !== id));
  }

  // In-line favorite toggle
  function toggleFavorite(id) {
    setFilms(films => films.map(f => f.id === id ? { ...f, favorite: !f.favorite } : f));
  }

  // In-line rating update
  function setRating(id, rating) {
    setFilms(films => films.map(f => f.id === id ? { ...f, rating } : f));
  }

  // Filter navigation
  function handleFilterSelect(filterKey) {
    navigate(`/filter/${filterKey}`);
  }

  // isSeenLastMonth helper
  function isSeenLastMonth(film) {
    if (film.watchDate) {
      const diff = film.watchDate.diff(dayjs(), 'month');
      return diff <= 0 && diff > -1;
    }
    return false;
  }

  // Show "+" only on filter routes
  const showAddButton = location.pathname.startsWith('/filter/') || location.pathname === '/';

  // Get film for editing
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
          <SidebarFilters items={filterArray} selected={activeFilter} onSelect={handleFilterSelect} />
        </Col>
        <Col xs={9}>
          <Routes>
            <Route path="/" element={<Navigate to="/filter/all" replace />} />
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
            <Route path="/add" element={
              <>
                <h1 className="my-2">Add Film</h1>
                <FilmForm addFilm={addFilm} onCancel={() => navigate(`/filter/${activeFilter}`)} />
              </>
            } />
            <Route path="/edit/:filmId" element={
              <>
                <EditFilmWrapper getFilmById={getFilmById} editFilm={editFilm} onCancel={() => navigate(`/filter/${activeFilter}`)} />
              </>
            } />
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

// SidebarFilters component (replaces Filters)
function SidebarFilters({ items, selected, onSelect }) {
  return (
    <ul className="list-group">
      {items.map(item =>
        <li key={item.filterName}
          className={`list-group-item ${selected === item.filterName ? 'active' : ''}`}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelect(item.filterName)}>
          {item.label}
        </li>
      )}
    </ul>
  );
}

// Wrapper for edit route to extract filmId param
function EditFilmWrapper({ getFilmById, editFilm, onCancel }) {
  const { filmId } = useParams();
  const film = getFilmById(filmId);
  if (!film) return <p>Film not found</p>;
  return <FilmForm editingFilm={film} editFilm={editFilm} onCancel={onCancel} />;
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
