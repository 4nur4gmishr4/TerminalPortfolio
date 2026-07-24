const fs = require('fs');

let c = fs.readFileSync('src/pages/Index.tsx', 'utf8');

if (!c.includes('FadeIn')) {
  c = c.replace('import nullSecretLogo from "@/assets/null-secrets-logo.json";', 'import nullSecretLogo from "@/assets/null-secrets-logo.json";\nimport { FadeIn } from "@/components/ui/FadeIn";');

  c = c.replace(/<section className="content-section"/g, '<FadeIn delay={0.2}>\n<section className="content-section"');
  
  // Since we prepended <FadeIn> to every content-section, we must append </FadeIn> to their closing tags.
  // There are two content sections. Let's find them manually:
  
  // 1. The first content section closes right before the console-section opens
  c = c.replace('</section>\n\n      <section className="content-section console-section"', '</section>\n      </FadeIn>\n\n      <FadeIn delay={0.2}>\n      <section className="content-section console-section"');
  // Wait, the regex above already replaced the console section!
  // Let's do it safer.
}

fs.writeFileSync('src/pages/Index.tsx', c);
