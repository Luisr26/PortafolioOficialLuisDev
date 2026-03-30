# Portfolio — Luis Alfredo Orozco Sanchez

[![Astro](https://img.shields.io/badge/Astro_5-BC52EE?style=flat-square&logo=astro&logoColor=white)]()
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)]()

Professional developer portfolio. Dark theme, responsive, animated.

## Architecture

```
src/
├── components/
│   ├── Navbar.astro        # Auto-hide navbar + mobile menu
│   ├── SideElements.astro  # Floating social links + email
│   ├── Hero.astro          # Animated intro with CTA
│   ├── About.astro         # Bio + skills grid + accent border image
│   ├── Experience.astro    # Tabbed layout (3 companies)
│   ├── Projects.astro      # 6 project cards with hover effects
│   ├── TechStack.astro     # Skill icons + devicon + FontAwesome
│   ├── Contact.astro       # Email CTA + social links
│   └── Footer.astro
├── layouts/
│   └── Layout.astro        # Global layout + SEO + scroll reveal
├── pages/
│   └── index.astro         # Single page composition
└── styles/
    └── global.css          # Tailwind + custom utilities
```

## Design inspiration

- **Brittany Chiang** — Dark sidebar, tabbed experience, floating elements
- **Lee Robinson** — Minimal, content-focused
- **Token Template** — Terminal aesthetic, monospace
- **Neodev** — Accent color, cyberpunk feel

## Stack

| Tech | Purpose |
|:---|:---|
| Astro 5 | Static site framework |
| Tailwind CSS 3 | Utility-first styling |
| FontAwesome 6 | Icons |
| Skill Icons | Tech stack display |
| Sora + JetBrains Mono | Typography |

## Getting started

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or GitHub Pages
```

## Author

**Luis Alfredo Orozco Sanchez** — AI & Automation Developer  
[GitHub](https://github.com/Luisr26) · [LinkedIn](https://www.linkedin.com/in/luis-orozco-07ab5b208/) · [Email](mailto:luisoro009@gmail.com)
