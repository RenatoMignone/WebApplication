import 'bootstrap/dist/css/bootstrap.min.css';                    // Import Bootstrap styles
import 'bootstrap-icons/font/bootstrap-icons.css';                // Import Bootstrap icons
import { Container, Row, Col, Button } from 'react-bootstrap';    // Import Bootstrap components

// Import custom components defined in the components directory
import MyNavbar from './components/MyNavbar';                     // Navbar component
import MySidebar from './components/MySidebar';                   // Sidebar component
import FilmList from './components/FilmList';                     // Film list component

import { useState } from 'react';                                 // React hook for state management

// Import data and filters from the data file 
import { films, filters } from './data';                          // Import film data and filters

//-------------------------------------------------------------
// Main application component
//-------------------------------------------------------------
function App() {
  const [activeFilter, setActiveFilter] = useState('All');        // State for the currently active filter

  // Filter films based on the active filter
  const filteredFilms = films.filter(filters.find(f => f.name === activeFilter).filterFunction);

  return (
    <Container fluid>
      <MyNavbar /> {/* Render the navbar */}
      <Row className="mt-4">
        <Col md={3}>
          <MySidebar filters={filters} activeFilter={activeFilter} setActiveFilter={setActiveFilter} /> {/* Render the sidebar */}
        </Col>
        <Col md={9}>
          <h2 id="current-filter" className="mb-4">{activeFilter} Films</h2> {/* Display the current filter */}
          <FilmList films={filteredFilms} /> {/* Render the filtered film list */}
          <Button
            id="add-film-btn"
            variant="primary"
            className="mt-3 float-end shadow"
            style={{ borderRadius: '50%', width: '50px', height: '50px', fontSize: '1.5rem' }}
          >
            + {/* Button for adding a new film */}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App; // Export the main application component
