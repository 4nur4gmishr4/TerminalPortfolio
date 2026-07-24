const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));
    
    await page.goto('http://localhost:8081');
    await new Promise(resolve => setTimeout(resolve, 2000));
    await browser.close();
  } catch (err) {
    console.error('SCRIPT ERROR:', err);
  }
})();
