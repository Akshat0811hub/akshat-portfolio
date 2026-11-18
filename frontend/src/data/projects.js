/**
 * CENTRAL CONTENT & PORTFOLIO DATA FILE
 * Edit this single file to add/update projects, services, testimonials, FAQs, or contact details.
 */

export const OWNER_INFO = {
  name: 'Akshat Singh',
  role: 'Freelance Full-Stack Developer & Designer',
  tagline:
    'Architecting Awwwards-caliber websites, custom CRM platforms, and scalable digital products that turn ambitious brands into category leaders.',
  location: 'New Delhi / NCR, India — Working Worldwide',
  timezone: 'Asia/Kolkata',
  phone: '+91 9599535114',
  phoneRaw: '+919599535114',
  whatsappUrl:
    'https://wa.me/919599535114?text=Hi%20Akshat%2C%20I%20visited%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project!',
  email: 'singhakshat875@gmail.com',
  github: 'https://github.com/Akshat0811hub',
  instagram: 'https://www.instagram.com/__.akshatt/',
  resumeUrl: '/Akshat_Singh_Resume.pdf',
  availability: 'Available for select Q4 / Q1 projects worldwide',
  stats: [
    { label: 'Projects Delivered', value: 48, suffix: '+' },
    { label: 'Global Clients', value: 32, suffix: '+' },
    { label: 'Years Crafting Code', value: 4, suffix: '+' },
    { label: 'On-Time Delivery Rate', value: 99, suffix: '%' },
  ],
};

export const MARQUEE_ITEMS = [
  'Website Design & Development',
  'Custom CRM Architecture',
  'Full-Stack Web Applications',
  'Interactive 3D & WebGL',
  'Brand Identity Systems',
  'Product Redesign & CRO',
  'React • Next.js • Node.js • Three.js • GSAP',
  '24/7 SLA Maintenance & Scaling',
];

export const SKILLS_CLOUD = [
  { name: 'React & Next.js', category: 'Frontend', level: 'Expert' },
  { name: 'Three.js / WebGL / GLSL', category: 'Creative', level: 'Advanced' },
  { name: 'GSAP & ScrollTrigger', category: 'Creative', level: 'Expert' },
  { name: 'TypeScript / ES2025', category: 'Frontend', level: 'Expert' },
  { name: 'Tailwind CSS & Design Tokens', category: 'Frontend', level: 'Expert' },
  { name: 'Node.js & Express', category: 'Backend', level: 'Expert' },
  { name: 'MongoDB Atlas & PostgreSQL', category: 'Backend', level: 'Advanced' },
  { name: 'Custom CRM Pipelines', category: 'Architecture', level: 'Expert' },
  { name: 'REST & GraphQL APIs', category: 'Backend', level: 'Expert' },
  { name: 'Figma & Interactive Prototyping', category: 'Design', level: 'Expert' },
  { name: 'Design Systems & Branding', category: 'Design', level: 'Advanced' },
  { name: 'Redis, Queues & Webhooks', category: 'Architecture', level: 'Advanced' },
  { name: 'Cloudflare CDN / Vercel / Docker', category: 'DevOps', level: 'Advanced' },
  { name: 'Core Web Vitals (95+ Lighthouse)', category: 'Architecture', level: 'Expert' },
];

export const SERVICES_DATA = [
  {
    id: 'websites',
    number: '01',
    title: 'Website Design & Development',
    shortDesc:
      'Editorial, motion-rich marketing sites and flagship web experiences engineered for 60fps fluidity and maximum conversion.',
    timeline: '2 – 5 Weeks',
    idealFor: 'Startups, Agencies, SaaS & Luxury Brands',
    deliverables: [
      'Bespoke UI/UX wireframes & high-fidelity Figma prototypes',
      'Custom Three.js / WebGL & GSAP ScrollTrigger choreography',
      'Mobile-first responsive layout (320px to 4K displays)',
      'Technical SEO, Schema.org JSON-LD, OpenGraph & 95+ Lighthouse score',
      'Headless CMS integration or zero-bloat custom codebase',
    ],
    architectureNote:
      'Built with Vite/Next.js, GPU-accelerated transforms, edge caching via Cloudflare, and strict bundle splitting under 150KB initial JS.',
  },
  {
    id: 'crm',
    number: '02',
    title: 'Custom CRM Systems',
    shortDesc:
      'Tailor-made internal CRMs, lead pipelines, role-based dashboards, and automated follow-up engines with zero per-seat SaaS tax.',
    timeline: '4 – 8 Weeks',
    idealFor: 'Real Estate, FinTech, High-Ticket Sales & Operations Teams',
    deliverables: [
      'Multi-stage Kanban & tabular deal pipelines with real-time filters',
      'Role-Based Access Control (Admin, Manager, Sales Rep, Client Portal)',
      'Automated WhatsApp, Email & Webhook triggers on lead stage shifts',
      'Custom analytics, revenue forecasting & CSV/PDF reporting',
      'Audit logs, encrypted credentials & automated cloud backups',
    ],
    architectureNote:
      'Engineered with Node.js, MongoDB/PostgreSQL, indexed aggregation pipelines, and sub-50ms query responses.',
  },
  {
    id: 'software',
    number: '03',
    title: 'Custom Software & Web Apps',
    shortDesc:
      'Full-stack SaaS products, booking engines, client portals, and AI-integrated web applications built to scale from day one.',
    timeline: '4 – 10 Weeks',
    idealFor: 'Founders launching MVPs or enterprises automating workflows',
    deliverables: [
      'End-to-end system architecture, database schema & API design',
      'Secure authentication (OAuth2, JWT, Magic Links, 2FA)',
      'Stripe / Razorpay subscription & multi-currency checkout flows',
      'Real-time WebSockets notifications & background job queues',
      'Comprehensive API documentation & automated CI/CD deployment',
    ],
    architectureNote:
      'Modular monorepo structure with strict Zod validation, rate-limiting, Helmet security headers, and horizontal scalability.',
  },
  {
    id: 'branding',
    number: '04',
    title: 'Branding & Identity',
    shortDesc:
      'Distinctive visual identities, typographic systems, and multi-theme design tokens that make your product unmistakably yours.',
    timeline: '2 – 4 Weeks',
    idealFor: 'New ventures & companies repositioning for premium markets',
    deliverables: [
      'Logo suite, monogram marks & responsive vector assets',
      'Editorial typography pairing & color psychology palette',
      'Figma component library with dark/light mode design tokens',
      'Social media templates, pitch deck master slides & brand book',
      'Motion guidelines for micro-interactions and brand reveals',
    ],
    architectureNote:
      'Delivered as both a comprehensive brand manual and production-ready CSS/Tailwind token variables.',
  },
  {
    id: 'redesign',
    number: '05',
    title: 'Product Redesign & Changes',
    shortDesc:
      'Transform legacy interfaces into intuitive, fast, modern products. Deep UX audits, conversion uplift, and codebase modernization.',
    timeline: '1 – 4 Weeks',
    idealFor: 'Existing SaaS & web apps suffering from drop-offs or slow speed',
    deliverables: [
      'Heuristic UX/UI audit & funnel bottleneck teardown',
      'Refactored component hierarchy & frictionless user flows',
      'Core Web Vitals remediation (LCP, INP, CLS optimization)',
      'Feature additions, API integrations & legacy bug elimination',
      'Zero-downtime incremental rollout strategy',
    ],
    architectureNote:
      'Measurable before/after telemetry comparing load times, bounce rates, and task completion speed.',
  },
  {
    id: 'maintenance',
    number: '06',
    title: 'Maintenance & Support',
    shortDesc:
      'Peace-of-mind ongoing engineering partner: uptime monitoring, security patching, weekly feature sprints, and priority bug fixes.',
    timeline: 'Monthly Retainer / SLA',
    idealFor: 'Growing businesses without a dedicated in-house dev team',
    deliverables: [
      '24/7 uptime monitoring, SSL & CDN cache management',
      'Dependency upgrades, security audits & automated DB backups',
      'Monthly bank of dedicated hours for new features & UI tweaks',
      'Monthly Core Web Vitals & SEO health reports',
      'Direct WhatsApp & Slack channel with guaranteed response SLA',
    ],
    architectureNote:
      'Proactive health checks prevent downtime before your customers ever notice an issue.',
  },
];

export const PROJECTS_DATA = [
  {
    id: 'nexus-flow-crm',
    slug: 'nexus-flow-crm',
    number: '01',
    title: 'NexusFlow Enterprise CRM',
    subtitle: 'Custom Multi-Tenant Sales & Operations Engine',
    category: 'Custom CRM',
    year: '2026',
    client: 'Nexus Logistics & Advisory (UAE / India)',
    duration: '6 Weeks',
    liveUrl: 'https://github.com/Akshat0811hub',
    githubUrl: 'https://github.com/Akshat0811hub',
    accentColor: '#d4ff00',
    palette: ['#09090b', '#131810', '#d4ff00'],
    tags: ['React 19', 'Node.js', 'MongoDB Atlas', 'WebSockets', 'WhatsApp API'],
    summary:
      'Replaced a $4,200/month fragmented spreadsheet and off-the-shelf CRM setup with a bespoke high-speed deal pipeline, automated WhatsApp follow-ups, and real-time executive telemetry.',
    problem:
      'The client’s 45-person sales and operations team was losing nearly 28% of inbound leads due to slow manual handoffs across three disconnected tools, slow page loads on mobile field devices, and rigid SaaS per-seat licensing costs.',
    solution:
      'Designed and engineered a custom full-stack CRM tailored to their exact 7-stage deal workflow. Built an optimistic-UI Kanban board, automated WhatsApp/email sequences triggered on status changes, granular role-based permissions, and one-click invoice generation.',
    results: [
      { metric: '+64%', label: 'Lead-to-Close Velocity' },
      { metric: '$50k/yr', label: 'Saved in SaaS Licensing' },
      { metric: '120ms', label: 'Avg Pipeline Query Speed' },
      { metric: '99.98%', label: 'Production Uptime' },
    ],
    features: [
      'Drag-and-drop multi-currency deal pipeline with instant search across 100k+ records',
      'Automated WhatsApp & Nodemailer templates with read-receipt tracking',
      'Custom territory assignment & live sales leaderboard',
      'Exportable boardroom-ready PDF & CSV cohort analytics',
    ],
  },
  {
    id: 'aether-protocol-3d',
    slug: 'aether-protocol-3d',
    number: '02',
    title: 'Aether AI Cloud Platform',
    subtitle: 'Interactive 3D Flagship Web Experience & Brand Identity',
    category: 'Websites & 3D',
    year: '2026',
    client: 'Aether Compute Labs (San Francisco, Remote)',
    duration: '4 Weeks',
    liveUrl: 'https://github.com/Akshat0811hub',
    githubUrl: 'https://github.com/Akshat0811hub',
    accentColor: '#38bdf8',
    palette: ['#070b14', '#0e1b2e', '#38bdf8'],
    tags: ['Three.js', 'GSAP ScrollTrigger', 'React', 'GLSL Shaders', 'Tailwind'],
    summary:
      'An Awwwards-inspired interactive product launch website featuring a GPU-instanced 3D compute cluster that morphs as the user scrolls through benchmarks and pricing.',
    problem:
      'Aether Compute needed to stand out in a crowded AI infrastructure market before their Series A raise. Their previous static landing page had a 76% bounce rate and failed to communicate their low-latency architecture.',
    solution:
      'Created a dark editorial design system paired with a custom Three.js instanced mesh scene capped at 1.5 DPR for 60fps mobile performance. Choreographed scroll-pinned storytelling, interactive latency calculators, and instant documentation search.',
    results: [
      { metric: '3.4x', label: 'Demo Request Conversion' },
      { metric: '96 / 100', label: 'Mobile Lighthouse Score' },
      { metric: '+140%', label: 'Avg Session Duration' },
      { metric: '1.1s', label: 'First Contentful Paint' },
    ],
    features: [
      'Scroll-driven Three.js camera choreography with custom Fresnel shader',
      'Interactive GPU pricing estimator with real-time competitor comparison',
      'Self-hosted variable typography & hardware-tier adaptive WebGL fallback',
      'Full keyboard accessibility & prefers-reduced-motion compliance',
    ],
  },
  {
    id: 'velora-commerce-suite',
    slug: 'velora-commerce-suite',
    number: '03',
    title: 'Velora Atelier Luxury Storefront',
    subtitle: 'Headless Commerce, Brand Identity & 3D Lookbook',
    category: 'Branding & Web',
    year: '2025',
    client: 'Velora Studio (Milan / Mumbai)',
    duration: '5 Weeks',
    liveUrl: 'https://github.com/Akshat0811hub',
    githubUrl: 'https://github.com/Akshat0811hub',
    accentColor: '#f43f5e',
    palette: ['#12080c', '#241018', '#f43f5e'],
    tags: ['React', 'GSAP Flip', 'Node.js API', 'Stripe / Razorpay', 'Brand Identity'],
    summary:
      'Complete visual rebrand and headless editorial storefront with fluid FLIP layout transitions, sub-second page prefetches, and multi-currency checkout.',
    problem:
      'Velora’s template-based store suffered from 4.8-second mobile load times and a generic visual presentation that diluted their high-fashion positioning.',
    solution:
      'Crafted an asymmetric editorial grid, custom monogram identity, and a bespoke React storefront with GSAP Flip transitions between grid and editorial lookbook views, backed by an Express + Redis inventory microservice.',
    results: [
      { metric: '+82%', label: 'Mobile Checkout Completion' },
      { metric: '0.9s', label: 'Page Transition Speed' },
      { metric: '+49%', label: 'Average Order Value' },
      { metric: '100', label: 'SEO & Best Practices Score' },
    ],
    features: [
      'Seamless GSAP Flip view-switching between Minimal Grid and Runway Editorial mode',
      'Auto-detected multi-currency pricing (USD, EUR, INR, AED)',
      'Custom size-fit advisor & instant slide-over bag with upsell logic',
      'Complete Figma design system with 60+ documented components',
    ],
  },
  {
    id: 'pulsemed-patient-os',
    slug: 'pulsemed-patient-os',
    number: '04',
    title: 'PulseMed Clinic & Patient OS',
    subtitle: 'Custom Web Application & Product Redesign',
    category: 'Web Apps',
    year: '2025',
    client: 'PulseMed Diagnostics Network',
    duration: '7 Weeks',
    liveUrl: 'https://github.com/Akshat0811hub',
    githubUrl: 'https://github.com/Akshat0811hub',
    accentColor: '#a855f7',
    palette: ['#0d0914', '#1b112c', '#a855f7'],
    tags: ['Full-Stack Web App', 'Express', 'MongoDB', 'Role Auth', 'UX Redesign'],
    summary:
      'End-to-end product redesign and full-stack portal connecting 18 diagnostic centers, doctors, and 40,000+ patients with instant smart-report delivery.',
    problem:
      'Patients struggled to download lab reports on mobile phones, and clinic receptionists spent 3 hours daily manually messaging appointment reminders.',
    solution:
      'Redesigned the entire patient and clinician experience with WCAG AAA contrast, one-tap OTP login, automated WhatsApp report dispatch, and an interactive biomarker trend visualizer.',
    results: [
      { metric: '-78%', label: 'Support Call Volume' },
      { metric: '4.9 ★', label: 'Patient Portal Rating' },
      { metric: '42,000+', label: 'Active Monthly Users' },
      { metric: '3 hrs/day', label: 'Saved per Clinic Desk' },
    ],
    features: [
      'Interactive longitudinal health chart comparing historical lab biomarkers',
      'Doctor prescription pad with instant PDF generation & QR verification',
      'Automated appointment booking & WhatsApp reminder queue',
      'HIPAA-aligned encryption at rest and role-scoped API middleware',
    ],
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    phase: 'Discover & Architect',
    duration: 'Days 1 – 4',
    title: 'Deep business immersion, technical scoping & conversion roadmap.',
    description:
      'We start by dissecting your business goals, target audience, bottlenecks, and technical requirements. You receive a crystal-clear system architecture blueprint, wireframe flow, and fixed milestone schedule before a single line of code is written.',
    outputs: ['Product Requirements Doc', 'System & DB Architecture', 'Interactive Wireframes'],
  },
  {
    step: '02',
    phase: 'Design & Motion Direction',
    duration: 'Week 1 – 2',
    title: 'High-contrast editorial UI, interactive prototypes & motion language.',
    description:
      'Every screen, micro-interaction, and 3D/motion cue is crafted in Figma and browser prototypes. We establish typography scales, dark/light tokens, and bespoke visual assets that set your brand apart from template competitors.',
    outputs: ['High-Fidelity Figma UI', 'Design Token System', 'WebGL / Motion Prototypes'],
  },
  {
    step: '03',
    phase: 'Full-Stack Engineering',
    duration: 'Week 2 – 5',
    title: 'Clean, modular frontend & hardened backend APIs built for speed.',
    description:
      'Using React, Three.js, GSAP, Node.js, and MongoDB/PostgreSQL, I build your product with obsessive attention to 60fps smoothness, security (Helmet, rate-limiting, Zod validation), and mobile responsiveness.',
    outputs: ['Production Frontend & API', 'Custom CRM / Database Setup', 'Automated Staging Previews'],
  },
  {
    step: '04',
    phase: 'Polish, Audit & Launch',
    duration: 'Final Week',
    title: '90+ Lighthouse verification, SEO hardening & global CDN deployment.',
    description:
      'Every page undergoes rigorous cross-device QA, accessibility verification, Core Web Vitals profiling, and security testing before deploying on Vercel/Render behind Cloudflare’s global edge network.',
    outputs: ['90+ Lighthouse Audit', 'Global CDN & SSL Setup', 'Full Source Code Handover'],
  },
  {
    step: '05',
    phase: 'Support & Scale',
    duration: 'Ongoing Partnership',
    title: 'Proactive monitoring, rapid iterations & long-term growth.',
    description:
      'Products evolve after launch. Whether through a monthly retainer or maintenance SLA, I stay in your corner to ship new features, optimize conversion funnels, and keep your stack lightning-fast.',
    outputs: ['24/7 Uptime & Backups', 'Priority Feature Sprints', 'Direct WhatsApp Access'],
  },
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote:
      'Akshat built our custom CRM from scratch in 5 weeks. Our sales team went from juggling four spreadsheets to closing deals 60% faster. His combination of backend architecture and UI polish is rare.',
    author: 'Rohan Malhotra',
    role: 'Managing Director, Nexus Advisory',
    location: 'Dubai & Gurugram',
    projectType: 'Custom CRM System',
  },
  {
    id: 2,
    quote:
      'We hired Akshat to redesign our AI platform website before our seed round. Investors specifically complimented the interactive 3D hero and how fast the site loaded on mobile. Worth every penny.',
    author: 'Elena Rostova',
    role: 'Co-Founder, Aether Compute',
    location: 'San Francisco, USA',
    projectType: '3D Website & Branding',
  },
  {
    id: 3,
    quote:
      'Communication was effortless despite the timezone difference. Akshat delivered ahead of schedule, documented every API endpoint, and our Lighthouse performance jumped from 54 to 97.',
    author: 'Marcus Vance',
    role: 'Head of Product, Velora Atelier',
    location: 'London, UK',
    projectType: 'Product Redesign & Web App',
  },
  {
    id: 4,
    quote:
      'Having one person who can design a luxury brand identity in Figma and then code the entire Node.js + React web app saved us months of agency back-and-forth. He is now our go-to technical partner.',
    author: 'Dr. Ananya Sharma',
    role: 'Operations Lead, PulseMed Network',
    location: 'New Delhi, India',
    projectType: 'Full-Stack Web Application',
  },
];

export const PRICING_PLANS = [
  {
    id: 'fixed',
    name: 'Fixed-Scope Project',
    badge: 'Most Popular',
    featured: true,
    priceUSD: '$1,200 – $4,500',
    priceINR: '₹85,000 – ₹3,50,000',
    billing: 'Milestone-based (40% / 30% / 30%)',
    description:
      'Ideal for complete websites, custom CRM systems, MVP web apps, or brand identity overhauls with clearly defined deliverables.',
    features: [
      'Complete UI/UX design + full-stack development',
      'Custom Three.js / GSAP animations & mobile optimization',
      'Database setup, API integration & admin dashboard',
      'Technical SEO, 90+ Lighthouse guarantee & deployment',
      '30 days of complimentary post-launch support',
    ],
    ctaLabel: 'Start Fixed Project',
    defaultService: 'Website Design & Development',
  },
  {
    id: 'retainer',
    name: 'Dedicated Product Partner',
    badge: 'High Velocity',
    featured: false,
    priceUSD: '$1,800 / mo',
    priceINR: '₹1,40,000 / mo',
    billing: 'Monthly retainer • Pause or cancel anytime',
    description:
      'For funded startups and growing teams needing continuous feature development, UX upgrades, and senior full-stack velocity.',
    features: [
      'Up to 80 hours/month of senior design + engineering',
      'Weekly sprint deliveries & async Loom updates',
      'Priority requests across web apps, CRMs & landing pages',
      'Direct WhatsApp & Slack access with same-day response',
      'Zero hiring overhead or long-term lock-in contracts',
    ],
    ctaLabel: 'Book Monthly Retainer',
    defaultService: 'Custom Software & Web Apps',
  },
  {
    id: 'maintenance',
    name: 'Care, Security & SLA Plan',
    badge: 'Peace of Mind',
    featured: false,
    priceUSD: '$290 / mo',
    priceINR: '₹22,000 / mo',
    billing: 'Billed monthly or annually (15% off)',
    description:
      'Keep your production website, CRM, or web app secure, backed up, and performing at peak Core Web Vitals scores year-round.',
    features: [
      '24/7 uptime monitoring, SSL & Cloudflare CDN tuning',
      'Weekly automated database backups & security patching',
      'Up to 8 hours/month of content edits or UI improvements',
      'Monthly performance, SEO & conversion health report',
      'Emergency bug-fix SLA within 6 hours',
    ],
    ctaLabel: 'Secure Maintenance Plan',
    defaultService: 'Maintenance & Support',
  },
];

export const FAQ_ITEMS = [
  {
    q: 'Do you handle both UI/UX design and full-stack development yourself?',
    a: 'Yes. I work end-to-end—from initial product strategy, Figma wireframes, and brand systems to React/Three.js frontend animations and Node.js/MongoDB backend architecture. This eliminates handoff gaps between designers and developers and cuts delivery time nearly in half.',
  },
  {
    q: 'How do we collaborate if I am based in the US, Europe, UAE, or Australia?',
    a: 'I work with clients worldwide from India (IST / UTC+5:30) with generous overlap across European, Middle Eastern, US morning, and APAC business hours. We communicate via WhatsApp, Slack, Email, and weekly video calls, plus you get a live staging URL from Week 1 to track progress 24/7.',
  },
  {
    q: 'Can you build a custom CRM tailored to our exact sales or operations workflow?',
    a: 'Absolutely—custom CRMs are one of my core specialties. Unlike rigid platforms that charge hefty per-user fees, I build fast, role-based CRM systems that you own 100%, complete with custom deal stages, WhatsApp/email automation, analytics, and zero recurring licensing fees.',
  },
  {
    q: 'Will the 3D visuals and GSAP animations slow down my website on mobile phones?',
    a: 'Never. Performance is non-negotiable. I lazy-load WebGL scenes, cap device pixel ratios, pause rendering when off-screen via IntersectionObserver, and automatically adapt particle counts to the device GPU so your site hits 90+ Lighthouse scores and feels effortless on mobile.',
  },
  {
    q: 'What happens after the project launches? Do I own the source code?',
    a: 'Upon final milestone completion, you receive 100% ownership of the source code, GitHub repositories, Figma design files, and cloud credentials. I also include 30 days of free post-launch bug support and offer optional monthly maintenance plans.',
  },
  {
    q: 'How quickly can we start, and what are the payment terms?',
    a: 'Most projects kick off within 3–5 business days of signing the scope proposal. Fixed-price projects typically split into three milestones: 40% kickoff deposit, 30% upon interactive staging approval, and 30% upon production launch.',
  },
];

export const BUDGET_RANGES = [
  'Under $1,000 (₹80k)',
  '$1,000 – $2,500 (₹80k – ₹2L)',
  '$2,500 – $5,000 (₹2L – ₹4L)',
  '$5,000+ (₹4L+)',
  'Monthly Retainer / Not sure yet',
];
