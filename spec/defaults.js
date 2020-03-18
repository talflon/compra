'use strict';

const {Builder} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

function createBrowser() {
    return new Builder()
        .forBrowser('chrome')
        .setChromeOptions(new chrome.Options().headless())
        .build();
}

exports.createBrowser = createBrowser;
