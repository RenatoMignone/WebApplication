// Importing Bootstrap CSS for styling and Bootstrap Icons for icons
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Importing React's useState hook for managing state
// a state in react is a way to store and manage data that can change over time
import { useState } from 'react';

// Importing components from React-Bootstrap for layout and styling
import { Col, Container, Row, Navbar } from 'react-bootstrap';

// Importing custom CSS for additional styling
import './App.css';

// Importing custom components for rendering answers and questions
// These are the components that have been exported from their respective files
// AnswerTable is a component that displays a table of answers
import { AnswerTable } from './components/AnswerComponents.jsx';
import { QuestionDescription } from './components/QuestionComponents.jsx';

// Importing the Question model to create and manage question data
import { Question } from './QAModels.js';


//-------------------------------------------------------------------------------------------
// Creating a new question instance with predefined data
const question = new Question(1, 'Best way of enumerating an array in JS?', 'Enrico', '2024-03-01');

// Initializing the question instance (e.g., setting up answers)
// this function is used to initialize the answers for the defined question
// in this case the answers to the question are always the same ones.
question.init();

// Retrieving the list of answers associated with the question
const answers = question.getAnswers();


//-------------------------------------------------------------------------------------------
// Component for rendering the header of the application
// here we always work with the props
// the props are the properties that are passed to the component
function MyHeader(props) {
	return (
		<Navbar bg="primary" variant="dark"> {/* Navbar with primary background and dark variant */}
      <Navbar.Brand className="mx-2"> {/* Brand section with some margin */}
      <i className="bi bi-collection-play" /> {/* Bootstrap icon */}
      {/* Displaying the app name, defaulting to "HeapOverrun" if no prop is provided */}
			{props.appName || "HeapOverrun"}
      </Navbar.Brand>
		</Navbar>
	);
}

//-------------------------------------------------------------------------------------------
// Component for rendering the footer of the application
function MyFooter(props) {
  return (
    <footer>
      <p>&copy; Web Applications</p> {/* Copyright notice */}
      <div id="time"></div> {/* Placeholder for displaying the current time */}
    </footer>
  );
}

//-------------------------------------------------------------------------------------------
// Component for rendering the main content of the application
function Main(props) {
  return (
    <>
      <Row> {/* Row for displaying the question description */}
        <QuestionDescription question={question} /> {/* Passing the question object to the component */}
      </Row>
      <Row> {/* Row for the "Current Answers" heading */}
        <Col>
          <h2>Current Answers</h2>
        </Col>
      </Row>
      <Row> {/* Row for displaying the list of answers */}
        <Col>
          <AnswerTable listOfAnswers={answers} /> {/* Passing the list of answers to the component */}
        </Col>
      </Row>
    </>
  );
}

//-------------------------------------------------------------------------------------------
// This is the main component of the application.
// It serves as the root component that organizes and renders other components.
function App() {
  return (
    <Container fluid> {/* Fluid container for full-width layout */}
      <Row> {/* Row for the header */}
        <Col>
          <MyHeader /> {/* Rendering the header component */}
        </Col>
      </Row>
      <Main /> {/* Rendering the main content */}
      <Row> {/* Row for the footer */}
        <Col>
          <MyFooter /> {/* Rendering the footer component */}
        </Col>
      </Row>
    </Container>
  );
}

// Exporting the App component as the default export
export default App;
