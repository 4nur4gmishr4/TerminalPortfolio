import puppeteer from 'puppeteer';

async function main() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ 
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  });
  
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      console.log(`Browser ${msg.type()}:`, msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('Browser pageerror:', error.message, error.stack);
  });

  console.log('Navigating to http://localhost:4178 ...');
  try {
    await page.goto('http://localhost:4178', { waitUntil: 'networkidle0' });
    console.log('Page loaded successfully.');
  } catch (e) {
    console.error('Navigation failed:', e.message);
  }

  await browser.close();
  process.exit(0);
}

main().catch(console.error);
