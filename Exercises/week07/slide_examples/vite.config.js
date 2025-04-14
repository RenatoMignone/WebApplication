import { defineConfig } from 'vite' // Import the Vite configuration function
import react from '@vitejs/plugin-react' // Import the React plugin for Vite

// Export the Vite configuration
export default defineConfig({
  plugins: [react()], // Use the React plugin to enable React support
})
