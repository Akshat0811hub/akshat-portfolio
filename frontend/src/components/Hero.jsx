import React, { Suspense, lazy } from 'react';
import { ArrowUpRight, ArrowDown, Globe, Sparkles, CheckCircle2 } from 'lucide-react';
import { OWNER_INFO } from '../data/projects';
import MagneticButton from './MagneticButton';

const HeroScene3D = lazy(() => import('./HeroScene3D'));

export default function Hero({ theme, onNavigateSection }) {
  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24 flex flex-col justify-between bg-noise"
    >
      {/* Ambient Radial Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/4 right-10 h-96 w-96 rounded-full bg-accent/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-10 left-10 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]"
      />

      {/* Lazy-Loaded Interactive Three.js 3D Scene */}
      <Suspense
        fallback={
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20"
          >
            <div className="h-72 w-72 rounded-full border border-accent/40 animate-pulse" />
          </div>
        }
      >
        <HeroScene3D theme={theme} />
      </Suspense>

      {/* Foreground Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-8 my-auto">
        {/* Status & Location Pill */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary/90 px-4 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-medium text-text-primary">
              {OWNER_INFO.availability}
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-secondary/60 px-3.5 py-1.5 font-mono text-xs text-text-secondary backdrop-blur-md">
            <Globe className="h-3.5 w-3.5 text-accent" />
            <span>Based in India • Remote Worldwide</span>
          </div>
        </div>

        {/* Giant Editorial Headline */}
        <div className="max-w-5xl">
          <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.22em] text-accent mb-3">
            {OWNER_INFO.role}
          </p>
          <h1 className="heading-hero text-text-primary uppercase">
            <span className="block">AKSHAT SINGH</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary to-accent">
              DIGITAL ARCHITECT<span className="text-accent">.</span>
            </span>
          </h1>
        </div>

        {/* Asymmetric Sub-Grid: Tagline + CTA Buttons + Rotating Badge */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7 space-y-6">
            <p className="max-w-2xl text-base sm:text-xl text-text-secondary leading-relaxed">
              {OWNER_INFO.tagline} From{' '}
              <span className="text-text-primary font-medium">interactive 3D websites</span> and{' '}
              <span className="text-text-primary font-medium">custom CRM pipelines</span> to{' '}
              <span className="text-text-primary font-medium">scalable web apps</span> &amp;{' '}
              <span className="text-text-primary font-medium">brand identities</span>.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton
                type="button"
                cursorLabel="Let's Go"
                onClick={() => onNavigateSection('contact')}
                className="group inline-flex items-center gap-3 rounded-full bg-accent px-7 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent-hover"
              >
                <span>Let&apos;s Work Together</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/15 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </MagneticButton>

              <MagneticButton
                type="button"
                cursorLabel="Explore"
                onClick={() => onNavigateSection('projects')}
                className="inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-bg-secondary/85 px-7 py-4 text-sm font-semibold uppercase tracking-wider text-text-primary backdrop-blur-md transition hover:border-accent hover:text-accent"
              >
                <span>View Work</span>
                <ArrowDown className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Right Column: Trust Highlights & Rotating Studio Stamp */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:justify-end items-start sm:items-center gap-6">
            <div className="rounded-2xl border border-border-subtle bg-bg-secondary/80 p-5 backdrop-blur-xl max-w-xs">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Full-Lifecycle Delivery</span>
              </div>
              <ul className="space-y-1.5 text-xs text-text-secondary">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>90+ Mobile Lighthouse &amp; 60fps Motion</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>100% Custom Code — Zero Bloated Templates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                  <span>Direct Founder Collaboration</span>
                </li>
              </ul>
            </div>

            {/* Auto-rotating SVG Studio Badge */}
            <button
              type="button"
              onClick={() => onNavigateSection('contact')}
              aria-label="Scroll to Contact section"
              className="relative hidden sm:flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary/90 backdrop-blur-md group"
            >
              <svg
                viewBox="0 0 100 100"
                className="h-24 w-24 animate-spin-slow text-text-secondary"
              >
                <path
                  id="circlePath"
                  fill="none"
                  d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                />
                <text className="fill-current font-mono text-[8.3px] uppercase tracking-[0.22em]">
                  <textPath href="#circlePath">
                    • AKSHAT SINGH • FULL-STACK &amp; DESIGN
                  </textPath>
                </text>
              </svg>
              <span className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Quick-Stats Bar */}
      <div className="relative z-10 mx-auto mt-12 w-full max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border-subtle bg-bg-secondary/60 p-4 sm:grid-cols-4 sm:p-6 backdrop-blur-xl">
          {OWNER_INFO.stats.map((stat) => (
            <div key={stat.label} className="border-l border-border-subtle pl-4 first:border-l-0 first:pl-0">
              <div className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
