'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Compra!</title>
      </head>
      <body>
        <h1>Compra!</h1>
        <form method="POST">
          <input name="item_name" id="new_item" />
        </form>
        <table id="list_table">
        </table>
      </body>
    </html>
  `);
});

server.listen(port, hostname, () => {
  console.log(`Compra server running at http://${hostname}:${port}/`);
});
