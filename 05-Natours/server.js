const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Environment Creation
dotenv.config({ path: './config.env' });

// Global Variables
const PORT = process.env.PORT || 3000;

// Create An App
const app = require('./app');

// Database Connection
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Is Connected!'));

// Listen to the server
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server is running on port: ${PORT}... `);
});
