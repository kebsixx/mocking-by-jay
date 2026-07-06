# Mocking by Jay — Independent Record Label

A minimal, urban landing page for **Mocking by Jay**, an independent record label focused on rap music. Built with Vite, React, and Tailwind CSS v4.

## Features

- **Dark glassmorphism theme** — premium dark palette with red accents, frosted glass navbar, and subtle glow effects
- **Artist Roster** — profile cards with images, genres, and status tags for 5 featured artists
- **Booking Modal** — full booking request form (name, email, phone, event type, date, message) with validation and success state
- **Studio Sessions** — dedicated studio showcase with equipment list and booking CTA
- **Featured Music** — track listing with album art placeholders, play counts, and SoundCloud link
- **Scroll-triggered animations** — smooth fade-in reveals on scroll via IntersectionObserver
- **Responsive design** — mobile-first with hamburger nav, fluid typography (`clamp()`), and adaptive grid layouts

## Sections

| Section | ID | Description |
|---------|----|-------------|
| Hero | `#hero` | Bold headline, tagline, and dual CTAs |
| About | `#about` | Label mission and core values |
| Artists | `#artists` | Artist roster with profile cards |
| Studio | `#studio` | Studio equipment and booking |
| Music | `#music` | Featured tracks |
| Book | `#book` | Final call-to-action + booking form |

## Tech Stack

- **Framework:** [Vite](https://vite.dev/) + [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Linting:** [Oxlint](https://oxc.rs/)
- **Language:** JavaScript (JSX)

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
mocking-by-jay/
├── index.html              # Entry HTML
├── vite.config.js          # Vite + Tailwind plugin config
├── package.json            # Dependencies and scripts
├── public/                 # Static assets (favicon, icons)
└── src/
    ├── main.jsx            # React entry point
    ├── index.css           # Tailwind v4 imports + custom theme (@theme)
    └── App.jsx             # All components (single file)
```

## Design

- **Palette:** Near-black (`#050505`) backgrounds, rich red (`#dc2626`) accents, muted gray tones for secondary text
- **Typography:** Tight tracking, bold headlines, clean editorial hierarchy
- **Effects:** Glassmorphism (backdrop blur, subtle borders), ambient glow gradients, hover scale/color transitions, scroll reveals with cubic-bezier easing

## Deployment

The build output goes to the `dist/` directory. Deploy to any static host:

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

Built for Mocking by Jay Records. &copy; 2026
