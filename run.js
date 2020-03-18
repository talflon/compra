'use strict';

const {createServer} = require('./app.js');

const hostname = '127.0.0.1';
const port = 8000;

(async () => {
  let server = await createServer(hostname, port);
  console.log(`Compra server running at ${server.url}`);
})();
