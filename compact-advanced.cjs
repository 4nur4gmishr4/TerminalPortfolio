const fs = require('fs');

function compactAllPx(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Match any px value in the CSS file that is >= 20px
  // But ONLY for padding, margin, gap properties (we don't want to halve width/height/max-width!)
  const regex = /(padding(?:-[a-z]+)?|margin(?:-[a-z]+)?|gap):\s*([^;]+);/g;
  
  content = content.replace(regex, (match, prop, values) => {
    // values could be "36px 0 104px"
    const newValues = values.replace(/\b(\d+)px\b/g, (pxMatch, numStr) => {
      let num = parseInt(numStr, 10);
      if (num >= 20) {
        let newNum = Math.round(num * 0.6); // Reduce by 40%
        if (newNum % 2 !== 0) newNum += 1;
        return `${newNum}px`;
      }
      return pxMatch;
    });
    return `${prop}: ${newValues};`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Compacted spacing in ${filePath}`);
}

compactAllPx('src/index.css');
