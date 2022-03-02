const puppeteer = require('puppeteer');

async function getBunnies() {
    const browser = await puppeteer.launch({
        headless: false,
    });

    const page = await browser.newPage();

    const url = 'https://www.codex.academy/#/';

    await page.goto(url);
};

getBunnies();