'use strict';

function ItemList() {
  this.items = [];
}

ItemList.prototype = {
  add: function(name) {
    if (!this.items.includes(name)) {
      this.items.push(name);
    }
  },
  remove: function(name) {
    let i = this.items.indexOf(name);
    if (i >= 0) {
      this.items.splice(i, 1);
    }
  }
};

exports.ItemList = ItemList;
