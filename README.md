# Myat Kaung Khant — Developer Portfolio

A modern, glassmorphic personal portfolio built with **React 19**, **TypeScript**, and **Vite**. Designed to showcase full-stack development skills with smooth motion design, interactive 3D visuals, and a polished dark UI.

**Live repository:** [github.com/mkkbun/myatkaungkhant-portfolio](https://github.com/mkkbun/myatkaungkhant-portfolio)

---

## About

This project is the official portfolio site for **Myat Kaung Khant**, a Junior Developer & Full Stack Developer based in **East London, UK**. It presents profile information, technical skills, selected projects, work experience, blog highlights, and a contact section in a single-page, recruiter-friendly layout.

The interface uses a cyber-glass aesthetic: frosted panels, gradient accents, custom cursor tracking, and responsive sections that work on desktop and mobile.

---

## Features

| Area | Highlights |
|------|------------|
| **Hero** | Animated typewriter role labels, profile card with skill tags, live stats |
| **Skills** | Categorized stacks (Frontend, Backend, Database, Mobile) with spotlight modals |
| **Projects** | Filterable portfolio grid with simulated build terminal |
| **Experience** | Timeline of roles with technology tags |
| **Blog** | Article cards with expandable reading view |
| **Contact** | Email copy-to-clipboard, phone link, location, social links, message form UI |
| **UX** | 4 accent themes, 3D tilt cards, mouse-reactive background glow, custom cursor |
| **3D** | Interactive canvas (torus, crystal, DNA, wave) synced to theme colors |

---

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build tool:** Vite 6
- **Styling:** Tailwind CSS 4 (`@tailwindcss/vite`)
- **Animation:** Motion (Framer Motion)
- **Icons:** Lucide React
- **3D / Canvas:** Custom `Interactive3DCanvas` (Canvas 2D projection)

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (included with Node.js)

### Installation

```bash
git clone https://github.com/mkkbun/myatkaungkhant-portfolio.git
cd myatkaungkhant-portfolio
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run preview
```

### Type check

```bash
npm run lint
```

---

## Project Structure

```
├── src/
│   ├── App.tsx                 # Main layout, sections, theme & contact UI
│   ├── types.ts                # Profile, projects, experience, blog data
│   ├── main.tsx                # React entry point
│   ├── index.css               # Global styles & Tailwind
│   └── components/
│       └── Interactive3DCanvas.tsx
├── assets/                     # Static assets
├── index.html
├── vite.config.ts
├── package.json
└── .env.example                # Optional env template (not required for local UI)
```

---

## Customization

Edit **`src/types.ts`** to update portfolio content:

- `INITIAL_PROFILE` — name, role, bio, location, phone, email, social URLs, stats
- `SKILL_CATEGORIES` — skill groups and tags
- `PROJECTS` — portfolio case studies
- `EXPERIENCES` — work history
- `BLOG_POSTS` — blog entries

The in-app **Control Panel** (gear icon, bottom-right) lets you adjust accent color and location at runtime; **Reset telemetry** restores defaults from `INITIAL_PROFILE`.

---

## Deployment

The app is a static SPA after `npm run build` (`dist/` folder).

| Platform | Notes |
|----------|--------|
| **Vercel / Netlify** | Connect the repo; build command `npm run build`, output `dist` |
| **GitHub Pages** | Set `base: '/myatkaungkhant-portfolio/'` in `vite.config.ts`, then deploy `dist` |

---

## Contact

| | |
|---|---|
| **Name** | Myat Kaung Khant |
| **Role** | Junior Developer & Full Stack Developer |
| **Location** | London, East London |
| **Email** | [myatkaungkhant022@gmail.com](mailto:myatkaungkhant022@gmail.com) |
| **Phone** | [+44 777 441 4594](tel:+447774414594) |
| **GitHub** | [@mkkbun](https://github.com/mkkbun) |

---

## License

This project is open source under the [MIT License](LICENSE).

---

<p align="center">
  Built with React & Vite · © 2026 Myat Kaung Khant
</p>
