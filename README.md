# Cinematic Video Hero — Madan P

A fullscreen, sticky hero section for a Next.js App Router portfolio, built around
the uploaded talking-head video. Dark, warm, cinematic — foreground video, blurred
ambient duplicate, a soft Three.js bokeh layer, and GSAP-driven entrance motion.

## Install

```bash
npm install gsap three
```

(Next.js, React, and CSS Modules support are assumed to already be set up.)

## Files

```
components/
  VideoIntro.jsx           the hero section: video layers, content, controls, scroll cue
  VideoIntro.module.css    all styling — tokens, typography, glass buttons, gradients
  CinematicLayer.jsx       Three.js bokeh/particle overlay with mouse parallax
app/
  page.jsx                 example usage inside an App Router page
public/
  videos/
    madan-intro.mp4        your uploaded video, ready to serve statically
```

Drop `components/` and the `public/videos/` file into your existing Next.js project
(merge folders if you already have a `components` or `public` directory), then
render `<VideoIntro />` wherever the hero should live — typically at the top of
`app/page.jsx`.

## Design notes

- **Palette** — near-black warm charcoal (`#0a0908`) base, ember orange
  (`#ff6a2e` / `#ffb066`) as the practical-light accent, a touch of cool
  monitor blue (`#5b8cff`) inside the particle field only, fog-white
  (`#f5f0e8`) for type.
- **Type** — Fraunces (a warm, characterful serif with a true italic) for the
  stacked name, set large and tight; Inter for the eyebrow, subtitle, and UI
  chrome. The italic on the last name is the one typographic flourish.
- **Signature element** — the scroll indicator is a small five-bar waveform
  that pulses like an audio meter, a quiet nod to the talking-head/voice
  subject rather than a generic chevron or dash.
- **Two video layers** — the foreground video is sharp and holds the subject;
  a second instance of the same source is blurred, darkened, and scaled up
  behind it as ambient light, so the whole frame feels lit by the video
  rather than just displaying it.
- **Three.js layer** — ~140 additively-blended sprites drifting on sine
  waves, rendered at `pointer-events: none` with `mix-blend-mode: screen` so
  they read as light rather than confetti. Rendering pauses on tab-hidden,
  and all geometry/material/texture/renderer resources are disposed on
  unmount.
- **Motion** — a single GSAP timeline sequences frame fade-in → eyebrow →
  name (first, then last) → subtitle → controls → scroll cue. Everything
  respects `prefers-reduced-motion`.

## Behavior

- Video autoplays muted (required for autoplay in every browser), loops, and
  plays inline.
- The mute button unmutes the *foreground* video only — the blurred
  background copy stays muted permanently so you never get doubled audio.
- The "Tap for sound" badge auto-hides after 4.5s, or immediately once the
  visitor interacts with mute.
- Play/pause controls both video layers together and stays in sync via the
  video's own `play`/`pause` events (so it's correct even if the browser
  pauses it for other reasons).
- Clicking the scroll cue smooth-scrolls to the element with
  `id={nextSectionId}` (defaults to `next-section`).

## Swapping in your own copy

All text is passed as props — `eyebrow`, `firstName`, `lastName`, `subtitle`,
`videoSrc`, `nextSectionId` — so the component is reusable without touching
the JSX.
