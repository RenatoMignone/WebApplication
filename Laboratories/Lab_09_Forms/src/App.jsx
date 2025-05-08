import { useState } from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import { FilmTable } from './components/FilmLibrary.jsx';
import FilmForm from './components/FilmForm.jsx';
import dayjs from 'dayjs';

// Example initial films
const initialFilms = [
  { id: 1, title: "Pulp Fiction", favorite: true, watchDate: dayjs("2024-03-10"), rating: 5 },
  { id: 2, title: "21 Grams", favorite: true, watchDate: dayjs("2024-03-17"), rating: 4 },
  { id: 3, title: "Star Wars", favorite: false, watchDate: undefined, rating: undefined },
  { id: 4, title: "Matrix", favorite: false, watchDate: dayjs("2024-03-21"), rating: 5 },
  { id: 5, title: "Shrek", favorite: false, watchDate: dayjs("2024-03-16"), rating: 3 }
];

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

function MyFooter() {
  return (
    <footer>
      <p>&copy; Web Applications</p>
    </footer>
  );
}

function App() {
  const [films, setFilms] = useState(initialFilms);
  const [showForm, setShowForm] = useState(false);
  const [editingFilm, setEditingFilm] = useState(null);

  // Add a new film
  function addFilm(film) {
    const newId = films.length > 0 ? Math.max(...films.map(f => f.id)) + 1 : 1;
    setFilms(films => [...films, { ...film, id: newId }]);
    setShowForm(false);
    setEditingFilm(null);
  }

  // Edit an existing film
  function editFilm(updatedFilm) {
    setFilms(films => films.map(f => f.id === updatedFilm.id ? updatedFilm : f));
    setShowForm(false);
    setEditingFilm(null);
  }

  // Delete a film
  function deleteFilm(id) {
    setFilms(films => films.filter(f => f.id !== id));
  }

  // Show form for adding
  function handleAddClick() {
    setShowForm(true);
    setEditingFilm(null);
  }

  // Show form for editing
  function handleEditClick(film) {
    setShowForm(true);
    setEditingFilm(film);
  }

  // Cancel form
  function handleCancel() {
    setShowForm(false);
    setEditingFilm(null);
  }

  return (
    <Container fluid>
      <Row>
        <Col>
          <MyHeader />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Film Library</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <FilmTable films={films} delete={deleteFilm} onEdit={handleEditClick} />
        </Col>
      </Row>
      <Row>
        <Col>
          {!showForm && (
            <div className="my-3">
              <Button variant="success" onClick={handleAddClick}>
                <i className="bi bi-plus-lg"></i> Add Film
              </Button>
            </div>
          )}
        </Col>
      </Row>
      {showForm && (
        <Row>
          <Col>
            <FilmForm
              addFilm={addFilm}
              editFilm={editFilm}
              editingFilm={editingFilm}
              onCancel={handleCancel}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <MyFooter />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
