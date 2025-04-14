// This file contains React components related to displaying or managing answers.
// Add your Answer-related components here.

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Button, Table } from 'react-bootstrap';


// This function creates a table row for each answer.
// It takes the answer object as a prop and displays its properties in the table cells.
function AnswerRow(props) {
    const e = props.answer;
    return (
      <tr>
        <td>{e.date.format("YYYY-MM-DD")}</td>
        <td>{e.text}</td>
        <td>{e.respondent}</td>
        <td>{e.score}</td>
        <td><Button>Vote</Button></td>
      </tr>
    );
  }
  
  // This function creates a table to display a list of answers.
  // It takes a list of answers as a prop and maps each answer to an AnswerRow component.
  // So this means that the answer table is made of a list of answer rows.
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
          {/* the key can be the answer id, if unique */}
                  {props.listOfAnswers.map( (e) => 
                   <AnswerRow key={e.id} answer={e} vote={props.vote} delete={props.delete} /> )
          }
        </tbody>
      </Table>
    )
  }
  
  export { AnswerTable };