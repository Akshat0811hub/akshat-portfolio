import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const coarse =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse) {
      setIsTouch(true);
      return;
    }

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let rafId;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      const target = e.target?.closest?.('[data-cursor], a, button, input, textarea, select');
      if (target) {
        setIsHovered(true);
        const customText = target.getAttribute('data-cursor') || '';
        setLabel(customText);
      } else {
        setIsHovered(false);
        setLabel('');
      }
    };

    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x.toFixed(1)}px, ${ring.y.toFixed(1)}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      {/* Inner precision dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent transition-opacity duration-200"
        style={{ opacity: label ? 0 : 1 }}
      />
      {/* Outer lerped ring + contextual label */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed top-0 left-0 z-[9997] flex items-center justify-center rounded-full transition-[width,height,margin,background-color,border-color] duration-200 ${
          label
            ? '-ml-11 -mt-11 h-22 w-22 bg-accent text-accent-foreground shadow-lg px-3 py-3 min-w-[76px] min-h-[76px]'
            : isHovered
            ? '-ml-6 -mt-6 h-12 w-12 border border-accent bg-accent/10'
            : '-ml-4 -mt-4 h-8 w-8 border border-text-secondary/40'
        }`}
      >
        {label && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent-foreground">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
