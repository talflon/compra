'use strict';

const {once} = require('events');
const express = require('express');
const {ItemList} = require('./itemlist.js');

async function createServer(hostname, port) {
  let app = express();
  app.set('views', './templates');
  app.set('view engine', 'hbs');
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  let items = new ItemList();

  app.get('/', (req, res) => {
    res.render('index', { items: items.getCurrent() });
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

  let listener = app.listen(port, hostname);
  await once(listener, 'listening');
  return {app, listener, items,
    url: `http://${hostname}:${port}`,
    close: () => { listener.close() },
  };
}

exports.createServer = createServer;
