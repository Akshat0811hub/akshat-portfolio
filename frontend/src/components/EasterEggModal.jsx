import React, { useEffect, useRef } from 'react';
import { X, Sparkles } from 'lucide-react';

export default function EasterEggModal({ isOpen, onClose, onUseSecretPass }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5,
      r: 2 + Math.random() * 4,
      color: Math.random() > 0.35 ? '#d4ff00' : '#38bdf8',
    }));

    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMove);

    const draw = () => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 140) {
          p.vx += (dx / dist) * 0.18;
          p.vy += (dy / dist) * 0.18;
        }
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove', onMove);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Studio Easter Egg Playground"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-accent bg-[#09090b] p-6 sm:p-8 text-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Easter Egg"
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white hover:border-[#d4ff00] hover:text-[#d4ff00]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#d4ff00]/15 px-3 py-1 font-mono text-xs text-[#d4ff00]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Easter Egg Unlocked // Priority Studio Pass</span>
          </div>

          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-bold">
            Gravity Field &amp; VIP Fast-Track
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-400">
            Move your cursor inside the field below to bend the particle swarm. Because you explore
            the details, you&apos;ve unlocked a complimentary{' '}
            <strong className="text-[#d4ff00]">UX &amp; Architecture Audit</strong> on your project!
          </p>

          <canvas
            ref={canvasRef}
            className="mt-4 h-52 w-full rounded-2xl border border-white/10 bg-black cursor-crosshair"
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs text-zinc-400">
              VIP CODE: <strong className="text-[#d4ff00]">AKSHAT-VIP-2026</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onUseSecretPass();
              }}
              className="rounded-full bg-[#d4ff00] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:opacity-90"
            >
              Claim Free UX Audit in Contact Form →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
