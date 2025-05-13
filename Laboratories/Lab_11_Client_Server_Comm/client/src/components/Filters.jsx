import { ListGroup } from 'react-bootstrap';

/**
 * This component requires:
 * - the list of filters labels to show,
 * - the filter that is currently selected
 * - the handler to notify a new selection
 */
const Filters = (props) => {
  const { items, selected, onSelect } = props;

  return (
    <ListGroup as="ul" className="my-2">
      {
        items.map(e => (
          <ListGroup.Item as="li" key={e.filterName}
            action active={selected === e.filterName}
            onClick={() => onSelect(e.filterName)}>
            {e.label}
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
};

export { Filters };
