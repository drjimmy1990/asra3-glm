# Plan: Typeset Website

Improve the typography of the website to move away from generic defaults and align with the brand personality: **Professional & Authoritative** and **Innovative**.

## Objective
Establish a high-performance, distinctive typography system using modern variable fonts and a fluid type scale, ensuring it feels premium, technical, and bold.

## Key Files & Context
- `src/app/layout.tsx`: Font declarations and CSS variable mapping.
- `src/app/globals.css`: Typography reset, theme variables, and global styles.
- `src/components/landing/hero.tsx`: High-impact display typography.
- `src/components/landing/services.tsx`: Content hierarchy and lists.
- `.impeccable.md`: Design context (Professional, Innovative, Bold).

## Proposed Changes

### 1. Font Selection & Configuration
- Replace `Geist` with a more distinctive pairing:
  - **Display/Headings:** `Space Grotesk` (Google Font) - Technical, innovative, and bold.
  - **Body/UI:** `Inter` (Variable) - The industry standard for legibility and professional UI.
- Retain `Noto Sans Arabic` for RTL support.
- Retain `Geist Mono` for technical/code elements.

### 2. Fluid Type Scale (globals.css)
- Implement a modular, fluid type scale using CSS `clamp()` to ensure headings are "heroic" on large screens but readable on mobile.
- Use a 1.25 (Major Third) or 1.333 (Perfect Fourth) ratio.
- Define semantic typography tokens (e.g., `--text-display-1`, `--text-h1`, `--text-body-large`).

### 3. Global Typography Refinement (globals.css)
- Set optimal `line-height` for different contexts (1.1 for display, 1.6 for body).
- Implement `letter-spacing` adjustments:
  - Slightly tighter for large headings to look more "designed".
  - Slightly open for small caps/labels.
- Configure `max-width` on text containers using `ch` units for better readability (max 65-75ch).

### 4. Component-Specific Implementation
- **Hero:**
  - Update headings to use the new Display font with `tracking-tighter` and `font-black`.
  - Use `clamp()` for the massive font sizes (e.g., `text-7xl` -> `clamp(3rem, 10vw, 5rem)`).
- **Services/Sections:**
  - Refine subheadings and labels with better weight contrast (e.g., `font-semibold` vs `font-normal`).
  - Improve rhythm between headers and descriptions.

## Verification & Testing
- **Visual Check:** Verify the "Technical-Premium" feel.
- **Responsive:** Check fluid scaling across mobile, tablet, and ultra-wide.
- **RTL:** Ensure Noto Sans Arabic integrates well with the new scale.
- **Accessibility:** Verify contrast ratios and font-size readability (minimum 16px for body).
- **Performance:** Check Next.js font optimization and layout shift.
