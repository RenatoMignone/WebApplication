module.exports = {
  root: true, // Indicates that this is the root ESLint configuration file for the project
  env: { 
    browser: true, // Specifies that the code will run in a browser environment
    es2020: true, // Enables ES2020 global variables and syntax
  },
  extends: [
    'eslint:recommended', // Extends the recommended ESLint rules
    'plugin:react/recommended', // Adds recommended rules for React
    'plugin:react/jsx-runtime', // Enables rules for JSX runtime (React 17+)
    'plugin:react-hooks/recommended', // Adds recommended rules for React Hooks
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Specifies files and directories to ignore during linting
  parserOptions: { 
    ecmaVersion: 'latest', // Specifies the latest ECMAScript version for parsing
    sourceType: 'module', // Indicates that the code uses ES modules
  },
  settings: { 
    react: { 
      version: '18.2', // Specifies the React version to use for linting
    },
  },
  plugins: ['react-refresh'], // Adds the react-refresh plugin for hot reloading support
  rules: {
    'react/jsx-no-target-blank': 'off', // Disables the rule that warns about using target="_blank" without rel="noopener noreferrer"
    'react-refresh/only-export-components': [
      'warn', // Warns if non-component exports are used with React Refresh
      { allowConstantExport: true }, // Allows constant exports to be used with React Refresh
    ],
  },
}
