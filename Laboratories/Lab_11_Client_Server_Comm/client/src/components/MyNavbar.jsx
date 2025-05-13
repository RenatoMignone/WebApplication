import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Navigation bar component, as in Lab 9
function MyNavbar() {
  return (
    <Navbar bg="primary" variant="dark" className="mb-4">
      <Container fluid>
        <Navbar.Brand as={Link} to="/filter">
          <i className="bi bi-collection-play" /> Film Library
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/filter">Films</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
