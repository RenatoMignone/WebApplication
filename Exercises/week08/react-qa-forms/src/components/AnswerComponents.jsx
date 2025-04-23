import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Table } from 'react-bootstrap';

// -------------------- AnswerActions Component --------------------
// Displays buttons for upvoting, downvoting, and deleting an answer
function AnswerActions(props) {
  return (
    <>
      <Button className="mx-1" variant="primary" onClick={props.upvote}><i className="bi bi-arrow-up"></i></Button> {/* Upvote button */}
      <Button className="mx-1" variant="primary" onClick={props.downvote}><i className="bi bi-arrow-down"></i></Button> {/* Downvote button */}
      <Button className="mx-1" variant="danger" onClick={props.delete}><i className="bi bi-trash"></i></Button> {/* Delete button */}
    </>
  );
}

// -------------------- AnswerRow Component --------------------
// Displays a single row in the answer table
function AnswerRow(props) {
    const e = props.answer; // Destructure the answer prop
    return (
      <tr>
        <td>{e.date.format("YYYY-MM-DD")}</td> {/* Display answer date */}
        <td>{e.text}</td> {/* Display answer text */}
        <td>{e.respondent}</td> {/* Display answer author */}
        <td>{e.score}</td> {/* Display answer score */}
        <td><AnswerActions upvote={()=>props.vote(e.id, 1)} downvote={()=>props.vote(e.id, -1)}
                delete={()=>props.delete(e.id)} /></td> {/* Display action buttons */}
      </tr>
    );
  }
  
// -------------------- AnswerTable Component --------------------
// Displays a table of answers
function AnswerTable(props) {
    return (
      <Table>
        {/* <Table striped bordered hover> */}
        <thead>
          <tr>
            <th>Date</th>
            <th>Text</th>
            <th>Author</th>
            <th>Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>        
          {/* Render each answer as a row */}
          {props.listOfAnswers.map( (e,index) => 
                   <AnswerRow key={index} answer={e} vote={props.vote} 
                   delete={props.delete} /> )
          }
        </tbody>
      </Table>
    )
  }
  
export { AnswerTable };
