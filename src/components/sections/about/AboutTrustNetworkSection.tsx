"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { aboutTrustNetwork } from "@/data/about";
import { trustNetworkLogos } from "@/data/site";
import {
  ABOUT_BG_WHITE,
  ABOUT_BLOCK_SPACING,
  ABOUT_INNER,
  ABOUT_PROSE_CENTER,
  ABOUT_SECTION_PAD,
  ABOUT_BODY,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

function BlueprintBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        className="absolute top-0 left-1/2 h-full w-[120%] max-w-none -translate-x-1/2 text-engineering/[0.025]"
        viewBox="0 0 1700 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M-40 420C120 320 280 480 440 360C600 240 720 40 920 100C1120 160 1240 320 1480 220"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M80 620h1240M200 620V380M600 620V280M1000 620V420M1400 620V340"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle cx="320" cy="200" r="100" stroke="currentColor" strokeWidth="1" />
        <rect x="1050" y="140" width="360" height="220" stroke="currentColor" strokeWidth="1" rx="4" />
      </svg>
    </div>
  );
}

export default function AboutTrustNetworkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  const { label, subtitle } = aboutTrustNetwork;
  const midpoint = Math.ceil(trustNetworkLogos.length / 2);
  const topRow = trustNetworkLogos.slice(0, midpoint);
  const bottomRow = trustNetworkLogos.slice(midpoint);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        gsap.set(headerRef.current, {
          opacity: 0,
          y: 32,
        });
        gsap.set(marqueeRef.current, { opacity: 0, y: 24 });

        gsap.to(headerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        gsap.to(marqueeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: marqueeRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust-network"
      aria-labelledby="about-trust-network-heading"
      className={`relative w-full overflow-hidden ${ABOUT_BG_WHITE} ${ABOUT_SECTION_PAD}`}
    >
      <BlueprintBackground />

      <div className={`relative z-10 ${ABOUT_INNER}`}>
        <div ref={headerRef} className={`mx-auto ${ABOUT_BLOCK_SPACING} text-center`}>
          <span className="section-label mb-5 block">{label}</span>
          <h2 id="about-trust-network-heading" className="section-title mb-6 text-[#1a2b4a] dark:text-foreground">
            Trusted Clients &<br className="hidden sm:block" /> Strategic Partners
          </h2>
          <p className={`${ABOUT_PROSE_CENTER} ${ABOUT_BODY}`}>
            {subtitle}
          </p>
        </div>

        <div ref={marqueeRef}>
          <div className="space-y-5 sm:space-y-6">
            <LogoMarquee
              items={topRow}
              direction="ltr"
              duration={23}
              ariaLabel="Trusted clients and strategic partners marquee row one"
            />
            <LogoMarquee
              items={bottomRow}
              direction="rtl"
              duration={21}
              ariaLabel="Trusted clients and strategic partners marquee row two"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
