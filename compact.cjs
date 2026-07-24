const fs = require('fs');
const glob = require('glob');

function compactSpacing(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Match CSS properties like padding: 48px, margin-top: 64px, gap: 32px
  // and inline React styles like { gap: '48px' } or { marginTop: "32px" }
  
  const rules = [
    { regex: /((?:padding|margin|gap)[a-zA-Z-]*\s*[:=]\s*["']?)(\d+)px(["']?)/g, replace: true },
  ];

  let modified = false;

  rules.forEach(rule => {
    content = content.replace(rule.regex, (match, prefix, numStr, suffix) => {
      let num = parseInt(numStr, 10);
      if (num > 16) {
        // Reduce spacing by roughly 40-50%
        let newNum = Math.round(num * 0.5);
        if (newNum % 2 !== 0) newNum += 1; // Keep it even
        modified = true;
        return `${prefix}${newNum}px${suffix}`;
      }
      return match;
    });
  });

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`Compacted spacing in ${filePath}`);
  }
}

const files = [
  'src/index.css',
  'src/pages/Index.tsx',
  'src/pages/Profile.tsx',
  'src/pages/Projects.tsx',
  'src/pages/Contact.tsx',
  'src/pages/ProjectDetail.tsx',
  'src/components/portfolio/ProjectCard.tsx',
  'src/components/ui/Carousel.tsx'
];

files.forEach(f => {
  if (fs.existsSync(f)) compactSpacing(f);
});

console.log('Done compacting.');
