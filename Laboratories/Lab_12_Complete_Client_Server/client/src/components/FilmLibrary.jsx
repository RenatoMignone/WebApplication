import 'dayjs';
import { Table, Form, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router';

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
        {films.map((film) => <FilmRow filmData={film} key={film.id}
           delete={props.delete}
           editFilm={props.editFilm}
           editFilmFavorite={props.editFilmFavorite}
           editFilmRating={props.editFilmRating}
        />)}
      </tbody>
    </Table>
  );
}

function FilmRow(props) {
  const location = useLocation();
  const currentUrl = location.pathname;
  //console.log("DEBUG: currentUrl in FilmRow: "+currentUrl);

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
        <Form.Check type="checkbox" checked={props.filmData.favorite ? true : false} 
          onChange={(event) => {
            if (props.editFilmFavorite)
              props.editFilmFavorite(props.filmData, event.target.checked);
          }} />
      </td>
      <td>
        <small>{formatWatchDate(props.filmData.watchDate, 'MMMM D, YYYY')}</small>
      </td>
      <td>
        <Rating rating={props.filmData.rating} maxStars={5} 
          editRating={(newRating) => {
            if (props.editFilmRating)
              props.editFilmRating(props.filmData, newRating);
          }} />
      </td>
      <td>
        <Button variant='danger'
          onClick={() => { props.delete(props.filmData.id) }} >
          <i className='bi bi-trash'></i>
        </Button>
        <Link to={`/edit/${props.filmData.id}`} state={{previousUrl: currentUrl}} >
          <Button className="mx-2" variant='warning'>
            <i className='bi bi-pencil'></i>
          </Button>
        </Link>
      </td>
    </tr>
  );
}

function Rating(props) {
  // Create an array with props.maxStars elements, then run map to create the JSX elements for the array 
  return [...Array(props.maxStars)].map((el, index) =>
    <i key={index} className={(index < props.rating) ? "bi bi-star-fill" : "bi bi-star"}
      onClick={() => props.editRating(index+1)} />
  )
}

export { FilmTable };
