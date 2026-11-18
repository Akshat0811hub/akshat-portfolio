import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/projects';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const dragStartX = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePointerDown = (e) => {
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
  };

  const handlePointerUp = (e) => {
    if (dragStartX.current === null) return;
    const endX = e.clientX ?? e.changedTouches?.[0]?.clientX ?? dragStartX.current;
    const diff = endX - dragStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        setActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
      } else {
        setActive((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
      }
    }
    dragStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="relative py-24 sm:py-32 border-b border-border-subtle overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-14">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              // 05 — Client Testimonials
            </span>
            <h2 className="mt-3 heading-section text-text-primary">
              Trusted by founders <span className="text-accent">worldwide.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setActive((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length)
              }
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-primary transition hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-primary transition hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Draggable Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onMouseDown={handlePointerDown}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchEnd={handlePointerUp}
          data-cursor="Drag"
          className="cursor-grab active:cursor-grabbing select-none"
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 items-stretch">
            {/* Featured Active Card */}
            <div className="lg:col-span-8 rounded-3xl border border-accent/50 bg-bg-secondary p-8 sm:p-12 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <span className="rounded-full border border-border-subtle bg-bg-primary px-3 py-1 font-mono text-xs text-accent">
                    {TESTIMONIALS_DATA[active].projectType}
                  </span>
                </div>

                <Quote className="h-10 w-10 text-accent/30 mb-4" />

                <blockquote className="font-display text-xl sm:text-3xl font-medium text-text-primary leading-snug">
                  &ldquo;{TESTIMONIALS_DATA[active].quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-6">
                <div>
                  <div className="font-display text-lg font-bold text-text-primary">
                    {TESTIMONIALS_DATA[active].author}
                  </div>
                  <div className="font-mono text-xs text-text-secondary">
                    {TESTIMONIALS_DATA[active].role} • {TESTIMONIALS_DATA[active].location}
                  </div>
                </div>
                <span className="font-mono text-xs text-text-muted">
                  0{active + 1} / 0{TESTIMONIALS_DATA.length} (Drag or Click)
                </span>
              </div>
            </div>

            {/* Side Selector List */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-3">
              {TESTIMONIALS_DATA.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`flex flex-col justify-between rounded-2xl border p-4 text-left transition-all ${
                    idx === active
                      ? 'border-accent bg-accent/10'
                      : 'border-border-subtle bg-bg-secondary/60 hover:border-accent/40'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-display text-sm font-bold text-text-primary">
                      {item.author}
                    </span>
                    <span className="font-mono text-[10px] text-accent">{item.location}</span>
                  </div>
                  <p className="mt-1 text-xs text-text-secondary line-clamp-2">{item.quote}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
