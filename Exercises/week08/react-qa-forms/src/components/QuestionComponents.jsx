import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Col, Button, Form, Table } from 'react-bootstrap';

// -------------------- QuestionDescription Component --------------------
// Displays the details of a question
function QuestionDescription(props) {
    const { question } = props; // Destructure the question prop
    return (
        <>
            <Col xs={9}>
                <p className="question">Q #{question.id}: {question.text}</p> {/* Display question text */}
            </Col>
            <Col xs={3}>
                <p className="question">Author: {question.questioner}</p> {/* Display question author */}
            </Col>
        </>
    );
}

export { QuestionDescription };