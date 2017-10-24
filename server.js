const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`Oops - ${err.message}`);
});

require('./models/User');
require('./models/Project');

const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log('App Started');
});
