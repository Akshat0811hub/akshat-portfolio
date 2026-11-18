import React from 'react';
import { ArrowUp, Github, Instagram, Mail, Phone, Sparkles, Lock } from 'lucide-react';
import { OWNER_INFO } from '../data/projects';
import MagneticButton from './MagneticButton';

export default function Footer({ onOpenEasterEgg, onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden bg-bg-primary pt-20 pb-12 text-text-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Top Row: Quick Navigation & Back to Top */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between border-b border-border-subtle pb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              Available for Select Projects Worldwide
            </p>
            <a
              href={`mailto:${OWNER_INFO.email}`}
              className="mt-2 inline-block font-display text-2xl sm:text-4xl font-bold text-text-primary hover:text-accent transition-colors"
            >
              {OWNER_INFO.email}
            </a>
          </div>

          <MagneticButton
            type="button"
            onClick={scrollToTop}
            cursorLabel="Top"
            aria-label="Back to top"
            className="group inline-flex items-center gap-3 self-start sm:self-auto rounded-full border border-border-subtle bg-bg-secondary px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-text-primary transition hover:border-accent hover:text-accent"
          >
            <span>Back to Top</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-foreground transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="h-4 w-4" />
            </span>
          </MagneticButton>
        </div>

        {/* Giant Kinetic Name Typography */}
        <div className="my-12 select-none overflow-hidden text-center">
          <h2
            onClick={onOpenEasterEgg}
            data-cursor="Surprise!"
            title="Click or press K for Studio Easter Egg"
            className="heading-giant-footer cursor-pointer tracking-tighter text-text-primary transition-colors duration-300 hover:text-accent"
          >
            AKSHAT SINGH<span className="text-accent">.</span>
          </h2>
        </div>

        {/* Bottom Bar: Socials, Copyright, Easter Egg & Admin Trigger */}
        <div className="flex flex-col gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-text-muted">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Akshat Singh. Crafted in India.</span>
            <button
              type="button"
              onClick={onOpenEasterEgg}
              className="inline-flex items-center gap-1 text-accent hover:underline"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Press [K] for Synth Playground</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={OWNER_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
            <a
              href={OWNER_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Instagram className="h-3.5 w-3.5" />
              <span>Instagram</span>
            </a>
            <a
              href={`tel:${OWNER_INFO.phoneRaw}`}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>{OWNER_INFO.phone}</span>
            </a>
            <a
              href={`mailto:${OWNER_INFO.email}`}
              className="inline-flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </a>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-text-muted hover:text-accent transition-colors"
              title="Open Lead Management Admin"
            >
              <Lock className="h-3 w-3" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
