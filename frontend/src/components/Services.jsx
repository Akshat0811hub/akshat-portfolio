import React, { useState } from 'react';
import {
  Globe,
  Database,
  Code,
  Palette,
  RefreshCw,
  ShieldCheck,
  ArrowUpRight,
  Check,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/projects';

const SERVICE_ICONS = {
  websites: Globe,
  crm: Database,
  software: Code,
  branding: Palette,
  redesign: RefreshCw,
  maintenance: ShieldCheck,
};

function ServiceCard({ service, onOpenDetail, onSelectServiceForQuote }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const IconComponent = SERVICE_ICONS[service.id] || Globe;

  const handleMouseMove = (e) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - y) * 10,
      ry: (x - 0.5) * 10,
      gx: x * 100,
      gy: y * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetail(service)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetail(service);
        }
      }}
      role="button"
      tabIndex={0}
      data-cursor="Expand"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(
          2
        )}deg)`,
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary p-6 sm:p-8 text-left transition-colors hover:border-accent/70 focus:outline-none focus:ring-2 focus:ring-accent"
    >
      {/* Dynamic Cursor Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(360px circle at ${tilt.gx}% ${tilt.gy}%, var(--card-glow), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent">
            // {service.number}
          </span>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border-subtle bg-bg-primary text-accent transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <IconComponent className="h-6 w-6" />
          </div>
        </div>

        <h3 className="font-display text-2xl font-bold text-text-primary group-hover:text-accent transition-colors">
          {service.title}
        </h3>

        <p className="mt-3 text-sm text-text-secondary leading-relaxed">{service.shortDesc}</p>

        <ul className="mt-6 space-y-2 border-t border-border-subtle pt-4">
          {service.deliverables.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
              <Check className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 mt-8 flex items-center justify-between border-t border-border-subtle pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
          <Clock className="h-3.5 w-3.5 text-accent" />
          {service.timeline}
        </span>
        <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-accent group-hover:translate-x-1 transition-transform">
          Explore Scope
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export default function Services({ onSelectServiceForQuote }) {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="relative py-24 sm:py-32 border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              // 02 — Services &amp; Capabilities
            </span>
            <h2 className="mt-3 heading-section text-text-primary">
              Everything you need to{' '}
              <span className="text-accent">launch, automate &amp; scale.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-text-secondary">
            Click any service card to inspect full deliverables, technical architecture, and
            estimated timelines.
          </p>
        </div>

        {/* 6 Service Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES_DATA.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onOpenDetail={setSelectedService}
              onSelectServiceForQuote={onSelectServiceForQuote}
            />
          ))}
        </div>
      </div>

      {/* Expand-on-Click Service Detail Modal */}
      {selectedService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedService(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-3xl border border-border-subtle bg-bg-elevated p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={() => setSelectedService(null)}
              aria-label="Close service details"
              className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-secondary hover:border-accent hover:text-accent"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3.5 py-1 font-mono text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Service {selectedService.number} Breakdown</span>
            </div>

            <h3
              id="service-modal-title"
              className="mt-4 font-display text-3xl sm:text-4xl font-bold text-text-primary"
            >
              {selectedService.title}
            </h3>

            <p className="mt-3 text-base text-text-secondary leading-relaxed">
              {selectedService.shortDesc}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
                <span className="font-mono text-[11px] uppercase text-text-muted">
                  Typical Timeline
                </span>
                <p className="mt-1 font-display text-lg font-bold text-text-primary">
                  {selectedService.timeline}
                </p>
              </div>
              <div className="rounded-2xl border border-border-subtle bg-bg-secondary p-4">
                <span className="font-mono text-[11px] uppercase text-text-muted">Ideal For</span>
                <p className="mt-1 font-display text-sm font-semibold text-text-primary">
                  {selectedService.idealFor}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-accent mb-3">
                Included Deliverables
              </h4>
              <ul className="space-y-2.5">
                {selectedService.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-secondary/50 p-3 text-sm text-text-primary"
                  >
                    <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-2xl border border-accent/30 bg-accent/5 p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                Engineering &amp; Performance Standard
              </span>
              <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                {selectedService.architectureNote}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="rounded-full border border-border-subtle px-5 py-3 text-xs font-semibold uppercase tracking-wider text-text-secondary hover:text-text-primary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForQuote(title);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
              >
                <span>Request Quote for {selectedService.title}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
