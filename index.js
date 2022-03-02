const puppeteer = require('puppeteer');

async function getBunnies() {
    const browser = await puppeteer.launch({
        headless: true, // change to false to run visualizing the web browser
        defaultViewport: null,
    });

    const page = await browser.newPage();

    const url = 'https://news.ycombinator.com/';

    await page.goto(url);

    await page.waitForSelector('.athing');

    const results = await page.$$eval('.athing', rows => {
        return rows.map(row => {
            const properties = {};
            const newsElement = row.querySelector('.titlelink');
            properties.title = newsElement.innerHTML;
            properties.url = newsElement.getAttribute('href');
            return properties;
        });
    });

    console.log(results);

    browser.close();
};

getBunnies();