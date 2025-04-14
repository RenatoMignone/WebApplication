import { StrictMode } from 'react' // Import React's StrictMode for highlighting potential problems
import { createRoot } from 'react-dom/client' // Import ReactDOM's createRoot for rendering the app
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling

import './index.css' // Import custom CSS styles
import App from './App.jsx' // Import the main App component

// Render the App component inside the root div
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Render the main App component */}
  </StrictMode>,
)
