'use client';

import { useEffect, useRef, useState, type ReactNode, type PointerEvent } from 'react';
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'framer-motion';

/** Expo-out — samma kurva som GSAP:s expo.out, för enhetlig känsla. */
const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Container som staggrar alla motion-barn (Item / MaskReveal). */
const staggerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EXPO } },
};

const fadeOnlyVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

/** Choreograferad intro-container (används i hero). */
export function Stagger({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Fade-up-barn till <Stagger>. */
export function Item({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={reduce ? fadeOnlyVariants : fadeUpVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Cinematic mask-reveal — raden glider upp ur en osynlig "slot". */
export function MaskReveal({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = reduce
    ? fadeOnlyVariants
    : {
        hidden: { y: '110%' },
        show: { y: '0%', transition: { duration: 1, ease: EXPO } },
      };
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span variants={variants} className="block will-change-transform">
        {children}
      </motion.span>
    </span>
  );
}

/** Magnetisk hover — innehållet fjädrar mjukt mot muspekaren. */
export function Magnetic({
  children,
  className = '',
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) return <div className={`inline-block ${className}`}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Räknar upp ett tal från 0 när elementet kommer in i vyn. */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1.4,
  className = '',
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: EXPO,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduce ? to : display}
      {suffix}
    </span>
  );
}

/** 3D-tilt för kort — fjädrad rotation som följer muspekaren. */
export function TiltCard({
  children,
  className = '',
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 260, damping: 20 });
  const sry = useSpring(ry, { stiffness: 260, damping: 20 });

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rx.set(-(py - 0.5) * maxTilt * 2);
    ry.set((px - 0.5) * maxTilt * 2);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        className="h-full will-change-transform"
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        onPointerMove={onPointerMove}
        onPointerLeave={reset}
      >
        {children}
      </motion.div>
    </div>
  );
}
