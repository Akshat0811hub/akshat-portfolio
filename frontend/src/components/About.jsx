import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Cpu, Layers, MapPin, Sparkles, Terminal } from 'lucide-react';
import { OWNER_INFO, SKILLS_CLOUD } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = ['All', 'Frontend', 'Creative', 'Backend', 'Architecture', 'Design'];

export default function About() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [counts, setCounts] = useState(OWNER_INFO.stats.map(() => 0));
  const [imgTilt, setImgTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split-line reveal
      gsap.fromTo(
        '.about-reveal-line',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 78%',
          },
        }
      );

      // Animated counters triggered on scroll
      ScrollTrigger.create({
        trigger: '.about-counters-grid',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          OWNER_INFO.stats.forEach((stat, idx) => {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.value,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: () => {
                setCounts((prev) => {
                  const next = [...prev];
                  next[idx] = Math.round(obj.val);
                  return next;
                });
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredSkills =
    activeCategory === 'All'
      ? SKILLS_CLOUD
      : SKILLS_CLOUD.filter((s) => s.category === activeCategory);

  const handlePortraitMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setImgTilt({
      rx: (0.5 - py) * 14,
      ry: (px - 0.5) * 14,
      gx: px * 100,
      gy: py * 100,
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-b border-border-subtle"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Eyebrow */}
        <div className="mb-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              // 01 — About &amp; Philosophy
            </span>
          </div>
          <span className="hidden sm:inline-block font-mono text-xs text-text-muted">
            DESIGN × FULL-STACK ENGINEERING
          </span>
        </div>

        {/* Main Asymmetric Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left: Interactive Distortion Portrait Card */}
          <div className="lg:col-span-5">
            <div
              onMouseMove={handlePortraitMove}
              onMouseLeave={() => setImgTilt({ rx: 0, ry: 0, gx: 50, gy: 50 })}
              data-cursor="Distort"
              style={{
                transform: `perspective(1000px) rotateX(${imgTilt.rx.toFixed(
                  2
                )}deg) rotateY(${imgTilt.ry.toFixed(2)}deg)`,
                transition: 'transform 0.25s ease-out',
              }}
              className="group relative overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary p-6 sm:p-8 shadow-2xl"
            >
              {/* SVG Turbulence Filter for Liquid Hover Distortion */}
              <svg className="sr-only" aria-hidden="true">
                <filter id="akshat-liquid-filter">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.015 0.03"
                    numOctaves="2"
                    result="noise"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="noise"
                    scale="10"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                </filter>
              </svg>

              {/* Dynamic Spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(380px circle at ${imgTilt.gx}% ${imgTilt.gy}%, var(--card-glow), transparent 70%)`,
                }}
              />

              {/* Generative Editorial Portrait Artwork */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#0d0d12] border border-white/10 flex flex-col justify-between p-6">
                <div className="flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
                    <MapPin className="h-3 w-3 text-[#d4ff00]" />
                    India • Global
                  </span>
                  <span className="font-mono text-xs text-[#d4ff00]">ID // AS-2026</span>
                </div>

                {/* Stylized Geometric Avatar Vector with Hover Filter */}
                <div className="my-auto flex flex-col items-center justify-center text-center z-10 transition-transform duration-500 group-hover:scale-105">
                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-2 border-[#d4ff00]/50 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black shadow-inner">
                    <span className="font-display text-5xl font-bold tracking-tighter text-white">
                      AS<span className="text-[#d4ff00]">.</span>
                    </span>
                    <div className="absolute -inset-3 rounded-full border border-dashed border-[#d4ff00]/30 animate-spin-slow" />
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-white">
                    Akshat Singh
                  </h3>
                  <p className="font-mono text-xs text-zinc-400 mt-1">
                    Full-Stack Engineer &amp; UI/UX Designer
                  </p>
                </div>

                {/* Code Signature Footer inside Portrait */}
                <div className="relative z-10 rounded-xl bg-black/60 border border-white/10 p-3 font-mono text-[11px] text-zinc-300 backdrop-blur-md">
                  <div className="flex items-center justify-between text-[#d4ff00]">
                    <span>const craft = &quot;Zero Compromise&quot;;</span>
                    <Terminal className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-zinc-400 mt-1">
                    stack: [&apos;React&apos;, &apos;Three.js&apos;, &apos;Node&apos;, &apos;CRM&apos;]
                  </div>
                </div>

                {/* Decorative Grid Mesh */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,255,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,255,0,0.05)_1px,transparent_1px)] bg-[size:32px_32px]"
                />
              </div>

              <div className="mt-5 flex items-center justify-between text-xs text-text-secondary">
                <span className="font-mono">HOVER CARD FOR 3D PERSPECTIVE</span>
                <span className="font-mono text-accent font-semibold">UTC+5:30 IST</span>
              </div>
            </div>
          </div>

          {/* Right: Split-Text Story + Counters */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="about-reveal-line heading-section text-text-primary">
              One mind for{' '}
              <span className="text-accent underline decoration-accent/30 underline-offset-8">
                design intuition
              </span>{' '}
              and production-grade engineering.
            </h2>

            <p className="about-reveal-line text-base sm:text-lg text-text-secondary leading-relaxed">
              Most teams are forced to choose between a design agency that delivers pretty Figma
              files nobody can build, or a backend dev shop that ships clunky interfaces. I bridge
              both worlds.
            </p>

            <p className="about-reveal-line text-base sm:text-lg text-text-secondary leading-relaxed">
              Based in India and partnering with founders, executives, and agencies across the US,
              UK, Europe, UAE, and APAC, I architect{' '}
              <strong className="text-text-primary">high-converting marketing websites</strong>,{' '}
              <strong className="text-text-primary">bespoke CRM systems</strong> that eliminate
              expensive SaaS subscriptions, and{' '}
              <strong className="text-text-primary">custom web applications</strong> built to
              handle real-world scale.
            </p>

            {/* 3 Pillar Mini-Cards */}
            <div className="about-reveal-line grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary/70 p-4">
                <Layers className="h-5 w-5 text-accent mb-2" />
                <h3 className="font-display text-sm font-bold text-text-primary">
                  Editorial UI/UX
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Asymmetric layouts, purposeful motion &amp; conversion-first hierarchy.
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary/70 p-4">
                <Code2 className="h-5 w-5 text-accent mb-2" />
                <h3 className="font-display text-sm font-bold text-text-primary">
                  Full-Stack Depth
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Hardened Node/Express APIs, custom CRMs, role auth &amp; clean schemas.
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary/70 p-4">
                <Cpu className="h-5 w-5 text-accent mb-2" />
                <h3 className="font-display text-sm font-bold text-text-primary">
                  60fps Performance
                </h3>
                <p className="mt-1 text-xs text-text-secondary">
                  Sub-2s loads, GPU-instanced WebGL &amp; 90+ mobile Lighthouse scores.
                </p>
              </div>
            </div>

            {/* Animated Counters */}
            <div className="about-counters-grid grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
              {OWNER_INFO.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border-subtle bg-bg-secondary p-4"
                >
                  <div className="font-display text-3xl font-bold text-text-primary tabular-nums">
                    {counts[i]}
                    <span className="text-accent">{stat.suffix}</span>
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-text-muted">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Skills & Tech Cloud */}
        <div className="mt-20 rounded-3xl border border-border-subtle bg-bg-secondary/60 p-6 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Interactive Capabilities Matrix</span>
              </div>
              <h3 className="mt-1 font-display text-2xl font-bold text-text-primary">
                Tech Stack &amp; Disciplines
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {SKILL_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition ${
                    activeCategory === cat
                      ? 'bg-accent text-accent-foreground font-bold'
                      : 'border border-border-subtle bg-bg-primary text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {filteredSkills.map((skill) => {
              const isSelected = hoveredSkill === skill.name;
              return (
                <button
                  key={skill.name}
                  type="button"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setHoveredSkill(isSelected ? null : skill.name)}
                  className={`group relative inline-flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-left transition-all duration-200 ${
                    isSelected
                      ? 'border-accent bg-accent/15 -translate-y-1 shadow-lg'
                      : 'border-border-subtle bg-bg-primary/90 hover:border-accent/60 hover:-translate-y-0.5'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="font-medium text-sm text-text-primary">{skill.name}</span>
                  <span className="rounded-md bg-bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase text-text-muted group-hover:text-accent">
                    {skill.level}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
