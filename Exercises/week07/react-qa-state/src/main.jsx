// This is the entry point of the React application.
// It renders the root component (App) into the DOM element with the id 'root'.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// here we import the whole app file 

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
