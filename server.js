require('dotenv').config({ path: 'variables.env' });

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const server = next({ dev });
const handle = server.getRequestHandler();

require('./db.js'); // connecting database

server.prepare()
  .then(() => {
    
    const app = require('./app');

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(process.env.PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
});