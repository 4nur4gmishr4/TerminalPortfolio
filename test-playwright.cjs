const { chromium } = require('playwright');

(async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));
    
    await page.goto('http://localhost:8081');
    await page.waitForTimeout(3000);
    await browser.close();
  } catch (err) {
    console.error('SCRIPT ERROR:', err);
  }
})();
