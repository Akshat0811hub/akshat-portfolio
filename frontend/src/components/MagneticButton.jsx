import React, { useRef } from 'react';

export default function MagneticButton({
  children,
  className = '',
  strength = 0.28,
  as: Component = 'button',
  cursorLabel = '',
  ...props
}) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate3d(0px, 0px, 0)';
  };

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={cursorLabel || undefined}
      style={{
        transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
