# Anas Mahmoud — Portfolio

A responsive English portfolio and CV. Buildless HTML, CSS and JavaScript; no runtime dependencies.

## Preview

Serve this repository with a static HTTP server. For example: `python -m http.server 4173`.

## Content

- Six selected projects, discipline filters and accessible project dialogs.
- About, services, experience, education, contact links and downloadable original CV.
- Local image assets collected from the owner's supplied portraits and Behance portfolio.
- Project copy summarizes the supplied CV and published work. No invented outcomes, awards or client testimonials.

## Update

Edit `index.html` for page copy, `styles.css` for layout, and `app.js` for project descriptions and gallery images.

## Sources

CV and portraits supplied by Anas Mahmoud. Project images: https://www.behance.net/anassmahmoa4a6

The visual direction combines oversized monochrome portrait typography with editorial grids and small technical labels, informed by the two references supplied in the chat.

## Portrait and layout revision

- Replaced the approximate CSS polygon with `assets/anas-portrait-cutout.png`, a true-alpha background extraction made with the built-in image generation tool.
- The original supplied photograph is retained at `assets/anas-portrait.png`.
- Increased heading tracking and line spacing, spaced project captions and job descriptions, and moved mobile introduction copy into its own row below the portrait.
- Added verified professional information from https://www.linkedin.com/in/anas-mahmoud-8149021a1/ and the owner's posts, including the AI image/video workflow, editorial lifestyle work, Nplanet UI role, Vida contract and earlier industrial design.

### Image editing prompt

Use case: background-extraction. Edit target: the original portrait of Anas in a white button-up shirt. Produce only a clean photographic cutout of this exact same man by removing the beige background to true alpha transparency. Preserve the source photograph as faithfully as possible: identical facial identity, eyes, beard, hairline, expression, pose, lighting, shirt, shoulders and proportions. Do not retouch, beautify, reshape, relight, add or invent any part of the person. Keep the entire original head, both ears, neck, shirt and visible torso, with natural hair and beard edges. Keep the square composition and transparent space around the silhouette. No text, graphics, shadow, replacement backdrop or baked-in checkerboard. Used as an image overlapping typography on the portfolio header.

The owner explicitly selected LinkedIn as the timeline date source on 14 November 2026. The original downloadable CV remains the supplied PDF; it has not been rewritten.

## Motion

- Seamless, continuous specialisms strip with slowly rotating separators and a pause/play control. Two equal groups loop at a steady 44px/second. Offscreen movement pauses automatically.
- Staggered hero entrance, once-per-section scroll reveals, project-filter and dialog entrances, and restrained link/accordion interactions.
- The pause control stops animations across the page. System reduced-motion preferences are respected, including changes while the page is open; the strip becomes static and wraps to keep all disciplines readable.
- Content stays visible without JavaScript or IntersectionObserver. Motion uses CSS transforms/opacity and the browser's Web Animations API, with no added dependencies.

## Contact and career overview

- WhatsApp button and footer link use the owner's supplied Egyptian number, normalized to `https://wa.me/201097980606` (+20 109 798 0606).
- Markets confirmed by the owner: United States, United Arab Emirates, Saudi Arabia, Egypt and Germany.
- The three most recent roles are visible by default. Six earlier roles are inside a native, keyboard-accessible disclosure; every role retains its original dates and description. Role descriptions start collapsed to keep the page concise.

