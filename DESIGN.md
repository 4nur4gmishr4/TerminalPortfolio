---
name: Kinetic OS
colors:
  surface: '#0c141e'
  surface-dim: '#0c141e'
  surface-bright: '#323a45'
  surface-container-lowest: '#070f19'
  surface-container-low: '#141c27'
  surface-container: '#18202b'
  surface-container-high: '#232a36'
  surface-container-highest: '#2d3541'
  on-surface: '#dbe3f2'
  on-surface-variant: '#b9cacb'
  inverse-surface: '#dbe3f2'
  inverse-on-surface: '#29313c'
  outline: '#849495'
  outline-variant: '#3b494b'
  surface-tint: '#00dbe9'
  primary: '#dbfcff'
  on-primary: '#00363a'
  primary-container: '#00f0ff'
  on-primary-container: '#006970'
  inverse-primary: '#006970'
  secondary: '#f5ff7d'
  on-secondary: '#2f3300'
  secondary-container: '#d7e404'
  on-secondary-container: '#5d6400'
  tertiary: '#f2f6ff'
  on-tertiary: '#063254'
  tertiary-container: '#c0dcff'
  on-tertiary-container: '#3e6186'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#7df4ff'
  primary-fixed-dim: '#00dbe9'
  on-primary-fixed: '#002022'
  on-primary-fixed-variant: '#004f54'
  secondary-fixed: '#dfed1a'
  secondary-fixed-dim: '#c3d000'
  on-secondary-fixed: '#1b1d00'
  on-secondary-fixed-variant: '#454a00'
  tertiary-fixed: '#d0e4ff'
  tertiary-fixed-dim: '#a7caf3'
  on-tertiary-fixed: '#001d35'
  on-tertiary-fixed-variant: '#25496c'
  background: '#0c141e'
  on-background: '#dbe3f2'
  surface-variant: '#2d3541'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-base:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  data-mono:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  window-padding: 20px
  gutter: 16px
---

## Brand & Style

This design system establishes a high-fidelity, terminal-inspired operating environment that balances technical precision with cinematic elegance. The brand personality is **intelligent, disciplined, and unobtrusive**, designed for power users who value clarity and speed. 

The aesthetic is a hybrid of **Glassmorphism** and **Minimalism**. It leverages the structural density of developer tools (Linear.app influence) but executes them with the fluid motion and depth of a premium consumer OS. The goal is to move away from "hacker" tropes toward a professional "Command Center" feel—utilizing holographic reflections, razor-thin strokes, and a sophisticated dark-mode-only hierarchy.

## Colors

The palette is anchored in a monochromatic dark range to maintain focus, with a single high-energy accent for interaction.

- **Primary Background:** `#07090B` (Deep Graphite Black). This provides the canvas for all depth effects.
- **Electric Cyan (#00F0FF):** Used sparingly as a surgical accent for focus states, active progress indicators, and primary CTAs.
- **Neutral Grays:** Derived from `#8B93A1` to handle secondary text and inactive iconography.
- **Utility Accents:** `#E4F222` (Acid Lime) is reserved for critical warnings or attention-required statuses, while `#B2D5FF` (Soft Blue) handles informational tooltips.

All surfaces use varying levels of opacity rather than solid colors to allow the background wallpaper or underlying windows to bleed through subtly.

## Typography

The typographic system utilizes a high-contrast pairing of **Geist** and **JetBrains Mono**. 

**Geist** is the interface workhorse, used for all headings, navigation, and primary UI controls. It provides a modern, neutral, and highly legible foundation. 

**JetBrains Mono** is used for all "active" data, code snippets, system status readouts, and metadata. This distinction signals to the user when they are looking at "system content" versus "technical data." 

Large display titles should use tight letter spacing and medium weights to feel like a high-end editorial publication, while mono labels should use increased letter spacing for maximum scanability at small sizes.

## Layout & Spacing

This design system uses a **fluid, contextual layout** within floating window containers. The underlying grid is a strict 4px baseline, ensuring all elements align with mathematical precision.

### Desktop & Tablet
Windows are treated as floating objects. They do not snap to a grid but respect a 24px safe zone from the screen edges. Within windows, a 12-column internal grid is used for complex data layouts, with 16px gutters.

### Mobile
Windows transition to full-screen "cards." Margins are reduced to 16px, and the 12-column grid collapses to a 4-column system.

Spacing is used to denote hierarchy: larger gaps (24px+) separate distinct functional groups, while tight gaps (4px-8px) couple labels with their respective data fields.

## Elevation & Depth

Depth is created through **refractive transparency** rather than heavy shadows.

1.  **Base Layer:** The primary background (#07090B).
2.  **Surface Layer:** Floating windows use a backdrop filter (`blur: 20px`) and a semi-transparent background (`rgba(13, 15, 18, 0.7)`).
3.  **Holographic Border:** Every window and floating element features a 1px solid border. This border is not uniform; it uses a linear gradient (top-left to bottom-right) from `rgba(255,255,255,0.15)` to `rgba(255,255,255,0.02)`.
4.  **Shadows:** Shadows are "ambient." They have a large spread (40px+) but very low opacity (15%), creating a soft glow that makes windows feel like they are hovering just above the surface.
5.  **Reflections:** Primary elements include a subtle "glass shine"—a diagonal 1px light streak that appears only on interaction.

## Shapes

The shape language is **"Soft-Technical."** We avoid aggressive 0px corners to prevent a dated "hacker" look, but we also avoid pill-shaped buttons which feel too consumer-focused.

- **Standard Elements:** 4px (0.25rem) radius for buttons, input fields, and small chips.
- **Containers:** 8px (0.5rem) radius for windows and large cards.
- **Selection States:** Use sharp inner corners when nested within rounded containers to maintain visual alignment.

Interactive elements should feel like precision-milled hardware components.

## Components

### Buttons
Buttons are predominantly ghost-style or subtly filled. The **Primary Button** uses the Electric Cyan accent as a glow or border-heavy style. **Secondary Buttons** use a subtle glass-fill with white text.

### Terminal Inputs
Input fields should not look like boxes. They should appear as a single bottom border or a very subtle dark-filled track. Use the JetBrains Mono font for input text to reinforce the technical nature of the OS.

### Window Chrome
Title bars are integrated into the window surface. Close/Minimize/Maximize controls are minimal dots that only reveal their icons on hover, reducing visual noise.

### Data Lists
Lists use 1px horizontal dividers with a 40% opacity. Hovering over a list item should trigger a "scanning" effect—a subtle horizontal highlight that follows the cursor.

### Chips & Tags
Tags are strictly rectangular with a 2px radius. They use monospace text at 11px and a background color that is only 10% opaque version of the text color.

### Holographic Overlays
Used for "Toast" notifications or system alerts. These should have a higher blur value (40px) and a slightly brighter border to appear "closer" to the user than standard windows.