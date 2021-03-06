'use strict';

const {ItemList} = require('../itemlist.js');

describe("ItemList constructor", () => {
  it("Creates an empty ItemList", () => {
    expect((new ItemList()).getCurrent().length).toBe(0);
  });
});

describe("ItemList.add", () => {
  it("adds the item to the list", () => {
    let items = new ItemList();
    items.add('test');
    expect(items.getCurrent()).toContain('test');
  });

  it("adds the item only to the list given", () => {
    let items1 = new ItemList();
    let items2 = new ItemList();
    items1.add('test');
    expect(items2.getCurrent()).not.toContain('test');
  });
  
  it("adds two items to the list", () => {
    let items = new ItemList();
    items.add('a');
    items.add('b');
    expect(items.getCurrent()).toContain('a');
    expect(items.getCurrent()).toContain('b');
  });

  it("doesn't add the same item twice", () => {
    let items = new ItemList();
    items.add('x');
    items.add('x');
    expect(items.getCurrent().filter(s => s === 'x').length).toBe(1);
  });
});

describe("ItemList.remove", () => {
  it("removes the item from the list", () => {
    let items = new ItemList();
    items.add('blah');
    items.remove('blah');
    expect(items.getCurrent()).not.toContain('blah');
  });
});
