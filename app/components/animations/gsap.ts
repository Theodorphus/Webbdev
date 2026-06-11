'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/** Centrala easings — håll alla GSAP-animationer konsekventa. */
export const EASE = {
  out: 'power2.out',
  expo: 'expo.out',
  soft: 'sine.inOut',
} as const;

/** Centrala durations (sekunder). */
export const DUR = {
  fast: 0.45,
  base: 0.8,
  slow: 1.2,
} as const;

export { gsap, ScrollTrigger };
