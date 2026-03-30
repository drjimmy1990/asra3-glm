# Plan: Fix Arabic Typography Issues

The Arabic text is currently too large and letters are being clipped at the top. This is likely due to the aggressive fluid scale, tight `line-height`, and `overflow-hidden` containers in the `AnimatedText` component.

## Objective
Adjust the typography for RTL (Arabic) to prevent clipping, ensure appropriate sizing, and provide enough vertical space for Arabic diacritics and ascenders.

## Key Files & Context
- `src/app/globals.css`: RTL overrides and base heading styles.
- `src/components/landing/hero.tsx`: `AnimatedText` component and `h1` styling.
- `src/components/landing/services.tsx`: Section heading styles.

## Proposed Changes

### 1. RTL Font Overrides (globals.css)
- Explicitly override `--font-heading` for RTL to use `Noto Sans Arabic`.
- Adjust `line-height` for headings in RTL (from `1.1` to `1.3` or similar).
- Scale down the fluid typography slightly for RTL if it feels too large.

### 2. AnimatedText Clipping Fix (hero.tsx)
- Increase the `pb-2` to `pb-4` or similar to provide more room for descenders.
- Add `pt-2` or similar to the parent of `overflow-hidden` to provide room for ascenders/diacritics.
- Alternatively, remove `overflow-hidden` for Arabic if it's too problematic, or adjust the `y: 0` position.
- Change `leading-[0.9]` on the `h1` to a more sensible `leading-[1.2]` for Arabic.

### 3. Component-Specific RTL Adjustments
- **Hero:**
  - Update `h1` classes to use `rtl:leading-tight` or similar.
  - Ensure `tracking-tighter` is removed for RTL (as it's already handled in `globals.css`).
- **Services:**
  - Ensure headings have enough vertical padding/margin.

## Verification & Testing
- **Arabic Toggle:** Switch language to Arabic and verify no clipping at the top or bottom of letters.
- **English Toggle:** Ensure English still looks "Technical-Premium" and bold.
- **Responsive:** Check Arabic on mobile to ensure it fits within containers.
- **Visual Check:** Verify the relative size of Arabic vs English feels balanced.
