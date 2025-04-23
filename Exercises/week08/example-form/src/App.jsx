import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// -----------------------------------------------------------------
function MyForm (props) {
  // Declare a state variable 'name' to store the input value
  // Initialize 'name' with an empty string

  // 'name' will hold the value of the input field
  // 'setName' is a function that updates the state variable 'name'
  // 'useState' returns an array with two elements: the current state and a function to update it
  const [name, setName] = useState('');

  // -----------------------------------------------------------------
  // Function to handle form submission
  const handleSubmit = (event) => {
    // Log the submitted name to the console
    console.log('Name submitted: '+ name);
    // Prevent the default form submission behavior
    event.preventDefault();
  }

  // -----------------------------------------------------------------
  // Function to handle changes in the input field
  // whenever the input value changes, this function will be called
  const handleChange = (event) => {
    // Convert the input value to uppercase and update the state
    let val = event.target.value.toUpperCase();
    // Update the 'name' state with the new value
    setName(val);
  };

  // -----------------------------------------------------------------
  // This is the final rendered output of the component
  // It returns a form with an input field and a submit button
  // The form will call handleSubmit when submitted
  // The input field will call handleChange when its value changes
  return (
   <form onSubmit={handleSubmit}>
    <label> Name:
      {/* Input field bound to the 'name' state and updates on change */}
      <input type="text" value={name} onChange={handleChange} />
    </label>
    {/* Submit button to trigger the form submission */}
    <input type="submit" value="Submit" />
  </form>
  );
}


// -----------------------------------------------------------------
// Main App component
function App() {
  // Render the MyForm component
  return (
    <MyForm />
  )
}

export default App
