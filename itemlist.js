'use strict';

function ItemList() {
  this.items = [];
}

ItemList.prototype = {
  add: function(name) {
    if (!this.items.includes(name)) {
      this.items.push(name);
    }
  }
};

exports.ItemList = ItemList;
