const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`Oops - ${err.message}`);
});

require('./models/User');
require('./models/Project');
require('./models/Task');
require('./models/Timelog');

const app = require('./app');

app.listen(process.env.PORT || 3000, () => {
  console.log('App Started');
});
