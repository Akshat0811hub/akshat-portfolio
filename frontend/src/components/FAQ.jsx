import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQ_ITEMS } from '../data/projects';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 border-b border-border-subtle">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
            // 07 — Frequently Asked Questions
          </span>
          <h2 className="mt-3 heading-section text-text-primary">
            Clear answers before <span className="text-accent">we kick off.</span>
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.q}
                className={`rounded-2xl border transition-colors ${
                  isOpen
                    ? 'border-accent bg-bg-secondary'
                    : 'border-border-subtle bg-bg-secondary/50 hover:border-border-subtle/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display text-lg sm:text-xl font-bold text-text-primary">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen
                        ? 'border-accent bg-accent text-accent-foreground'
                        : 'border-border-subtle bg-bg-primary text-text-secondary'
                    }`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-sm sm:text-base text-text-secondary leading-relaxed border-t border-border-subtle/60 pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
