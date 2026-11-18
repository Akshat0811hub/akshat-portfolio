import React, { useEffect, useState } from 'react';
import { z } from 'zod';
import {
  Phone,
  Mail,
  MessageCircle,
  Github,
  Instagram,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { OWNER_INFO, SERVICES_DATA, BUDGET_RANGES } from '../data/projects';
import MagneticButton from './MagneticButton';

const clientContactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 characters)'),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[+\d\s()-]{7,25}$/.test(val), 'Please enter a valid phone number'),
  company: z.string().trim().optional(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  budget: z.string().min(2, 'Please select an estimated budget range'),
  message: z
    .string()
    .trim()
    .min(15, 'Please share at least 15 characters about your project goals'),
  website_url_hp: z.string().optional(),
});

const SERVICE_TITLES = SERVICES_DATA.map((s) => s.title);

export default function Contact({ preselectedService }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    services: ['Website Design & Development'],
    budget: BUDGET_RANGES[1],
    message: '',
    website_url_hp: '', // Honeypot
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');
  const [confettiPieces, setConfettiPieces] = useState([]);
  const [istTime, setIstTime] = useState('');
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  // Sync preselected service when user clicks a CTA on Services or Pricing
  useEffect(() => {
    if (preselectedService && SERVICE_TITLES.includes(preselectedService)) {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.includes(preselectedService)
          ? prev.services
          : [preselectedService, ...prev.services],
      }));
    }
  }, [preselectedService]);

  // Live Local Time Widget (IST - Asia/Kolkata)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      const hour24 = Number(
        new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: 'numeric',
          hour12: false,
        }).format(now)
      );
      setIstTime(formatter.format(now));
      setIsWorkingHours(hour24 >= 9 && hour24 < 23);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleService = (serviceName) => {
    setFieldErrors((prev) => ({ ...prev, services: undefined }));
    setFormData((prev) => {
      const exists = prev.services.includes(serviceName);
      if (exists) {
        return { ...prev, services: prev.services.filter((s) => s !== serviceName) };
      }
      return { ...prev, services: [...prev.services, serviceName] };
    });
  };

  const triggerConfetti = () => {
    const colors = ['#d4ff00', '#38bdf8', '#f43f5e', '#a855f7', '#ffffff'];
    const pieces = Array.from({ length: 34 }, (_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      color: colors[i % colors.length],
      delay: Math.random() * 0.25,
      tx: (Math.random() - 0.5) * 180,
      ty: -80 - Math.random() * 140,
    }));
    setConfettiPieces(pieces);
    setTimeout(() => setConfettiPieces([]), 2400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setServerMessage('');

    // Client-side Zod validation
    const validation = clientContactSchema.safeParse(formData);
    if (!validation.success) {
      const flat = validation.error.flatten().fieldErrors;
      setFieldErrors(flat);
      setStatus('error');
      setServerMessage('Please review the highlighted fields below.');
      return;
    }

    setStatus('submitting');

    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiBase}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Could not submit inquiry.');
      }

      setStatus('success');
      setServerMessage(
        data.message ||
          'Your project inquiry has been saved and emailed to Akshat Singh!'
      );
      triggerConfetti();
    } catch (err) {
      // Save fallback locally in browser storage if backend server is offline during static demo
      try {
        const offlineLeads = JSON.parse(localStorage.getItem('akshat_offline_leads') || '[]');
        offlineLeads.unshift({
          _id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
          ...formData,
          status: 'new',
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('akshat_offline_leads', JSON.stringify(offlineLeads));
      } catch {
        // ignore storage errors
      }

      if (err.message && !err.message.includes('Failed to fetch')) {
        setStatus('error');
        setServerMessage(err.message);
      } else {
        // Graceful offline/static demo completion with direct mailto/WhatsApp option
        setStatus('success');
        setServerMessage(
          'Your brief has been recorded! You can also click below to send directly via WhatsApp or Email for an instant reply.'
        );
        triggerConfetti();
      }
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 border-b border-border-subtle">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Column: Direct Channels + Live IST Time Widget */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
                // 08 — Initiate Collaboration
              </span>
              <h2 className="mt-3 heading-section text-text-primary">
                Have a project in mind? <span className="text-accent">Let&apos;s build it.</span>
              </h2>
              <p className="mt-4 text-base text-text-secondary leading-relaxed">
                Fill out the brief to get a tailored scope, timeline, and fixed quote within 6–12
                hours—or reach out directly on WhatsApp or email right now.
              </p>

              {/* Live Local Time Widget */}
              <div className="mt-8 rounded-3xl border border-border-subtle bg-bg-secondary p-6">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-text-muted">
                    <Clock className="h-4 w-4 text-accent" />
                    Akshat&apos;s Local Time (India)
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    {isWorkingHours ? 'In Studio Now' : 'Async Mode'}
                  </span>
                </div>
                <div className="mt-3 font-display text-3xl sm:text-4xl font-bold tabular-nums text-text-primary">
                  {istTime || '11:55:00 AM'}{' '}
                  <span className="font-mono text-xs font-normal text-accent">IST (UTC+5:30)</span>
                </div>
                <p className="mt-2 text-xs text-text-secondary">
                  Working with clients across US, UK, EU, UAE, India &amp; APAC timezones.
                </p>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted mb-3">
                Direct Channels
              </h3>

              <a
                href={OWNER_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-border-subtle bg-bg-secondary p-4 transition hover:border-accent"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-bold text-text-primary">
                      WhatsApp Instant Chat
                    </div>
                    <div className="font-mono text-xs text-text-secondary">{OWNER_INFO.phone}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>

              <a
                href={`tel:${OWNER_INFO.phoneRaw}`}
                className="group flex items-center justify-between rounded-2xl border border-border-subtle bg-bg-secondary p-4 transition hover:border-accent"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-bold text-text-primary">
                      Direct Phone Call
                    </div>
                    <div className="font-mono text-xs text-text-secondary">{OWNER_INFO.phone}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>

              <a
                href={`mailto:${OWNER_INFO.email}`}
                className="group flex items-center justify-between rounded-2xl border border-border-subtle bg-bg-secondary p-4 transition hover:border-accent"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-bold text-text-primary">
                      Email Direct
                    </div>
                    <div className="font-mono text-xs text-text-secondary">{OWNER_INFO.email}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
              </a>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <a
                  href={OWNER_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-bg-secondary py-3.5 font-mono text-xs font-semibold text-text-primary transition hover:border-accent hover:text-accent"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href={OWNER_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-border-subtle bg-bg-secondary py-3.5 font-mono text-xs font-semibold text-text-primary transition hover:border-accent hover:text-accent"
                >
                  <Instagram className="h-4 w-4" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-bg-secondary p-6 sm:p-10 shadow-2xl">
              {/* Confetti Burst Particles on Success */}
              {confettiPieces.length > 0 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-30 overflow-hidden"
                >
                  {confettiPieces.map((p) => (
                    <span
                      key={p.id}
                      style={{
                        left: `${p.left}%`,
                        top: '60%',
                        backgroundColor: p.color,
                        transform: `translate(${p.tx}px, ${p.ty}px)`,
                        transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1), opacity 1.1s',
                      }}
                      className="absolute h-2.5 w-2.5 rounded-sm opacity-90 animate-ping"
                    />
                  ))}
                </div>
              )}

              {status === 'success' ? (
                <div className="py-12 text-center space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30">
                    <CheckCircle2 className="h-9 w-9" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-text-primary">
                    Inquiry Received!
                  </h3>
                  <p className="mx-auto max-w-md text-sm sm:text-base text-text-secondary">
                    {serverMessage}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                    <a
                      href={`https://wa.me/919599535114?text=${encodeURIComponent(
                        `Hi Akshat! I just submitted a project brief (${formData.services.join(
                          ', '
                        )} - ${formData.budget}). My name is ${formData.name}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-emerald-400"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Fast-Track on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          company: '',
                          services: ['Website Design & Development'],
                          budget: BUDGET_RANGES[1],
                          message: '',
                          website_url_hp: '',
                        });
                      }}
                      className="rounded-full border border-border-subtle bg-bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider text-text-primary hover:border-accent"
                    >
                      Send Another Brief
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  {/* Hidden Honeypot Input for Bot Spam Protection */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website_url_hp">Leave this field empty</label>
                    <input
                      id="website_url_hp"
                      type="text"
                      name="website_url_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_url_hp}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, website_url_hp: e.target.value }))
                      }
                    />
                  </div>

                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2"
                      >
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className={`w-full rounded-xl border bg-bg-primary px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                          fieldErrors.name ? 'border-rose-500' : 'border-border-subtle'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="mt-1 text-xs text-rose-400">{fieldErrors.name[0]}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2"
                      >
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        className={`w-full rounded-xl border bg-bg-primary px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                          fieldErrors.email ? 'border-rose-500' : 'border-border-subtle'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="mt-1 text-xs text-rose-400">{fieldErrors.email[0]}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company (Optional) */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2"
                      >
                        Phone / WhatsApp <span className="text-text-muted">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="+1 555 234 5678"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, phone: e.target.value }))
                        }
                        className={`w-full rounded-xl border bg-bg-primary px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                          fieldErrors.phone ? 'border-rose-500' : 'border-border-subtle'
                        }`}
                      />
                      {fieldErrors.phone && (
                        <p className="mt-1 text-xs text-rose-400">{fieldErrors.phone[0]}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2"
                      >
                        Company / Brand <span className="text-text-muted">(Optional)</span>
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        placeholder="Acme Labs Inc."
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, company: e.target.value }))
                        }
                        className="w-full rounded-xl border border-border-subtle bg-bg-primary px-4 py-3.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>

                  {/* Row 3: Multi-Select Service Chips */}
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2.5">
                      Services Needed (Select one or more) <span className="text-accent">*</span>
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_TITLES.map((serviceName) => {
                        const selected = formData.services.includes(serviceName);
                        return (
                          <button
                            key={serviceName}
                            type="button"
                            onClick={() => toggleService(serviceName)}
                            aria-pressed={selected}
                            className={`rounded-xl border px-3.5 py-2 text-xs font-medium transition ${
                              selected
                                ? 'border-accent bg-accent text-accent-foreground font-bold shadow-sm'
                                : 'border-border-subtle bg-bg-primary text-text-secondary hover:border-accent/50 hover:text-text-primary'
                            }`}
                          >
                            {serviceName}
                          </button>
                        );
                      })}
                    </div>
                    {fieldErrors.services && (
                      <p className="mt-1.5 text-xs text-rose-400">{fieldErrors.services[0]}</p>
                    )}
                  </div>

                  {/* Row 4: Budget Range Selector */}
                  <div>
                    <span className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2.5">
                      Estimated Budget Range <span className="text-accent">*</span>
                    </span>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {BUDGET_RANGES.map((range) => {
                        const selected = formData.budget === range;
                        return (
                          <button
                            key={range}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, budget: range }))}
                            aria-pressed={selected}
                            className={`rounded-xl border px-3 py-2.5 font-mono text-xs transition ${
                              selected
                                ? 'border-accent bg-accent/15 text-accent font-bold'
                                : 'border-border-subtle bg-bg-primary text-text-secondary hover:border-accent/40'
                            }`}
                          >
                            {range}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Row 5: Project Details */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-mono text-xs uppercase tracking-wider text-text-secondary mb-2"
                    >
                      Project Goals, Timeline &amp; Links <span className="text-accent">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Tell me about what you're building, target launch date, or any existing site/CRM challenges..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, message: e.target.value }))
                      }
                      className={`w-full rounded-xl border bg-bg-primary p-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent ${
                        fieldErrors.message ? 'border-rose-500' : 'border-border-subtle'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-xs text-rose-400">{fieldErrors.message[0]}</p>
                    )}
                  </div>

                  {/* Error Banner */}
                  {status === 'error' && serverMessage && (
                    <div className="flex items-center gap-2.5 rounded-xl border border-rose-500/40 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                      <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                      <span>{serverMessage}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                      100% Confidential • Response in 6–12 hrs
                    </span>

                    <MagneticButton
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-8 py-4 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-lg shadow-accent/20 transition hover:bg-accent-hover disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Sending Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Project Brief</span>
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
