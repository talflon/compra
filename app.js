'use strict';

const express = require('express');
const Handlebars = require('handlebars');

const hostname = '127.0.0.1';
const port = 8000;

const template = Handlebars.compile(`
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
        {{#each items}}
          <tr><td>{{ this }}</td></tr>
        {{/each}}
      </table>
    </body>
  </html>
`);

let items = [];

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(template({ items: items }));
});

app.post('/', (req, res) => {
  items.push(req.body['item_name']);
  res.send(template({ items: items }));
});

app.listen(port, hostname, () => {
  console.log(`Compra server running at http://${hostname}:${port}/`);
});
