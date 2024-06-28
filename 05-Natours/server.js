const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// Global Variables
const PORT = process.env.PORT || 3000;

// Listen to the server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port: ${PORT}... `);
});
