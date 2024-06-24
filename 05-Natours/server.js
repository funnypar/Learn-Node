const fs = require('fs');
const express = require('express');

// Global Variables
const PORT = 8000;
// Create app
const app = express();

// Read Files
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// Routes
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

// Listen to the server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port: ${PORT}... `);
});
