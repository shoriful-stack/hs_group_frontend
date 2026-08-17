"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  stagger?: number;
  start?: string;
  childSelector?: string;
};

export function useAboutReveal<T extends HTMLElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);
  const { y = 32, stagger = 0.08, start = "top 88%", childSelector } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = childSelector
        ? el.querySelectorAll(childSelector)
        : [el];

      gsap.set(targets, { opacity: 0, y });
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [y, stagger, start, childSelector]);

  return ref;
}
