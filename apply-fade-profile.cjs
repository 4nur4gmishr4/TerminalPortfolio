const fs = require('fs');
let c = fs.readFileSync('src/pages/Profile.tsx', 'utf8');

if (!c.includes('FadeIn')) {
  c = c.replace('import { formatIndex, generateId } from "@/lib/utils";', 'import { formatIndex, generateId } from "@/lib/utils";\nimport { FadeIn } from "@/components/ui/FadeIn";');

  c = c.replace('<section className="profile-section profile-section--experience"', '<FadeIn delay={0.2}>\n      <section className="profile-section profile-section--experience"');
  c = c.replace('</section>\n\n      <section className="profile-section profile-section--education"', '</section>\n      </FadeIn>\n\n      <FadeIn delay={0.2}>\n      <section className="profile-section profile-section--education"');
  c = c.replace('</section>\n\n      <section className="profile-section profile-section--skills"', '</section>\n      </FadeIn>\n\n      <FadeIn delay={0.2}>\n      <section className="profile-section profile-section--skills"');
  c = c.replace('</section>\n\n      <section className="profile-section profile-section--honors"', '</section>\n      </FadeIn>\n\n      <FadeIn delay={0.2}>\n      <section className="profile-section profile-section--honors"');
  c = c.replace('</section>\n\n      <section className="profile-next-step"', '</section>\n      </FadeIn>\n\n      <FadeIn delay={0.2}>\n      <section className="profile-next-step"');
  c = c.replace('</section>\n    </div>', '</section>\n      </FadeIn>\n    </div>');
}

fs.writeFileSync('src/pages/Profile.tsx', c);
