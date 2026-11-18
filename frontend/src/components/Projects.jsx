import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Sparkles, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All', 'Custom CRM', 'Websites & 3D', 'Branding & Web', 'Web Apps'];

export default function Projects({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const trackRef = useRef(null);
  const sectionRef = useRef(null);

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-showcase-card',
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  const scrollTrack = (direction) => {
    if (!trackRef.current) return;
    const amount = Math.min(window.innerWidth * 0.75, 620);
    trackRef.current.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-b border-border-subtle overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header & Filter Bar */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              // 03 — Selected Case Studies
            </span>
            <h2 className="mt-3 heading-section text-text-primary">
              Engineered for <span className="text-accent">measurable impact.</span>
            </h2>
          </div>

          {/* Filter Pills + Horizontal Scroll Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 font-mono text-xs transition ${
                  activeCategory === category
                    ? 'bg-accent text-accent-foreground font-bold shadow-sm'
                    : 'border border-border-subtle bg-bg-secondary text-text-secondary hover:text-text-primary'
                }`}
              >
                {category}
              </button>
            ))}

            <div className="ml-2 hidden sm:flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollTrack('prev')}
                aria-label="Scroll projects left"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-primary hover:border-accent hover:text-accent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollTrack('next')}
                aria-label="Scroll projects right"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-primary hover:border-accent hover:text-accent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrollable & Grid Showcase */}
        <div
          ref={trackRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none lg:grid lg:grid-cols-2 lg:overflow-visible"
        >
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectProject(project);
                }
              }}
              role="button"
              tabIndex={0}
              data-cursor="View"
              className="project-showcase-card group relative min-w-[86vw] sm:min-w-[520px] lg:min-w-0 snap-center flex flex-col justify-between overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary transition-all duration-300 hover:border-accent/80 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {/* Interactive Visual Mockup / Shader-Style Preview Banner */}
              <div
                className="relative aspect-[16/10] w-full overflow-hidden p-6 sm:p-8 flex flex-col justify-between"
                style={{
                  background: `radial-gradient(circle at 80% 20%, ${project.accentColor}28, transparent 55%), linear-gradient(135deg, ${project.palette[0]} 0%, ${project.palette[1]} 100%)`,
                }}
              >
                {/* Top Meta Row inside Preview */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 border border-white/15 px-3 py-1 font-mono text-xs text-white backdrop-blur-md">
                    <Sparkles className="h-3 w-3" style={{ color: project.accentColor }} />
                    {project.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-white/70">
                    {project.number} / {project.year}
                  </span>
                </div>

                {/* Stylized Interactive UI Mockup Frame with Hover Distortion/Zoom */}
                <div className="relative z-10 my-auto mx-auto w-full max-w-md rounded-2xl border border-white/15 bg-black/65 p-4 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04] group-hover:-rotate-1">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {project.slug}.app
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    {project.results.slice(0, 3).map((res) => (
                      <div
                        key={res.label}
                        className="rounded-xl border border-white/10 bg-white/5 p-2.5"
                      >
                        <div
                          className="font-display text-base sm:text-lg font-bold"
                          style={{ color: project.accentColor }}
                        >
                          {res.metric}
                        </div>
                        <div className="font-mono text-[9px] uppercase text-zinc-400 truncate mt-0.5">
                          {res.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:28px_28px] transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-primary group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs text-text-muted mt-1">{project.subtitle}</p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-bg-primary text-text-primary transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:rotate-12">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Tech Stack Tags */}
                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border-subtle pt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-subtle bg-bg-primary px-3 py-1 font-mono text-[11px] text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Helper Note for Easy Customization */}
        <div className="mt-8 flex items-center justify-between rounded-2xl border border-border-subtle bg-bg-secondary/50 px-5 py-3.5 text-xs text-text-muted">
          <span className="inline-flex items-center gap-2 font-mono">
            <Layers className="h-4 w-4 text-accent" />
            Click any project card to read the full Problem → Solution → Results Case Study
          </span>
          <span className="hidden sm:inline font-mono">4 Featured Case Studies</span>
        </div>
      </div>
    </section>
  );
}
