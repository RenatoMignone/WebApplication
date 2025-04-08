import { ListGroup } from 'react-bootstrap';

// Sidebar component for displaying a list of filters
function MySidebar({ filters, activeFilter, setActiveFilter }) {
  return (
    <ListGroup className="shadow-sm">
      {filters.map(filter => (
        <ListGroup.Item
          key={filter.name} // Unique key for each filter item
          action // Makes the item clickable
          active={filter.name === activeFilter} // Highlights the active filter
          onClick={() => setActiveFilter(filter.name)} // Updates the active filter when clicked
        >
          {filter.displayName} {/* Display the user-friendly name of the filter */}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default MySidebar; // Export the sidebar component for use in other parts of the application
