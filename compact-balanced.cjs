const fs = require('fs');

function compactAllPx(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Change --gutter back to something manageable
  content = content.replace(/--gutter: 1cm;/g, '--gutter: 24px;');

  const regex = /(padding(?:-[a-z]+)?|margin(?:-[a-z]+)?|gap):\s*([^;]+);/g;
  
  content = content.replace(regex, (match, prop, values) => {
    const newValues = values.replace(/\b(\d+)px\b/g, (pxMatch, numStr) => {
      let num = parseInt(numStr, 10);
      if (num > 40) { // Only reduce very large spaces
        let newNum = Math.round(num * 0.8); // Reduce by just 20%
        if (newNum % 2 !== 0) newNum += 1;
        return `${newNum}px`;
      }
      return pxMatch;
    });
    return `${prop}: ${newValues};`;
  });

  // Let's also make the page-enter transition faster
  content = content.replace(/animation: page-enter \d+ms [^;]+;/g, 'animation: page-enter 300ms cubic-bezier(0.16, 1, 0.3, 1) both;');
  
  // Update keyframes for page-enter to be snappier
  content = content.replace(/@keyframes page-enter {[\s\S]*?}/, `@keyframes page-enter {
  0% { opacity: 0; transform: translateY(8px) scale(0.99); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}`);

  fs.writeFileSync(filePath, content);
  console.log(`Balanced spacing and fast transitions in ${filePath}`);
}

compactAllPx('src/index.css');
