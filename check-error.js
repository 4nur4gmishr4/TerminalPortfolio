import puppeteer from 'puppeteer';

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`Browser ${msg.type()}:`, msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('Browser pageerror:', error.message);
  });

  console.log('Navigating to localhost:4174...');
  try {
    await page.goto('http://localhost:4174', { waitUntil: 'networkidle0' });
    console.log('Page loaded.');
  } catch (e) {
    console.error('Failed to load page:', e.message);
  }

  await browser.close();
  process.exit(0);
})();
