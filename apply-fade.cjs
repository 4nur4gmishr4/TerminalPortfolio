const fs = require('fs');
let c = fs.readFileSync('src/pages/Index.tsx', 'utf8');

if (!c.includes('FadeIn')) {
  c = c.replace('import nullSecretLogo from "@/assets/null-secrets-logo.json";', 'import nullSecretLogo from "@/assets/null-secrets-logo.json";\nimport { FadeIn } from "@/components/ui/FadeIn";');

  c = c.replace('<aside className="impact-ledger"', '<FadeIn delay={0.2}>\n          <aside className="impact-ledger"');
  c = c.replace('</aside>\n      </section>', '</aside>\n        </FadeIn>\n      </section>');

  c = c.replace('<section className="content-section" aria-labelledby="selected-work-title">', '<FadeIn delay={0.2}>\n        <section className="content-section" aria-labelledby="selected-work-title">');
  c = c.replace('          />\n        </div>\n      </section>', '          />\n        </div>\n      </section>\n      </FadeIn>');

  c = c.replace('<section className="content-section console-section" aria-labelledby="console-title">', '<FadeIn delay={0.2}>\n        <section className="content-section console-section" aria-labelledby="console-title">');
  c = c.replace('</CommandConsole>\n        </div>\n      </section>', '</CommandConsole>\n        </div>\n      </section>\n      </FadeIn>');
}

fs.writeFileSync('src/pages/Index.tsx', c);
