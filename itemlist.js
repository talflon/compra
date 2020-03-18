'use strict';

function ItemList() {
  this.item_list = [];
}

ItemList.prototype = {
  add: function(name) {
    if (!this.item_list.includes(name)) {
      this.item_list.push(name);
    }
  },
  remove: function(name) {
    let i = this.item_list.indexOf(name);
    if (i >= 0) {
      this.item_list.splice(i, 1);
    }
  },
  getCurrent: function() {
    return this.item_list
  }
};

exports.ItemList = ItemList;
