// This file contains the configuration for the Vite build tool.
// Use this file to customize the build process or add plugins.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
