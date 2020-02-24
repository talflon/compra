'use strict';

const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const ROOT_URL = 'http://localhost:8000';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

describe("Test our homepage", () => {
  beforeEach(async () => {
    this.browser = await new Builder().forBrowser('chrome').build();
  });

  afterEach(async () => {
    await this.browser.quit();
  });

  const getEntryBox = () => {
    return this.browser.wait(until.elementLocated(By.id('new_item')));
  }

  const getListTable = () => {
    return this.browser.wait(until.elementLocated(By.id('list_table')));
  }

  it("has our title", async () => {
    await this.browser.get(ROOT_URL);
    expect(await this.browser.getTitle()).toBe("Compra!");
  });

  it("lets you add an item", async () => {
    await this.browser.get('http://localhost:8000');

    let entry_box = await getEntryBox();
    await entry_box.sendKeys('mandioca');
    await entry_box.sendKeys(Key.ENTER);

    await sleep(1000);

    let list_table = await getListTable();
    let rows = await list_table.findElements(By.tagName('tr'));
    let row_texts = await Promise.all(rows.map(row => row.getText()));
    expect(row_texts).toContain('mandioca');
  });

  it("lets you add two items", async () => {
    await this.browser.get(ROOT_URL);

    let entry_box = await getEntryBox();
    await entry_box.sendKeys('pepino');
    await entry_box.sendKeys(Key.ENTER);

    await sleep(1000);

    entry_box = await getEntryBox();
    await entry_box.sendKeys('tomate');
    await entry_box.sendKeys(Key.ENTER);

    await sleep(1000);

    let list_table = await getListTable();
    let rows = await list_table.findElements(By.tagName('tr'));
    let row_texts = await Promise.all(rows.map(row => row.getText()));
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
});
