import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { PRICING_PLANS } from '../data/projects';
import MagneticButton from './MagneticButton';

export default function Pricing({ onSelectPlan }) {
  const [currency, setCurrency] = useState('USD');

  return (
    <section id="pricing" className="relative py-24 sm:py-32 border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header & Currency Switcher */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
              // 06 — Transparent Engagement Models
            </span>
            <h2 className="mt-3 heading-section text-text-primary">
              Flexible ways to <span className="text-accent">partner together.</span>
            </h2>
          </div>

          {/* USD / INR Switch */}
          <div className="inline-flex items-center gap-1 self-start rounded-full border border-border-subtle bg-bg-secondary p-1.5">
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition ${
                currency === 'USD'
                  ? 'bg-accent text-accent-foreground font-bold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              USD ($) Global
            </button>
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`rounded-full px-4 py-1.5 font-mono text-xs transition ${
                currency === 'INR'
                  ? 'bg-accent text-accent-foreground font-bold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              INR (₹) India
            </button>
          </div>
        </div>

        {/* 3 Engagement Cards */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-transform duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? 'border-accent bg-bg-secondary shadow-2xl shadow-accent/10'
                  : 'border-border-subtle bg-bg-secondary/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-xl font-bold text-text-primary">
                    {plan.name}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 font-mono text-[11px] font-semibold ${
                      plan.featured
                        ? 'bg-accent text-accent-foreground'
                        : 'border border-border-subtle bg-bg-primary text-text-secondary'
                    }`}
                  >
                    {plan.featured && <Sparkles className="h-3 w-3" />}
                    {plan.badge}
                  </span>
                </div>

                <div className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
                  {currency === 'USD' ? plan.priceUSD : plan.priceINR}
                </div>
                <p className="mt-1 font-mono text-xs text-accent">{plan.billing}</p>

                <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                  {plan.description}
                </p>

                <ul className="mt-6 space-y-3 border-t border-border-subtle pt-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-text-primary">
                      <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4">
                <MagneticButton
                  type="button"
                  onClick={() => onSelectPlan(plan.defaultService)}
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3.5 px-6 text-xs font-bold uppercase tracking-wider transition ${
                    plan.featured
                      ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
                      : 'border border-border-subtle bg-bg-primary text-text-primary hover:border-accent hover:text-accent'
                  }`}
                >
                  <span>{plan.ctaLabel}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
