const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(
  process.env.DATABASE,
  {
    useMongoClient: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500
  }
);

mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  console.error(`Oops - ${err.message}`);
});

require('./models/User');
require('./models/Project');
require('./models/Task');
require('./models/Timelog');
require('./models/Invite');

const app = require('./app');

process.on('unhandledRejection', reason => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App Started');
});
