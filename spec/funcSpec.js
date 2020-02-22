const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

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
});
