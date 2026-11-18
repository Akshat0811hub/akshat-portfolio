import React, { useEffect, useState } from 'react';

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setProgress(100);
      onComplete?.();
      return;
    }

    const start = performance.now();
    const duration = 1250; // Fast < 1.5s loader for snappy UX and Core Web Vitals

    let raf;
    const tick = (now) => {
      const elapsed = now - start;
      const ratio = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.round(eased * 100));

      if (ratio < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => {
          onComplete?.();
        }, 420);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      aria-label="Loading Akshat Singh Portfolio"
      className={`fixed inset-0 z-[10000] flex flex-col justify-between bg-[#09090b] px-6 py-8 text-[#f4f4f6] transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] sm:px-12 sm:py-10 ${
        exiting ? '-translate-y-full pointer-events-none' : 'translate-y-0'
      }`}
    >
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-zinc-400">
        <span>Portfolio Edition ©2026</span>
        <span>India • Worldwide</span>
      </div>

      <div className="my-auto max-w-5xl">
        <div className="overflow-hidden">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4ff00] mb-3">
            Full-Stack Developer &amp; Digital Product Designer
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-display text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
            AKSHAT SINGH<span className="text-[#d4ff00]">.</span>
          </h1>
        </div>
        <div className="mt-6 h-[2px] w-full max-w-md overflow-hidden bg-zinc-800 rounded-full">
          <div
            className="h-full bg-[#d4ff00] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <span className="font-mono text-xs text-zinc-400">
          Initializing WebGL &amp; Smooth Motion...
        </span>
        <span className="font-display text-5xl font-bold tabular-nums text-[#d4ff00] sm:text-7xl">
          {String(progress).padStart(2, '0')}%
        </span>
      </div>
    </div>
  );
}
