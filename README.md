# Luis Orozco — Portfolio v5

Personal portfolio of **Luis Alfredo Orozco Sánchez**, AI, automation and full-stack developer based in Barranquilla, Colombia.

**Live:** https://portafolio-oficial-luis-dev.vercel.app · **English:** `/en/`

Signage-inspired design: a giant variable-width headline that reacts to the cursor and to scroll, a single slate palette with a signal-orange accent, and a conversational contact form that writes a live letter as you answer.

## Stack

- [Astro 5](https://astro.build), static output, deployed on Vercel
- Hand-written CSS with design tokens (no CSS framework)
- Self-hosted fonts: Archivo Variable (`wdth` 62–125, `wght` 100–900) and JetBrains Mono
- [Lenis](https://lenis.darkroom.engineering) for inertial scrolling
- `astro:assets` + sharp for responsive WebP images
- `@astrojs/sitemap` + JSON-LD (`Person`, `WebSite`) for SEO

## Project structure

```text
src/
├── config/site.ts           # Identity, contact links, SEO constants
├── i18n/                    # UI strings (es / en) and helpers
├── data/                    # Experience, education, projects, services (bilingual)
├── layouts/BaseLayout.astro # <head>, SEO, fonts preload, global chrome
├── components/
│   ├── HomePage.astro       # Composes the sections for one language
│   ├── layout/              # Nav, Footer, Loader, Cursor
│   ├── sections/            # Hero, Tapes, About, Experience, Work, Services, Contact
│   ├── seo/SEO.astro        # Meta, Open Graph, hreflang, JSON-LD
│   └── ui/                  # SplitText, DoorSign, SectionHead
├── scripts/                 # Client modules (one rAF ticker shared by all)
├── styles/                  # tokens.css (palette) + base.css (reset, utilities)
└── pages/                   # / (es), /en/ (en), 404
public/                      # favicon, OG image, icons, robots.txt, manifest
tools/generate-assets.mjs    # Regenerates OG image, icons and JSON-LD portrait
design/                      # Design prototypes (not deployed)
```

## Scripts

```bash
npm install
npm run dev       # http://localhost:4321
npm run check     # astro check (types + templates)
npm run build     # static build in dist/
npm run preview   # serve the build
npm run assets    # regenerate OG image and icons
```

## Environment

Copy `.env.example` to `.env`. `PUBLIC_WEB3FORMS_KEY` is optional: with it the contact form posts to Web3Forms; without it, it opens the visitor's mail client with the message prefilled.

## Performance & accessibility notes

- Scroll animations use CSS `animation-timeline` (compositor-driven); Firefox gets an IntersectionObserver fallback.
- JS only writes `transform` / `font-variation-settings`, inside one `requestAnimationFrame` loop that stops when idle.
- `prefers-reduced-motion` disables motion, the loader, the custom cursor and the pinned carousel.
- The intro loader shows once per session and never blocks content for no-JS crawlers.
- Text split into letters keeps a hidden full copy for screen readers.

## Changelog

| Version | Branch | Changes |
|---|---|---|
| 5.0.0 | `feat/rediseno-v5` → `main` | Full redesign from prototype A·v3 (Pizarra palette). Removed Tailwind, FontAwesome CDN and the floating bot. Route-based i18n (`/`, `/en/`), SEO (canonical, hreflang, OG, JSON-LD, sitemap), WebP images, self-hosted fonts, new sections (experience, projects carousel, services, conversational contact). |
| 4.0.0 | `main` | Two-column layout inspired by Brittany Chiang v5. |

---

© Luis Alfredo Orozco Sánchez · [GitHub](https://github.com/Luisr26) · [LinkedIn](https://www.linkedin.com/in/luis-orozco-07ab5b208/)
