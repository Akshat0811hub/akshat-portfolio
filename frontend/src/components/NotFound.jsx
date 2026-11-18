import React from 'react';
import { ArrowLeft, Compass } from 'lucide-react';

export default function NotFound({ onGoHome }) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-bg-primary px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-6">
        <Compass className="h-8 w-8 animate-spin-slow" />
      </div>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        Error 404 // Coordinates Off-Grid
      </p>
      <h1 className="mt-3 font-display text-6xl sm:text-8xl font-bold text-text-primary">
        LOST IN SPACE<span className="text-accent">.</span>
      </h1>
      <p className="mt-4 max-w-md text-sm sm:text-base text-text-secondary">
        The route you requested doesn&apos;t exist, or it moved to a faster edge node. Let&apos;s
        bring you back to Akshat Singh&apos;s main studio.
      </p>
      <button
        type="button"
        onClick={onGoHome}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:bg-accent-hover"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Home Studio</span>
      </button>
    </section>
  );
}
