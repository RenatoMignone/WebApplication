import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Main application component

// Render the App component inside the root div
// here so we are getting from the index.html file the root element, and then we render the App component inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
