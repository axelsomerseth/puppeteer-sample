const puppeteer = require('puppeteer');

async function smokeTest() {
    try {
        const url = 'https://news.ycombinator.com/x';
        const browser = await puppeteer.launch({
            headless: true, // change to false to run visualizing the web browser
            defaultViewport: null,
        });
        const page = await browser.newPage();
        const selector = '.athing';
        await page.goto(url);
        await page.waitForSelector(selector);
        let elements = await page.$(selector);
        if (!elements) throw new Error('Element not found on page.');
        const results = await page.$$eval(selector, rows => {
            return rows.map(row => {
                const properties = {};
                const newsElement = row.querySelector('.titlelink');
                properties.title = newsElement.innerHTML;
                properties.url = newsElement.getAttribute('href');
                return properties;
            });
        });
        console.log(results);
        if (!results || results.length <= 0) throw new Error('Results not found on page.');
        console.debug(`✅ => Smoke test passed`);
        await browser.close();
        // process.exitCode = 0;
        process.exit(0);
    } catch (err) {
        console.error(`❌ => Smoke test NOT passed: `, err);
        // process.exitCode = 1;
        process.exit(1);
    }
};

smokeTest();