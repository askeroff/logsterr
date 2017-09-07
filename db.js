require('dotenv').config({ path: 'variables.env' });
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🚫 🚫 🚫 → ${err.message}`);
});