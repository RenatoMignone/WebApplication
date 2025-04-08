import { Navbar, Form } from 'react-bootstrap';

// Navbar component for the top navigation bar
function MyNavbar() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <div className="container-fluid">
        <Navbar.Brand href="#" className="text-white">Film Library</Navbar.Brand> {/* Application title */}
        <Navbar.Toggle aria-controls="navbarNav" /> {/* Toggle button for mobile view */}
        <Navbar.Collapse id="navbarNav">
          <Form className="d-flex ms-auto">
            <Form.Control type="search" placeholder="Search" className="me-2" /> {/* Search bar */}
          </Form>
          <div className="ms-3">
            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem', color: 'white' }}></i> {/* User profile icon */}
          </div>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default MyNavbar; // Export the navbar component for use in other parts of the application
