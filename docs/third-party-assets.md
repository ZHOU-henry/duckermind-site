# Third-Party Asset Notes

The static site currently includes a small number of third-party images with
clear reuse permission.

## Source

- Unsplash License: <https://unsplash.com/license>
- Globe.GL:
  - <https://globe.gl/>
  - locally hosted under `site/assets/vendor/globe.gl.min.js`
- TopoJSON client:
  - <https://github.com/topojson/topojson-client>
  - locally hosted under `site/assets/vendor/topojson-client.min.js`
- Earth texture:
  - derived from official `three-globe` example image
  - locally hosted under `site/assets/images/earth-night.jpg`
  - pacific-centered derivative:
    - `site/assets/images/earth-night-pacific.jpg`
- Country boundary data:
  - `world-atlas` countries topojson
  - locally hosted under `site/assets/data/countries-110m.json`

## Imported Images

### `site/assets/images/hero-lab.jpg`

- Source CDN URL:
  `https://images.unsplash.com/photo-1615938165708-feda49ca470c`
- Photographer shown by Unsplash search at time of retrieval:
  `Boitumelo`
- Retrieved: `2026-03-16`

### `site/assets/images/robotics-lab.jpg`

- Source CDN URL:
  `https://images.unsplash.com/photo-1661882217431-b64b303fb1d0`
- Photographer shown by Unsplash search at time of retrieval:
  `Hermeus`
- Retrieved: `2026-03-16`

### `site/assets/images/robot-unit.jpg`

- Source CDN URL:
  `https://images.unsplash.com/photo-1574803442176-70d4b465c920`
- Photographer shown by Unsplash search at time of retrieval:
  `Jorge Zapata`
- Retrieved: `2026-03-16`

### `site/assets/images/future-city.jpg`

- Source page:
  <https://unsplash.com/photos/a-digital-rendering-of-a-futuristic-city-sHoitMpbE5I>
- Source CDN URL:
  `https://images.unsplash.com/photo-1692606742912-b4f9c7102869`
- Retrieved: `2026-03-16`

### `site/assets/images/cube-structure.jpg`

- Source page:
  <https://unsplash.com/photos/a-white-cube-with-blue-squares-4sRFTaQSM8Q>
- Source CDN URL:
  `https://images.unsplash.com/photo-1665690399850-036127c5da17`
- Retrieved: `2026-03-16`

### `site/assets/images/synth-city.jpg`

- Source page:
  <https://unsplash.com/photos/a-city-in-the-middle-of-a-city-Vc0CmuIfMg0>
- Source CDN URL:
  `https://images.unsplash.com/photo-1655720408861-8b04c0724fd9`
- Retrieved: `2026-03-16`

### `site/assets/images/robot-white.jpg`

- Source page:
  <https://unsplash.com/photos/a-silver-robot-is-standing-in-front-of-a-white-wall-VN5LHGBwBsU>
- Source CDN URL:
  `https://images.unsplash.com/photo-1676115201783-7c13592cb05d`
- Retrieved: `2026-03-16`

### `site/assets/images/robot-metal.jpg`

- Source page:
  <https://unsplash.com/photos/black-and-brown-metal-robot-bJgboK4vwvA>
- Source CDN URL:
  `https://images.unsplash.com/photo-1610842920278-a47162bf2a00`
- Retrieved: `2026-03-16`

### `site/assets/images/matrix-art.jpg`

- Source page:
  <https://unsplash.com/photos/matrix-illustration-pKeF6Tt3c08>
- Source CDN URL:
  `https://images.unsplash.com/photo-1483213097419-365e22f0f258`
- Retrieved: `2026-03-16`

### `site/assets/images/circuit-board.jpg`

- Source CDN URL:
  `https://images.unsplash.com/photo-1518770660439-4636190af475`
- Retrieved: `2026-03-16`

## Local Policy

- Keep the number of imported third-party visual assets small.
- Prefer locally hosted copies over runtime hotlinking.
- If an image is replaced later, update this file with the new source and
  license basis.
