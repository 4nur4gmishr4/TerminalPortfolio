const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(/font-family:\s*["']JetBrains Mono["'],\s*monospace;/g, "font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: 0.01em;");
fs.writeFileSync('src/index.css', css);
console.log('done');
