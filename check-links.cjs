const fs = require('fs');

async function checkLinks() {
  const content = fs.readFileSync('src/types/portfolio.ts', 'utf8');
  const urls = [...content.matchAll(/https?:\/\/[^"']+/g)].map(m => m[0]);
  
  const uniqueUrls = [...new Set(urls)].filter(url => !url.includes('linkedin.com'));
  console.log(`Checking ${uniqueUrls.length} URLs...\n`);
  
  for (const url of uniqueUrls) {
    try {
      const res = await fetch(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok && res.status !== 403 && res.status !== 405) {
        // If HEAD fails, try GET
        const resGet = await fetch(url, { method: 'GET', headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!resGet.ok) {
          console.log(`[BROKEN] ${url} - Status: ${resGet.status}`);
        }
      }
    } catch (e) {
      console.log(`[FAILED] ${url} - Error: ${e.message}`);
    }
  }
  console.log('\nDone checking.');
}

checkLinks();
