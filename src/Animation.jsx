import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* Scroll-reveal */
export const FadeUp = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

/* Word-by-word headline reveal (word-based so Tamil glyph clusters never break) */
export const Words = ({ text, delay = 0, className = '' }) => (
  <span className={className} aria-label={text}>
    {text.split(' ').map((w, i) => (
      <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', paddingBottom: '0.12em' }}>
        <motion.span
          style={{ display: 'inline-block' }}
          initial={{ y: '110%', rotate: 4 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: delay + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {w}&nbsp;
        </motion.span>
      </span>
    ))}
  </span>
);

/* 3D tilt on hover */
export const Tilt = ({ children, className = '', max = 10 }) => {
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 }), sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rx = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const ry = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const ref = useRef(null);
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const leave = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} onMouseMove={move} onMouseLeave={leave} className={className}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}>
      {children}
    </motion.div>
  );
};

/* Floating gold dust */
export const Particles = ({ count = 22 }) => (
  <div className="particles" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <span key={i} style={{
        left: `${(i * 37) % 100}%`,
        width: `${2 + (i % 4)}px`, height: `${2 + (i % 4)}px`,
        animationDuration: `${9 + (i % 7) * 2}s`,
        animationDelay: `${-(i % 9) * 1.3}s`
      }} />
    ))}
  </div>
);

/* Brand logo mark (inline SVG: truck + M inside ring) */
export const Logo = ({ size = 56, className = '' }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Monika Transport logo">
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFE680" /><stop offset="1" stopColor="#F5A623" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="46" fill="#0b0b0b" stroke="url(#lg)" strokeWidth="3" />
    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,215,0,.25)" strokeWidth="1" strokeDasharray="3 4" />
    <path d="M26 58V34l12 14 12-14 12 14 12-14v24" fill="none" stroke="url(#lg)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M24 70h38v-6H24zM62 64h8l6 6v0h-14z" fill="url(#lg)" />
    <circle cx="34" cy="73" r="4" fill="#0b0b0b" stroke="url(#lg)" strokeWidth="2.5" />
    <circle cx="66" cy="73" r="4" fill="#0b0b0b" stroke="url(#lg)" strokeWidth="2.5" />
  </svg>
);

/* Popup modal with backdrop, esc-to-close and scroll lock */
export const Modal = ({ open, onClose, children, closeLabel = 'Close' }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="modal-backdrop" onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="modal-box" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.85, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }} transition={{ type: 'spring', damping: 22, stiffness: 260 }}>
            <button className="modal-close" onClick={onClose} aria-label={closeLabel}>✕</button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};