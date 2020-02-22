const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe("Test our homepage", () => {
  it("has our title", async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get('http://localhost:8000');
    expect(await driver.getTitle()).toBe("Compra!");
  });
});
