# COSMÉTICA — Prestige Beauty Agency Website

A full-stack Next.js clone inspired by ogakidigital.com, built for a cosmetic product brand with complete authentication, user dashboard, and admin panel.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Animations**: Framer Motion
- **Styling**: Tailwind CSS + inline styles
- **State**: Zustand (with persist)
- **Icons**: Lucide React
- **Containerization**: Docker + Docker Compose + Nginx

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, marquee, awards, services grid, case studies |
| `/about` | About page — mission, quote, principles, news |
| `/services` | Services overview — all 5 services listed |
| `/services/organic-social` | Service detail page |
| `/expertise` | Beauty categories, stats, CTA |
| `/work/case-studies` | Filterable case study grid |
| `/work/portfolio` | Masonry image portfolio |
| `/blog` | Featured post + grid |
| `/contact` | Contact form |
| `/login` | Login with split layout |
| `/signup` | Signup with split layout |
| `/dashboard` | User dashboard (protected) |
| `/admin` | Admin dashboard with tables + modal (protected) |
| `/privacy` | Privacy policy |
| `/terms` | Terms & conditions |

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@cosmetica.com | admin123 |
| User | jane@example.com | password123 |

## Design System

| Token | Value |
|-------|-------|
| Black | `#0a0a0a` |
| White | `#fafaf8` |
| Cream | `#f5f2ec` |
| Light Gray | `#ebebeb` |
| Mid Gray | `#9b9b9b` |
| Display Font | Cormorant Garamond |
| Label Font | Montserrat |
| Body Font | DM Sans |

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Docker

```bash
# Build and start
docker-compose up --build -d

# Stop
docker-compose down

# View logs
docker-compose logs -f cosmetica
```

## Production Build

```bash
npm run build
npm start
```

## Key Features

- ✅ Exact design system from ogakidigital.com (colors, fonts, spacing)
- ✅ Transparent → frosted glass navbar on scroll
- ✅ Animated dropdown menus with hover states
- ✅ Full-screen mobile overlay menu
- ✅ Marquee ticker strip
- ✅ Hover zoom on all images
- ✅ Scroll-triggered fade-up animations throughout
- ✅ Custom cursor (dot + ring)
- ✅ Case study hover overlays
- ✅ Filterable portfolio grid
- ✅ Auth (login/signup/logout) with Zustand persist
- ✅ Role-based routing (user → /dashboard, admin → /admin)
- ✅ User dashboard with metrics, activity, saved articles
- ✅ Admin panel with users table, campaigns table, CRUD modal
- ✅ Newsletter subscription in footer
- ✅ Contact form with success state
- ✅ Docker multi-stage build (optimized production image)
- ✅ Nginx reverse proxy config
