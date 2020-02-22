'use strict';

const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

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

  it("has our title", async () => {
    await this.browser.get('http://localhost:8000');
    expect(await this.browser.getTitle()).toBe("Compra!");
  });

  it("lets you add an item", async () => {
    await this.browser.get('http://localhost:8000');

    let entry_box = await this.browser.findElement(By.id('new_item'));
    await entry_box.sendKeys('mandioca');
    await entry_box.sendKeys(Key.ENTER);

    await sleep(3000);

    let list_table = await this.browser.wait(until.elementLocated(By.id('list_table')));
    let rows = await list_table.findElements(By.tagName('tr'));
    let row_texts = await Promise.all(rows.map(row => row.getText()));
    expect(row_texts).toContain('mandioca');
  });
});
