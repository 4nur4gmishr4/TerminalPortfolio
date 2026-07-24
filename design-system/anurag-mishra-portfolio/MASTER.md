# Anurag Mishra Portfolio Design System

## Intent

An evidence-led engineering dossier. The terminal is a useful interaction surface, not a visual theme. The interface should help a recruiter scan impact, then inspect a project without navigating through decorative UI.

## Overrides

The initial generated purple/pink predictive-analytics recommendation is intentionally overridden because it conflicts with the brief: no neon, glow, AI-gradient, or cyberpunk treatment.

## Visual Direction

- Style: Swiss editorial grid with a restrained systems-console layer.
- Layout: 8px rhythm, thin rules, generous document flow, and no nested page scroll areas.
- Shape: 2px radius for controls, 6px maximum for repeated project items.
- Depth: borders and tonal surfaces only; no glass, blur, gradients, or floating panels.
- Icons: Lucide outline icons only, always paired with an accessible name.

## Tokens

| Role | Value | Use |
| --- | --- | --- |
| Canvas | `#FAFAF8` | Page background |
| Ink | `#16221B` | Headings and primary text |
| Ink soft | `#34423A` | Secondary text |
| Muted | `#66756C` | Supporting text |
| Line | `#D6DDD7` | Rules, outlines, dividers |
| Surface | `#FFFFFF` | Inputs and repeated project items |
| Terminal | `#16221B` | Intentional command surface |
| Terminal soft | `#223027` | Terminal metadata |
| Primary | `#0A6157` | Primary action and active state |
| Accent | `#AD3D4B` | Editorial emphasis and status markers |
| Focus | `#0A6157` | Keyboard focus ring |

## Typography

- Display and body: IBM Plex Sans, normal letter spacing.
- Technical metadata and console content: JetBrains Mono, normal letter spacing.
- Body size: 16px minimum; body line-height: 1.6.
- Heading levels express hierarchy by size and weight, not color alone.

## Components

- Navigation: one sticky document header with a 44px minimum target for every control.
- Project list: bordered, route-linked case-study items with category, role, metric, and explicit action.
- Case study: overview, evidence, features, technologies, and a factual system-map sequence.
- Terminal: semantic form input with direct commands and clear response text; never autofocus or block content.
- Contact form: visible labels, local validation messages, and a mailto handoff instead of a fake asynchronous delivery state.

## Motion

- Keep entry/exit motion to opacity and transform, 180-240ms ease-out.
- Use motion only to reinforce navigation or panel state.
- Disable nonessential transitions under `prefers-reduced-motion`.

## Quality Gate

- One H1 per route and sequential heading levels.
- Skip link, visible `:focus-visible` treatment, keyboard-operable menu and command palette.
- 4.5:1 contrast for normal text.
- Validate 375px, 768px, 1024px, and 1440px with no horizontal overflow or clipped text.
- Only display verified project links. Do not use placeholder media or invented product screenshots.
