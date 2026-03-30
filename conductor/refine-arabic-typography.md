# Plan: Refine Arabic Typography (Sizing & Spacing)

The previous Arabic typography adjustments made the text too small and introduced a spacing/overlap issue where English words like "SaaS" cut into subsequent Arabic characters in an RTL context.

## Objective
Increase the Arabic (RTL) fluid typography scale to better match English visual weight, fix character overlap by resetting tracking in RTL, and refine the `AnimatedText` component's horizontal spacing.

## Key Files & Context
- `src/app/globals.css`: RTL fluid typography variables.
- `src/components/landing/hero.tsx`: `h1` tracking and `AnimatedText` component.

## Proposed Changes

### 1. Increase RTL Fluid Typography Scale (globals.css)
Bumping up the `clamp` values for RTL to be closer to English but still slightly adjusted for the larger visual footprint of Arabic characters.
- `--text-2xl`: `clamp(1.5rem, 1.35rem + 1vw, 2rem)`
- `--text-3xl`: `clamp(1.8rem, 1.6rem + 2vw, 2.5rem)`
- `--text-4xl`: `clamp(2.2rem, 1.8rem + 3vw, 3.5rem)`
- `--text-5xl`: `clamp(2.8rem, 2.3rem + 4.5vw, 4.5rem)`
- `--text-6xl`: `clamp(3.5rem, 3rem + 6vw, 6rem)`
- `--text-display`: `clamp(4rem, 3.5rem + 9vw, 8.5rem)`

### 2. Fix Overlap by Resetting Tracking in RTL (hero.tsx)
The `h1` in `hero.tsx` has `tracking-tighter`. For Arabic, this is causing character overlap.
- Add `rtl:tracking-normal` to the `h1` in `hero.tsx`.
- Add `px-1` or `mx-0.5` to the `AnimatedText` words to ensure they don't clip horizontally.

### 3. Refine AnimatedText for RTL (hero.tsx)
- Increase the `me-3` to `me-4` or similar to provide more horizontal breathing room between words, especially when mixing English and Arabic.
- Ensure `overflow-hidden` has enough vertical AND horizontal padding to prevent clipping of wide characters.

## Verification & Testing
- **Visual Check (Arabic)**: Confirm the heading size is prominent and "SaaS" (or other English words) no longer overlaps the following Arabic letter.
- **Visual Check (English)**: Confirm English sizing remains consistent and bold.
- **Responsive**: Ensure the new scale doesn't break the layout on small screens (mobile).
