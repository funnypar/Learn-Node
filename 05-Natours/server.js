const fs = require('fs');
const express = require('express');

// Global Variables
const PORT = 8000;
// Create app
const app = express();
app.use(express.json());

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

app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res.status(424).send('Something went wrong ...');
      } else {
        res.status(201).json({
          status: 'success',
          data: {
            tours,
          },
        });
      }
    }
  );
});

// Listen to the server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port: ${PORT}... `);
});
