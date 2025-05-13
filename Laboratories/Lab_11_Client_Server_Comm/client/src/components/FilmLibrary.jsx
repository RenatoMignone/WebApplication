import 'dayjs';
import { Table, Form, Button } from 'react-bootstrap';

/**
 * FilmTable component
 * Renders the table of films, using FilmRow for each film.
 */
function FilmTable(props) {
  const { films } = props;

  return (
    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th className="text-center">Favorite</th>
          <th>Last seen</th>
          <th>Rating</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {films.map((film) =>
          <FilmRow
            filmData={film}
            key={film.id}
            delete={props.delete}
            onEdit={props.onEdit}
            onToggleFavorite={props.onToggleFavorite}
            onSetRating={props.onSetRating}
          />
        )}
      </tbody>
    </Table>
  );
}

// ------------------------------------------------------------

/**
 * FilmRow component
 * Renders a single row in the film table, showing film details and actions.
 */
function FilmRow(props) {
  const { filmData, onToggleFavorite, onSetRating } = props;

  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
  }

  return (
    <tr>
      <td>
        <p className={filmData.favorite ? "favorite" : ""} >
          {filmData.title}
        </p>
      </td>
      <td className="text-center">
        <Form.Check
          type="checkbox"
          checked={filmData.favorite}
          onChange={() => onToggleFavorite && onToggleFavorite(filmData.id)}
        />
      </td>
      <td>
        <small>{formatWatchDate(filmData.watchDate, 'MMMM D, YYYY')}</small>
      </td>
      <td>
        <Rating
          rating={filmData.rating}
          maxStars={5}
          onSetRating={rating => onSetRating && onSetRating(filmData.id, rating)}
        />
      </td>
      <td>
        <Button variant='danger'
          onClick={() => { props.delete(filmData.id) }} >
          <i className='bi bi-trash'></i>
        </Button>
        <Button variant='warning' className="ms-2"
          onClick={() => props.onEdit(filmData)}>
          <i className='bi bi-pencil'></i>
        </Button>
      </td>
    </tr>
  );
}

// ------------------------------------------------------------

/**
 * Rating component
 * Renders a star rating based on the given rating and maxStars.
 * Allows clicking on a star to set the rating.
 */
function Rating(props) {
  return (
    <>
      {[...Array(props.maxStars)].map((el, index) =>
        <i
          key={index}
          className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"}
          style={{ cursor: props.onSetRating ? 'pointer' : 'default', color: '#f5c518' }}
          onClick={props.onSetRating ? () => props.onSetRating(index + 1) : undefined}
        />
      )}
    </>
  );
}

export { FilmTable };
