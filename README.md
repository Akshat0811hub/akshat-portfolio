# Akshat Singh — Freelance Full-Stack Developer & Designer Portfolio

An Awwwards-level, 60fps interactive portfolio and lead-generation platform built for **Akshat Singh** (`+91 9599535114` • `singhakshat875@gmail.com` • India / Worldwide).

---

## 1. Confirmed Design Direction

- **Primary Palette (Dark Editorial Default)**:
  - Obsidian Canvas: `#09090B` (`--bg-primary`)
  - Elevated Surface: `#111115` (`--bg-secondary`)
  - Primary Accent: **Electric Cyber Lime `#D4FF00`** (`--accent`)
- **Light Mode Toggle**:
  - Warm Editorial Ivory `#F7F7F2` with **Electric Royal Violet `#5B21B6`** accent for WCAG AAA contrast.
- **Typography**:
  - **Display / Headlines**: `Clash Display` (600/700, fluidly scaled with `clamp()`)
  - **Body / UI**: `Satoshi` (400/500/700)
  - **Technical Metadata / Labels**: `JetBrains Mono`

---

## 2. Project Structure

```text
akshat/
├── .env.example                     # Complete environment variable template
├── package.json                     # Workspace scripts for frontend + backend
├── README.md                        # Setup, deployment, editing & performance guide
├── backend/
│   ├── package.json
│   ├── render.yaml                  # Render one-click deployment spec
│   └── src/
│       ├── server.js                # Express entry point (Helmet, CORS, Healthcheck)
│       ├── config/db.js             # MongoDB Atlas + automatic local JSON fallback
│       ├── models/Lead.js           # Mongoose schema + unified LeadRepository
│       ├── middleware/security.js   # Rate limiter, Admin auth, Cloudflare Turnstile
│       ├── validators/contactValidator.js # Server-side Zod validation & XSS sanitizer
│       ├── services/mailer.js       # Nodemailer (owner alert + client auto-reply + Telegram)
│       └── routes/contactRoutes.js  # POST /api/contact & /api/admin/leads CRUD
└── frontend/
    ├── index.html                   # SEO meta, OpenGraph, JSON-LD Person schema
    ├── package.json
    ├── vite.config.js               # Manual chunk splitting (Three, GSAP, React)
    ├── tailwind.config.js
    ├── vercel.json                  # SPA rewrites + immutable asset cache headers
    ├── public/
    │   ├── Akshat_Singh_Resume.pdf  # Downloadable CV
    │   ├── favicon.svg
    │   ├── og-cover.svg
    │   ├── robots.txt
    │   └── sitemap.xml
    └── src/
        ├── main.jsx
        ├── App.jsx                  # Lenis + ScrollTrigger sync, routing & transitions
        ├── index.css                # Theme tokens, clamp() fluid type, reduced-motion
        ├── data/
        │   └── projects.js          # Single source of truth for all portfolio content
        └── components/
            ├── Loader.jsx           # <1.5s counter reveal for "AKSHAT SINGH"
            ├── CustomCursor.jsx     # Lerped magnetic cursor with contextual labels
            ├── MagneticButton.jsx   # Spring-physics magnetic wrapper
            ├── Navbar.jsx           # Scroll progress, active section, theme toggle
            ├── Hero.jsx             # Split headline, rotating stamp, quick stats
            ├── HeroScene3D.jsx      # Lazy-loaded Three.js morphing icosahedron + particles
            ├── MarqueeStrip.jsx     # Infinite kinetic capability ticker
            ├── About.jsx            # 3D tilt portrait, animated counters, skill cloud
            ├── Services.jsx         # 6 tilt cards + expand-on-click modal breakdown
            ├── Projects.jsx         # Filterable & horizontal scroll showcase
            ├── ProjectDetail.jsx    # Full Problem/Solution/Results case study view
            ├── Process.jsx          # Scroll-pinned 5-step execution timeline
            ├── Testimonials.jsx     # Draggable & auto-sliding client review carousel
            ├── Pricing.jsx          # Fixed / Retainer / Maintenance with USD & INR toggle
            ├── FAQ.jsx              # Smooth accessible accordion
            ├── Contact.jsx          # Validated brief form, confetti, live IST clock
            ├── Footer.jsx           # Giant kinetic name, magnetic top button
            ├── AdminDashboard.jsx   # Password-protected /admin lead manager
            ├── EasterEggModal.jsx   # Interactive particle gravity field (Shortcut: K)
            └── NotFound.jsx         # Custom 404 page
```

---

## 3. Local Setup & Run Instructions

### Step 1: Install Dependencies
```bash
cd frontend && npm install
cd ../backend && npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` to `backend/.env` (and optionally `frontend/.env`):
```bash
cp .env.example backend/.env
```
> **Zero-Config Local Persistence**: Even if you leave `MONGODB_URI` and `SMTP_PASS` blank during local testing, the backend automatically persists all leads in `backend/data/leads.json` and logs email payloads to the console.

### Step 3: Start Backend & Frontend
Open two terminals:
```bash
# Terminal 1 — Start Express API on http://localhost:5000
cd backend
npm run dev

# Terminal 2 — Start Vite React Frontend on http://localhost:5173
cd frontend
npm run dev
```
- Visit `http://localhost:5173` for the portfolio.
- Visit `http://localhost:5173/admin` (or click **Admin** in the footer) and enter `akshat-studio-admin-2026` to view captured leads.

---

## 4. Production Deployment Guide (Vercel + Render + Cloudflare CDN)

### A. Database & Email Setup
1. **MongoDB Atlas**: Create a free M0 cluster at [mongodb.com](https://www.mongodb.com/atlas), whitelist `0.0.0.0/0`, and copy your connection string into `MONGODB_URI`.
2. **Gmail App Password (Nodemailer)**:
   - Enable 2-Step Verification on `singhakshat875@gmail.com`.
   - Go to **Google Account → Security → App Passwords**, generate a 16-character password, and set it as `SMTP_PASS` in your backend environment.

### B. Deploy Backend API (Render or Railway)
1. Push this repository to GitHub (`https://github.com/Akshat0811hub`).
2. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app) pointing to the `/backend` root directory.
3. Build Command: `npm install` | Start Command: `npm start`.
4. Add environment variables from `.env.example` (`MONGODB_URI`, `SMTP_USER`, `SMTP_PASS`, `ADMIN_PASSWORD`, `FRONTEND_ORIGIN=https://akshatsingh.dev`).
5. Copy your live backend URL (e.g., `https://akshat-api.onrender.com`).

### C. Deploy Frontend (Vercel / Netlify) + Cloudflare Global CDN
1. Import the repo into [Vercel](https://vercel.com) with Root Directory set to `frontend`.
2. Set Environment Variable `VITE_API_URL=https://akshat-api.onrender.com`.
3. Click **Deploy**.
4. **Cloudflare CDN**: Add your custom domain to Cloudflare DNS, point an `A` / `CNAME` record to Vercel, enable **Brotli**, **Auto Minify**, **HTTP/3 (QUIC)**, and **Tiered Cache** for sub-50ms global edge delivery.

---

## 5. How to Add or Edit Projects, Services & Testimonials

All portfolio content lives in a single file: **`frontend/src/data/projects.js`**.

- **Add a Project**: Append a new object to `PROJECTS_DATA` with `id`, `slug`, `title`, `subtitle`, `category`, `year`, `client`, `duration`, `accentColor`, `tags`, `summary`, `problem`, `solution`, `results` (array of 4 `{ metric, label }` items), and `features`.
- **Edit Services**: Update `SERVICES_DATA` to change deliverables, timelines, or descriptions.
- **Edit Testimonials / Pricing / FAQs**: Update `TESTIMONIALS_DATA`, `PRICING_PLANS`, or `FAQ_ITEMS` in the same file.

---

## 6. Performance & Optimization Checklist

| Requirement | Implementation Details |
| :--- | :--- |
| **Code Splitting & Bundle Size** | `vite.config.js` splits `three`, `gsap`+`lenis`, and `react` into separate cached vendor chunks; `HeroScene3D` is dynamically imported via `React.lazy` + `Suspense`. |
| **Three.js 60fps Optimizations** | Pixel ratio capped at `1.75` (`1.25` on low-core devices); single-draw-call `THREE.InstancedMesh` for particles; low-poly icosahedron geometry; zero expensive shadow maps. |
| **Off-Screen & Tab-Hidden Pause** | `HeroScene3D.jsx` uses `IntersectionObserver` and `document.visibilitychange` to pause WebGL rendering whenever scrolled out of view or when the tab is inactive, plus full `.dispose()` cleanup on unmount. |
| **GPU-Only CSS/GSAP Animations** | Animations exclusively target `transform` (`translate3d`, `scale`, `rotate`) and `opacity` to prevent layout thrashing. |
| **Reduced Motion & Touch Support** | `prefers-reduced-motion: reduce` bypasses heavy animations and loader delays; `CustomCursor` and magnetic tilt disable automatically on `(pointer: coarse)` touch screens. |
| **SEO & Structured Data** | Semantic HTML5landmarks, Open Graph + Twitter cards, JSON-LD `Person` and `ProfessionalService` schemas, `robots.txt`, `sitemap.xml`, and custom 404 view. |
