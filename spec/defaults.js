'use strict';

const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function createBrowser() {
    let opts = new chrome.Options();
    if (process.env.COMPRAS_HEADLESS !== 'no') {
        opts = opts.headless();
    }
    return new Builder()
        .forBrowser('chrome')
        .setChromeOptions(opts)
        .build();
}

exports.createBrowser = createBrowser;
