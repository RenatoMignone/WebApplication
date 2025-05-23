import 'dayjs';
import { Table, Form, Button } from 'react-bootstrap';

/**
 * FilmTable component
 * Renders the table of films, using FilmRow for each film.
 */
function FilmTable(props) {
  const { films, activeFilter } = props;

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
        {films.map((film) => <FilmRow filmData={film} key={film.id} delete={props.delete} />)}
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

  /**
   * Helper function to format the watch date using dayjs.
   */
  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
  }

  return (
    <tr>
      <td>
        <p className={props.filmData.favorite ? "favorite" : ""} >
          {props.filmData.title}
        </p>
      </td>
      <td className="text-center">
        <Form.Check type="checkbox" defaultChecked={props.filmData.favorite ? true : false} />
      </td>
      <td>
        <small>{formatWatchDate(props.filmData.watchDate, 'MMMM D, YYYY')}</small>
      </td>
      <td>
        <Rating rating={props.filmData.rating} maxStars={5} />
      </td>
      <td>
        <Button variant='danger'
          onClick={() => { props.delete(props.filmData.id) }} >
          <i className='bi bi-trash'></i>
        </Button>
      </td>
    </tr>
  );
}

// ------------------------------------------------------------

/**
 * Rating component
 * Renders a star rating based on the given rating and maxStars.
 */
function Rating(props) {
  // Create an array with props.maxStars elements, then run map to create the JSX elements for the array 
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"} />
  )
}

export { FilmTable };
