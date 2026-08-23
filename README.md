# Reymund Abelgas — Portfolio

Personal portfolio site for a full-stack software developer based in Mati City, Philippines. Showcases featured projects, work experience, skills, and contact details in a responsive, theme-aware layout.

## Features

- Hero section with downloadable resume and in-browser preview
- Featured projects with stack breakdowns and live demo links
- Work experience and education timeline
- Skills overview and about section
- Contact links (email, LinkedIn, phone)
- Dark/light theme toggle
- Animated UI with Framer Motion
- Vercel Analytics and Speed Insights

## Stack

- **Framework:** Next.js 16, React 19, TypeScript
- **Styling:** Tailwind CSS 4, shadcn/ui
- **Animation:** Framer Motion
- **Theming:** next-themes
- **Icons:** Lucide React, Hugeicons, React Icons

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Other scripts

```bash
npm run build   # Production build
npm run lint    # Run ESLint
```

## Project Structure

```
app/              # Next.js App Router pages and layout
components/       # UI sections (hero, projects, experience, etc.)
lib/              # Portfolio data and utilities
public/           # Static assets (images, resume, documents)
```

Portfolio content (bio, projects, experience, skills) lives in `lib/portfolio-data.ts`.

## Deploy

This project is set up for deployment on [Vercel](https://vercel.com). Connect the repository and deploy — no extra configuration required.

## License

Private — all rights reserved.
