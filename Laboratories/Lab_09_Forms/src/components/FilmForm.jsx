import { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import dayjs from 'dayjs';

// FilmForm handles both add and edit operations
function FilmForm({ addFilm, editFilm, editingFilm, onCancel }) {
  // If editingFilm is set, we're editing, otherwise we're adding
  const [title, setTitle] = useState(editingFilm ? editingFilm.title : '');
  const [favorite, setFavorite] = useState(editingFilm ? editingFilm.favorite : false);
  const [watchDate, setWatchDate] = useState(editingFilm && editingFilm.watchDate ? editingFilm.watchDate.format('YYYY-MM-DD') : '');
  const [rating, setRating] = useState(editingFilm && editingFilm.rating !== undefined ? editingFilm.rating : '');
  const [errorMsg, setErrorMsg] = useState('');

  // Update form fields when editingFilm changes (for edit mode)
  useEffect(() => {
    if (editingFilm) {
      setTitle(editingFilm.title);
      setFavorite(editingFilm.favorite);
      setWatchDate(editingFilm.watchDate ? editingFilm.watchDate.format('YYYY-MM-DD') : '');
      setRating(editingFilm.rating !== undefined ? editingFilm.rating : '');
    }
  }, [editingFilm]);

  // Validation and submit handler
  function handleSubmit(event) {
    event.preventDefault();
    // Validation
    if (!title.trim()) {
      setErrorMsg('Title must not be empty.');
      return;
    }
    if (rating === '' || isNaN(rating) || rating < 0 || rating > 5) {
      setErrorMsg('Rating must be a number between 0 and 5.');
      return;
    }
    // Build film object
    const film = {
      title: title.trim(),
      favorite: favorite,
      watchDate: watchDate ? dayjs(watchDate) : undefined,
      rating: Number(rating)
    };
    if (editingFilm) {
      film.id = editingFilm.id;
      editFilm(film);
    } else {
      addFilm(film);
    }
    // Reset form and errors
    setErrorMsg('');
  }

  return (
    <Row className="my-3">
      <Col>
        {errorMsg && <Alert variant="danger" dismissible onClose={() => setErrorMsg('')}>{errorMsg}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              isInvalid={errorMsg && !title.trim()}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="Favorite"
              checked={favorite}
              onChange={e => setFavorite(e.target.checked)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Watch Date</Form.Label>
            <Form.Control
              type="date"
              value={watchDate}
              onChange={e => setWatchDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              min={0}
              max={5}
              value={rating}
              onChange={e => setRating(e.target.value)}
              isInvalid={errorMsg && (rating === '' || rating < 0 || rating > 5)}
            />
          </Form.Group>
          <Button type="submit" className="me-2">{editingFilm ? 'Save' : 'Add'}</Button>
          <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        </Form>
      </Col>
    </Row>
  );
}

export default FilmForm;
