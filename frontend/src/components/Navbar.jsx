import React, { useEffect, useState } from 'react';
import { Sun, Moon, Menu, X, Download, ArrowUpRight, Sparkles } from 'lucide-react';
import { OWNER_INFO } from '../data/projects';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({
  theme,
  onToggleTheme,
  activeSection,
  onNavigateSection,
  onTriggerEasterEgg,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      setScrollProgress(pct);
      setScrolled(scrollTop > 32);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileOpen(false);
    onNavigateSection(id);
  };

  return (
    <>
      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[90] h-[3px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-accent transition-[width] duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-[80] transition-all duration-300 ${
          scrolled
            ? 'py-3 bg-bg-primary/85 backdrop-blur-xl border-b border-border-subtle shadow-lg shadow-black/5'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Brand Monogram */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            className="group flex items-center gap-2.5 text-left focus:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent font-display text-base font-bold text-accent-foreground transition-transform duration-300 group-hover:rotate-6">
              AS
            </span>
            <div>
              <span className="block font-display text-base font-bold tracking-tight text-text-primary leading-none">
                AKSHAT SINGH<span className="text-accent">.</span>
              </span>
              <span className="block font-mono text-[10px] uppercase tracking-widest text-text-muted mt-0.5">
                Full-Stack &amp; UI/UX
              </span>
            </div>
          </a>

          {/* Desktop Navigation Pills */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 rounded-full border border-border-subtle bg-bg-secondary/80 p-1.5 backdrop-blur-md"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-accent text-accent-foreground font-semibold shadow-sm'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Theme, CV Download, Easter Egg, CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onTriggerEasterEgg}
              title="Launch Studio Playground (Shortcut: K)"
              aria-label="Launch Studio Synth Playground"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-secondary transition hover:border-accent hover:text-accent"
            >
              <Sparkles className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-secondary transition hover:border-accent hover:text-accent"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href={OWNER_INFO.resumeUrl}
              download="Akshat_Singh_Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-secondary px-3.5 py-2 text-xs font-medium text-text-primary transition hover:border-accent"
            >
              <Download className="h-3.5 w-3.5 text-accent" />
              <span>CV</span>
            </a>

            <MagneticButton
              as="button"
              type="button"
              onClick={() => handleNavClick('contact')}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground transition hover:bg-accent-hover"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle color theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-primary"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label="Toggle Navigation Menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-primary"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      <div
        className={`fixed inset-0 z-[75] flex flex-col justify-between bg-bg-primary/98 px-6 pt-24 pb-10 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          mobileOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <nav className="flex flex-col gap-3">
          {NAV_LINKS.map((link, idx) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="group flex items-baseline justify-between border-b border-border-subtle py-3 text-left"
            >
              <span className="font-display text-3xl font-bold text-text-primary group-hover:text-accent transition-colors">
                {link.label}
              </span>
              <span className="font-mono text-xs text-text-muted">0{idx + 1}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            <a
              href={OWNER_INFO.resumeUrl}
              download="Akshat_Singh_Resume.pdf"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-border-subtle bg-bg-secondary py-3 text-xs font-bold uppercase tracking-wider text-text-primary"
            >
              <Download className="h-4 w-4 text-accent" />
              Download Resume
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground"
            >
              Start a Project
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between pt-2 font-mono text-xs text-text-muted">
            <a href={`tel:${OWNER_INFO.phoneRaw}`} className="hover:text-accent">
              {OWNER_INFO.phone}
            </a>
            <a href={`mailto:${OWNER_INFO.email}`} className="hover:text-accent">
              {OWNER_INFO.email}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
