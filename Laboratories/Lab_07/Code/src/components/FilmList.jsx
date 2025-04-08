import { ListGroup } from 'react-bootstrap';

// List component for displaying films in a list format
function FilmList({ films }) {
  return (
    <ListGroup id="film-list">
      {films.map(film => (
        <ListGroup.Item
          key={film.id} // Unique key for each film
          className="d-flex justify-content-between align-items-center shadow-sm"
        >
          <span className={film.favorite ? 'text-danger' : ''}>{film.title}</span> {/* Highlight favorite films */}
          <div>
            <input
              type="checkbox"
              checked={film.favorite} // Checkbox to indicate favorite status
              readOnly
              className="me-2"
            />
            <span>{film.watchDate || ''}</span> {/* Display watch date or leave blank */}
            <span className="ms-2">
              {'⭐'.repeat(film.rating || 0) + '☆'.repeat(5 - (film.rating || 0))} {/* Display star rating */}
            </span>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default FilmList; // Export the list component for use in other parts of the application
