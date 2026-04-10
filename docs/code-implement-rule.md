# Code Implement Rule

## Hero Carousel Interaction Rules

This project uses a reusable hero carousel component at:
- `frontend/src/app/features/landing/components/hero-carousel/`

### 1. Pause On Hover
- Auto-play interval is `6000ms`.
- On desktop hover (`mouseenter`), auto-play must pause.
- On `mouseleave`, auto-play resumes.
- Timer must be safely cleared in `ngOnDestroy`.

### 2. Swipe Gesture Support (Mobile)
- Use touch events: `touchstart`, `touchmove`, `touchend`.
- Track horizontal delta from start to end.
- Swipe threshold is `48px`.
- Delta < 0 means next slide; delta > 0 means previous slide.
- While touching, auto-play pauses and then resumes after touch ends.

### 3. Smooth Slide Transition
- Do not animate `background-image` directly.
- Use dual background layers:
  - previous slide layer
  - current slide layer
- Animate with keyframes (fade + slight translate/scale):
  - incoming background (`hero-bg-in`)
  - outgoing background (`hero-bg-out`)
- Animation duration is `650ms`.
- Respect accessibility with reduced motion:
  - disable animation under `prefers-reduced-motion: reduce`.

### 4. Navigation Controls
- Include both arrow buttons and dot indicators.
- Arrows must have `aria-label` values:
  - `Previous slide`
  - `Next slide`
- Dots must expose `aria-label` for each slide target.

### 4.1 Keyboard Accessibility
- Support keyboard navigation with `ArrowLeft` and `ArrowRight`.
- Keep keyboard event handling inside the carousel component.
- Use a focusable keyboard anchor/button with clear `aria-label` text.
- While keyboard-focused, auto-play should pause and then resume on blur.

### 5. Maintainability Rules
- Keep slide data typed in a dedicated interface (`HeroSlide`).
- All carousel behavior logic stays inside the reusable component.
- Page container (`landing`) should only consume `<app-hero-carousel />`.
- Visual assets are stored under:
  - `frontend/public/images/hero/`
