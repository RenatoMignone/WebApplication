import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row, Navbar, Button, Spinner } from 'react-bootstrap';
import { Routes, Route, useNavigate, useParams, useLocation, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { FilmTable } from './components/FilmLibrary.jsx';
import FilmForm from './components/FilmForm.jsx';
import { Filters } from './components/Filters.jsx';
import MyNavbar from './components/MyNavbar.jsx';
import dayjs from 'dayjs';
import './App.css';

import API from './API.js';

function MyHeader(props) {
	return (
		<Navbar bg="primary" variant="dark">
      <Navbar.Brand className="mx-2">
      <i className="bi bi-collection-play" />
      {/* props.appName just in case you want to set a different app name */}
			{props.appName || "HeapOverrun"}
      </Navbar.Brand>
		</Navbar>
	);
}


function MyFooter() {
  return (<footer>
    <p>&copy; Web Applications</p>
    <div id="time"></div>
  </footer>);
}

// ----------

// Main application content, handles state and logic for films and filters.
function AppContent() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Filters definition (from Lab 10)
  const filters = {
    'all': { label: 'All' },
    'favorite': { label: 'Favorites' },
    'best': { label: 'Best Rated' },
    'lastmonth': { label: 'Seen Last Month' },
    'unseen': { label: 'Unseen' }
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

  // Fetch films from server when component mounts or filter changes
  useEffect(() => {
    setLoading(true);
    setErrorMsg('');
    API.getFilms(activeFilter)
      .then(data => {
        setFilms(data);
        setLoading(false);
      })
      .catch(err => {
        setErrorMsg('Error loading films from server');
        setFilms([]);
        setLoading(false);
      });
  }, [activeFilter]);

  // Add, edit, delete, toggleFavorite, setRating: still local only
  function addFilm(film) {
    const newId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;
    setFilms(films => [...films, { ...film, id: newId }]);
    navigate('/filter');
  }
  function editFilm(updatedFilm) {
    setFilms(films => films.map(f => f.id === updatedFilm.id ? updatedFilm : f));
    navigate('/filter');
  }
  function deleteFilm(id) {
    setFilms(films => films.filter(f => f.id !== id));
  }
  function toggleFavorite(id) {
    setFilms(films => films.map(f => f.id === id ? { ...f, favorite: !f.favorite } : f));
  }
  function setRating(id, rating) {
    setFilms(films => films.map(f => f.id === id ? { ...f, rating } : f));
  }
  function handleFilterSelect(filterKey) {
    navigate(filterKey === 'all' ? '/filter' : `/filter/${filterKey}`);
  }
  function getFilmById(id) {
    return films.find(f => f.id === Number(id));
  }
  const filterArray = filterKeys.map(key => ({ filterName: key, label: filters[key].label }));

  return (
    <Container fluid>
      <Row>
        <Col>
          <MyNavbar />
        </Col>
      </Row>
      <Row>
        <Col xs={3} className="sidebar">
          <Filters items={filterArray} selected={activeFilter} onSelect={handleFilterSelect} />
        </Col>
        <Col xs={9}>
          {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          {loading
            ? <div className="d-flex align-items-center"><Spinner animation="border" className="me-2" /> Loading films...</div>
            : <Outlet context={{
                films, filters, activeFilter, deleteFilm, toggleFavorite, setRating, navigate, addFilm, editFilm, getFilmById, filterArray, handleFilterSelect
              }} />
          }
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

// FilterPage: shows the film table with the current filter and add button
function FilterPage() {
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
        films={films}
        delete={deleteFilm}
        onEdit={film => navigate(`/edit/${film.id}`)}
        onToggleFavorite={toggleFavorite}
        onSetRating={setRating}
      />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Root route with layout and sidebar */}
      <Route path="/" element={<AppContent />}>
        {/* Default: redirect to /filter */}
        <Route index element={<Navigate to="/filter" replace />} />
        {/* Filter table */}
        <Route path="filter" element={<FilterPage />} />
        <Route path="filter/:filterName" element={<FilterPage />} />
        {/* Add film */}
        <Route path="add" element={<FilmForm onSave={film => {}} />} />
        {/* Edit film */}
        <Route path="edit/:filmId" element={<FilmForm onSave={film => {}} />} />
        {/* Catch-all: redirect to /filter */}
        <Route path="*" element={<Navigate to="/filter" replace />} />
      </Route>
    </Routes>
  );
}

function Layout(props) {

  return (
    <Container fluid>
      <Row>
        <Col>
          <MyHeader />
        </Col>
      </Row>
      <Outlet />
      <Row>
        <Col>
          <MyFooter />
        </Col>
      </Row>
    </Container>
  )
}

function DefaultRoute(props) {
  return (
    <Container fluid>
      <p className="my-2">No data here: This is not a valid page!</p>
      <Link to='/'>Please go back to main page</Link>
    </Container>
  );
}


export default App
