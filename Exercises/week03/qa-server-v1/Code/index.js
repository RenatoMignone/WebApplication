'use strict';  // Enable strict mode for better error checking

const express = require('express'); // Import the Express framework
const morgan = require('morgan');   // Import Morgan for logging HTTP requests
const dao = require('./dao');       // Import data-access-object functions from dao.js

const app = express(); // Create an Express application

// ----- MIDDLEWARE SETUP -----
app.use(morgan('dev'));        // Log requests in the console
app.use(express.json());       // Parse incoming JSON in request bodies

// ----- ROOT ROUTE -----
app.get('/', (req, res) => {
  res.send('Hello!');          // Send a simple response to the root URL
});




////////////////////////////////////////////////////////////////////////////////////////////////////////
//APIs

// ----- GET /api/questions -----
app.get('/api/questions', (req, res) => {
  dao.listQuestions()          // Retrieve the list of questions from DB
    .then(questions => res.json(questions)) // Send questions back as JSON
    .catch(() => res.status(500).end());    // Handle any server error
});

// ----- GET /api/questions/:id/answers -----
app.get('/api/questions/:id/answers', async (req, res) => {
  try {
    const result = await dao.listAnswersByQuestion(req.params.id); // Get all answers tied to the question
    if (result.error)
      res.status(404).json(result);      // Return 404 if question doesn't exist
    else
      res.json(result);                  // Return the list of answers as JSON
  } catch (err) {
    res.status(500).end();              // Generic server error
  }
});

// ----- POST /api/answers -----
app.post('/api/answers', async (req, res) => {
  const answer = {
    questionId: req.body.questionId,  // ID of the question this answer belongs to
    score: req.body.score,            // Score or ranking for the answer
    date: req.body.date,              // Date associated with the answer
    text: req.body.text,              // The actual text of the answer
    respondent: req.body.respondent,  // Person or entity giving the answer
  };

  try {
    const newId = await dao.createAnswer(answer); // Insert answer into DB and get new ID
    res.status(201).json(newId);                  // Respond with HTTP 201 and the new ID
  } catch (err) {
    res.status(503).json({ error: 'Database error during the creation of the answer' });
  }
});

// ----- SERVER LAUNCH -----
app.listen(3001, () => {
  console.log('Server ready'); // Start the server on port 3001
});