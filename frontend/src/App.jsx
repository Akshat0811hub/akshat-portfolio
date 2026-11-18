import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import AdminDashboard from './components/AdminDashboard';
import EasterEggModal from './components/EasterEggModal';
import NotFound from './components/NotFound';
import { PROJECTS_DATA } from './data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('akshat_theme') || 'dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [view, setView] = useState('home'); // 'home' | 'project' | 'admin' | '404'
  const [selectedProject, setSelectedProject] = useState(null);
  const [preselectedService, setPreselectedService] = useState('');
  const [easterEggOpen, setEasterEggOpen] = useState(false);
  const [pageTransitioning, setPageTransitioning] = useState(false);
  const lenisRef = useRef(null);

  // Sync theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('akshat_theme', theme);
  }, [theme]);

  // Initialize Lenis Smooth Scroll connected to GSAP ScrollTrigger
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  // Check URL path on initial load (/admin, /project/:slug, or 404)
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setView('admin');
    } else if (path.startsWith('/project/')) {
      const slug = path.replace('/project/', '');
      const found = PROJECTS_DATA.find((p) => p.slug === slug);
      if (found) {
        setSelectedProject(found);
        setView('project');
      } else {
        setView('404');
      }
    } else if (path !== '/' && path !== '/index.html') {
      setView('404');
    }
  }, []);

  // Active Section Observer
  useEffect(() => {
    if (view !== 'home') return;
    const sectionIds = [
      'hero',
      'about',
      'services',
      'projects',
      'process',
      'testimonials',
      'pricing',
      'faq',
      'contact',
    ];
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.28 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [view, loaded]);

  // Keyboard Easter Egg Shortcut: Press 'K' outside form fields
  useEffect(() => {
    const onKeyDown = (e) => {
      const tag = e.target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      if (e.key.toLowerCase() === 'k' && !e.metaKey && !e.ctrlKey) {
        setEasterEggOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Animated Page Transition helper
  const runViewTransition = (callback) => {
    setPageTransitioning(true);
    setTimeout(() => {
      callback();
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => {
        setPageTransitioning(false);
      }, 240);
    }, 260);
  };

  const handleNavigateSection = (sectionId) => {
    if (view !== 'home') {
      runViewTransition(() => {
        setView('home');
        window.history.pushState({}, '', '/');
        setTimeout(() => {
          const target = document.getElementById(sectionId);
          target?.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      });
      return;
    }

    const target = document.getElementById(sectionId);
    if (target) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: -64 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenProject = (project) => {
    runViewTransition(() => {
      setSelectedProject(project);
      setView('project');
      window.history.pushState({}, '', `/project/${project.slug}`);
    });
  };

  const handleSelectServiceForQuote = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    handleNavigateSection('contact');
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary selection:bg-accent selection:text-accent-foreground">
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}

      <CustomCursor />

      {/* Page Transition Curtain */}
      <div
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 z-[9500] bg-accent transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          pageTransitioning ? 'scale-y-100 origin-bottom' : 'scale-y-0 origin-top'
        }`}
      />

      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        onTriggerEasterEgg={() => setEasterEggOpen(true)}
      />

      <main id="main-content">
        {view === 'home' && (
          <>
            <Hero theme={theme} onNavigateSection={handleNavigateSection} />
            <MarqueeStrip />
            <About />
            <Services onSelectServiceForQuote={handleSelectServiceForQuote} />
            <Projects onSelectProject={handleOpenProject} />
            <Process />
            <Testimonials />
            <Pricing onSelectPlan={handleSelectServiceForQuote} />
            <FAQ />
            <Contact preselectedService={preselectedService} />
          </>
        )}

        {view === 'project' && (
          <ProjectDetail
            project={selectedProject}
            onBack={() =>
              runViewTransition(() => {
                setView('home');
                window.history.pushState({}, '', '/');
              })
            }
            onSelectProject={handleOpenProject}
            onStartSimilarProject={() => handleSelectServiceForQuote('Website Design & Development')}
          />
        )}

        {view === 'admin' && (
          <AdminDashboard
            onBack={() =>
              runViewTransition(() => {
                setView('home');
                window.history.pushState({}, '', '/');
              })
            }
          />
        )}

        {view === '404' && (
          <NotFound
            onGoHome={() =>
              runViewTransition(() => {
                setView('home');
                window.history.pushState({}, '', '/');
              })
            }
          />
        )}
      </main>

      <Footer
        onOpenEasterEgg={() => setEasterEggOpen(true)}
        onOpenAdmin={() =>
          runViewTransition(() => {
            setView('admin');
            window.history.pushState({}, '', '/admin');
          })
        }
      />

      <EasterEggModal
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
        onUseSecretPass={() => handleSelectServiceForQuote('Product Redesign & Changes')}
      />
    </div>
  );
}
