require('./models/Invite');
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

const Invite = mongoose.model('Invite');

// https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
function guidGenerator() {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);

  return `${S4()} ${S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}${S4()}`;
}

const create = async () => {
  const invite = guidGenerator();
  await new Invite({ invite }).save();
};

(async () => {
  await create();

  mongoose.connection.close();
})();
