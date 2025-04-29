import {ListGroup} from 'react-bootstrap';

/**
 * Filters component
 * Renders a list of filter options and notifies the parent when a filter is selected.
 * Props:
 * - items: array of filter objects {filterName, label}
 * - selected: currently selected filter name
 * - onSelect: handler function for filter selection
 */ 
const Filters = (props) => {
  const {items, selected, onSelect} = props;

  return (
    <ListGroup as="ul" className="my-2">
        {
          items.map( e => {
            return (
                <ListGroup.Item as="li" key={e.filterName} href={'#'} 
                  action active={selected === e.filterName ? true : false} 
                    onClick={() => onSelect(e.filterName)} >
                    {e.label}
                </ListGroup.Item>
            );
          })
        }
    </ListGroup>
  )
}

// ------------------------------------------------------------

export { Filters };
