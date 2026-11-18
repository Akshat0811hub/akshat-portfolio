import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const sectionRef = useRef(null);
  const lineFillRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 70%',
              scrub: 0.4,
            },
          }
        );
      }

      const cards = gsap.utils.toArray('.process-step-card');
      cards.forEach((card, idx) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top 65%',
          end: 'bottom 45%',
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-b border-border-subtle"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Sticky Header */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              // 04 — Execution Process
            </span>
            <h2 className="mt-3 heading-section text-text-primary">
              From raw idea to <span className="text-accent">production scale</span> in 5 phases.
            </h2>
            <p className="mt-4 text-base text-text-secondary leading-relaxed">
              No black-box agency mystery. You get weekly staging links, transparent milestones,
              and direct access to me from day one.
            </p>

            {/* Active Phase Indicator Box */}
            <div className="mt-8 rounded-2xl border border-border-subtle bg-bg-secondary p-5">
              <div className="flex items-center justify-between font-mono text-xs text-text-muted">
                <span>ACTIVE STAGE</span>
                <span className="text-accent font-bold">
                  STEP {PROCESS_STEPS[activeIndex]?.step} / 05
                </span>
              </div>
              <div className="mt-2 font-display text-xl font-bold text-text-primary">
                {PROCESS_STEPS[activeIndex]?.phase}
              </div>
              <div className="mt-1 font-mono text-xs text-accent">
                Typical Window: {PROCESS_STEPS[activeIndex]?.duration}
              </div>
            </div>
          </div>

          {/* Right Scroll-Linked Timeline */}
          <div className="relative lg:col-span-7 pl-6 sm:pl-10">
            {/* Vertical Track */}
            <div
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-1.5 sm:left-3 w-[2px] bg-border-subtle overflow-hidden"
            >
              <div
                ref={lineFillRef}
                className="h-full w-full origin-top bg-accent"
              />
            </div>

            <div className="space-y-8">
              {PROCESS_STEPS.map((item, idx) => {
                const isActive = idx <= activeIndex;
                return (
                  <div
                    key={item.step}
                    className={`process-step-card relative rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                      idx === activeIndex
                        ? 'border-accent bg-bg-secondary shadow-xl shadow-accent/5'
                        : 'border-border-subtle bg-bg-secondary/50'
                    }`}
                  >
                    {/* Timeline Node Dot */}
                    <span
                      aria-hidden="true"
                      className={`absolute -left-[25px] sm:-left-[33px] top-8 flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? 'border-accent bg-accent text-accent-foreground'
                          : 'border-border-subtle bg-bg-primary'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    </span>

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
                        Phase {item.step} — {item.phase}
                      </span>
                      <span className="rounded-full border border-border-subtle bg-bg-primary px-3 py-1 font-mono text-[11px] text-text-muted">
                        {item.duration}
                      </span>
                    </div>

                    <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                      {item.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2 border-t border-border-subtle pt-4">
                      {item.outputs.map((out) => (
                        <span
                          key={out}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-primary"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                          {out}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
