import { Table } from 'react-bootstrap';

// Table component for displaying a list of films in a tabular format
function FilmTable({ films }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th> {/* Column for film titles */}
          <th>Favorite</th> {/* Column for favorite status */}
          <th>Watch Date</th> {/* Column for watch dates */}
          <th>Rating</th> {/* Column for ratings */}
        </tr>
      </thead>
      <tbody>
        {films.map(film => (
          <tr key={film.id}>
            <td>{film.title}</td> {/* Display the film title */}
            <td>{film.favorite ? 'Yes' : 'No'}</td> {/* Display whether the film is a favorite */}
            <td>{film.watchDate || 'Not watched'}</td> {/* Display the watch date or a placeholder */}
            <td>{film.rating || 'N/A'}</td> {/* Display the rating or a placeholder */}
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default FilmTable; // Export the table component for use in other parts of the application
