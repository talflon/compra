'use strict';

const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe("Test that we can test", () => {
  it("can test things", () => {
    expect(true).toBe(true);
  });

  it("can open browser", async () => {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      expect(await driver.getCurrentUrl()).not.toBe(null);
    } finally {
      await driver.quit();
    }
  });
});
