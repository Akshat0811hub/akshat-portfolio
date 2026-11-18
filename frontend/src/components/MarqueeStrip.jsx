import React from 'react';
import { MARQUEE_ITEMS } from '../data/projects';

export default function MarqueeStrip() {
  const repeated = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      aria-label="Capabilities Marquee"
      className="relative overflow-hidden border-y border-border-subtle bg-bg-secondary py-5 select-none"
    >
      <div className="animate-marquee-left flex items-center gap-8">
        {repeated.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-8 shrink-0">
            <span className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-text-primary">
              {item}
            </span>
            <span
              aria-hidden="true"
              className="inline-block h-2.5 w-2.5 rotate-45 bg-accent"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
