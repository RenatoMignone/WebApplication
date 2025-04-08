import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration file
export default defineConfig({
  // Plugins used by Vite
  // here you can add more plugins
  // to extend the functionality of Vite
  plugins: [react()], // Enables React support with Fast Refresh
});
