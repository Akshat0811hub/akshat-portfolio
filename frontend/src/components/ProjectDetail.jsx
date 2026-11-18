import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { PROJECTS_DATA } from '../data/projects';
import MagneticButton from './MagneticButton';

export default function ProjectDetail({ project, onBack, onSelectProject, onStartSimilarProject }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project]);

  if (!project) return null;

  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS_DATA[(currentIndex + 1) % PROJECTS_DATA.length];

  return (
    <article className="min-h-screen bg-bg-primary pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {/* Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 rounded-full border border-border-subtle bg-bg-secondary px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text-primary transition hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Work</span>
          </button>

          <span className="font-mono text-xs text-text-muted">
            Case Study {project.number} // {project.year}
          </span>
        </div>

        {/* Hero Banner */}
        <div
          className="relative overflow-hidden rounded-3xl border border-border-subtle p-8 sm:p-14"
          style={{
            background: `radial-gradient(circle at 85% 20%, ${project.accentColor}30, transparent 55%), linear-gradient(135deg, ${project.palette[0]} 0%, ${project.palette[1]} 100%)`,
          }}
        >
          <div className="relative z-10 max-w-3xl">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-1 font-mono text-xs text-white"
              style={{ color: project.accentColor }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              {project.category}
            </span>

            <h1 className="mt-5 font-display text-4xl sm:text-6xl font-bold text-white tracking-tight">
              {project.title}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-zinc-300">{project.subtitle}</p>

            {/* Metadata Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  Client
                </span>
                <p className="mt-1 text-sm font-semibold text-white">{project.client}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  Timeline
                </span>
                <p className="mt-1 text-sm font-semibold text-white">{project.duration}</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  Role
                </span>
                <p className="mt-1 text-sm font-semibold text-white">Lead Designer &amp; Dev</p>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400">
                  Year
                </span>
                <p className="mt-1 text-sm font-semibold text-white">{project.year}</p>
              </div>
            </div>

            {/* External Action Links */}
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:opacity-90"
              >
                <span>Live Preview / Repo</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-white"
              >
                <Github className="h-3.5 w-3.5" />
                <span>Architecture Code</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4 Key Results / Impact Metrics */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {project.results.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border-subtle bg-bg-secondary p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl sm:text-4xl font-bold text-accent">
                  {item.metric}
                </span>
                <TrendingUp className="h-4 w-4 text-text-muted" />
              </div>
              <p className="mt-2 font-mono text-xs uppercase tracking-wider text-text-secondary">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Deep Case Study Breakdown: Problem & Solution */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6 sm:p-10">
              <span className="font-mono text-xs uppercase tracking-widest text-rose-400">
                01 // The Challenge &amp; Bottleneck
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
                Why the client needed a ground-up rethink
              </h2>
              <p className="mt-4 text-base text-text-secondary leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6 sm:p-10">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                02 // Engineering &amp; Design Solution
              </span>
              <h2 className="mt-2 font-display text-2xl font-bold text-text-primary">
                How we architected and shipped the product
              </h2>
              <p className="mt-4 text-base text-text-secondary leading-relaxed">
                {project.solution}
              </p>

              <h3 className="mt-8 font-mono text-xs uppercase tracking-wider text-text-muted mb-4">
                Key Capabilities Delivered
              </h3>
              <ul className="space-y-3">
                {project.features.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-primary p-3.5 text-sm text-text-primary"
                  >
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar: Tech Stack & CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent mb-4">
                <Layers className="h-4 w-4" />
                <span>Technologies Used</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-xl border border-border-subtle bg-bg-primary px-3.5 py-2 font-mono text-xs text-text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-accent/40 bg-accent/10 p-6 sm:p-8">
              <h3 className="font-display text-2xl font-bold text-text-primary">
                Want similar results for your business?
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Let&apos;s scope your website, custom CRM, or web application and build a roadmap.
              </p>
              <MagneticButton
                type="button"
                onClick={onStartSimilarProject}
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
              >
                <span>Build Something Like This</span>
                <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Next Project Banner */}
        {nextProject && (
          <div className="mt-16 border-t border-border-subtle pt-12">
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Next Case Study
            </span>
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="group mt-3 flex w-full items-center justify-between rounded-3xl border border-border-subtle bg-bg-secondary p-6 sm:p-10 text-left transition hover:border-accent"
            >
              <div>
                <span className="font-mono text-xs text-accent">{nextProject.category}</span>
                <h3 className="mt-1 font-display text-2xl sm:text-4xl font-bold text-text-primary group-hover:text-accent transition-colors">
                  {nextProject.title}
                </h3>
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:translate-x-1">
                <ArrowUpRight className="h-6 w-6" />
              </span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
