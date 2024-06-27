const app = require('./app');

// Global Variables
const PORT = 8000;

// Listen to the server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port: ${PORT}... `);
});
