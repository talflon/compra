'use strict';

const {By, Key, until} = require('selenium-webdriver');

const {createBrowser} = require('./defaults.js');

if (process.env.COMPRAS_URL) {
  var ROOT_URL = process.env.COMPRAS_URL;
} else {
  throw "Specify COMPRAS_URL=<the url>";
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

describe("Test our homepage", () => {
  beforeEach(async () => {
    this.browser = await createBrowser();
  });

  afterEach(async () => {
    await this.browser.quit();
  });

  const getEntryBox = () => {
    return this.browser.wait(until.elementLocated(By.id('new_item')));
  }
  
  const addItem = async (name) => {
    let entry_box = await getEntryBox();
    await entry_box.sendKeys(name);
    await entry_box.sendKeys(Key.ENTER);
    await sleep(1000);
  }

  const getListTable = () => {
    return this.browser.wait(until.elementLocated(By.id('list_table')));
  }

  const getListTexts = async () => {
    let list_table = await getListTable();
    let rows = await list_table.findElements(By.tagName('tr'));
    return await Promise.all(rows.map(row => row.getText()));
  }

  it("has our title", async () => {
    await this.browser.get(ROOT_URL);
    expect(await this.browser.getTitle()).toBe("Compra!");
  });

  it("lets you add an item", async () => {
    await this.browser.get(ROOT_URL);
    await addItem('mandioca');
    expect(await getListTexts()).toContain('mandioca');
  });

  it("lets you add two items", async () => {
    await this.browser.get(ROOT_URL);
    await addItem('pepino');
    await addItem('tomate');
    let row_texts = await getListTexts();
    expect(row_texts).toContain('pepino');
    expect(row_texts).toContain('tomate');
  });

  it("does not add blank items", async () => {
    await this.browser.get(ROOT_URL);

    let entry_box = await getEntryBox();
    let list_table = await getListTable();
    let oldNumRows = (await list_table.findElements(By.tagName('tr'))).length;
    await entry_box.sendKeys(Key.ENTER);

    await sleep(1000);

    list_table = await getListTable();
    let newNumRows = (await list_table.findElements(By.tagName('tr'))).length;
    expect(newNumRows).toBe(oldNumRows);
  });

  it("does not add the same item twice", async () => {
    await this.browser.get(ROOT_URL);
    await addItem('gelado');
    await addItem('gelado');
    let row_texts = await getListTexts();
    expect(row_texts.filter(s => s === 'gelado').length).toBe(1);
  });

  it("lets you remove items", async () => {
    await this.browser.get(ROOT_URL);
    await addItem('cerveja');
    let list_table = await getListTable();
    let rows = await list_table.findElements(By.tagName('tr'));
    let foundRows = [];
    for (const row of rows) {
      if ((await row.getText()).includes('cerveja')) {
        foundRows.push(row);
      }
    }
    expect(foundRows.length).toBe(1);
    let closer = await foundRows[0].findElement(By.css("*[title='remove']"));
    await closer.click();
    await sleep(1000);
    expect(await getListTexts()).not.toContain('cerveja');
  });
});
