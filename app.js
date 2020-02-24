'use strict';

const express = require('express');
const Handlebars = require('handlebars');
const {ItemList} = require('./itemlist.js');

const hostname = '127.0.0.1';
const port = 8000;

let items = new ItemList();

const app = express();
app.set('views', './templates');
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { items: items.items });
});

app.post('/', (req, res) => {
  let name = req.body['item_name'];
  if (name) items.add(name);
  res.redirect('/');
});

app.post('/:itemName', (req, res) => {
  if (req.body['delete']) {
    items.remove(req.params['itemName']);
  }
  res.redirect('/');
});

app.listen(port, hostname, () => {
  console.log(`Compra server running at http://${hostname}:${port}/`);
});
