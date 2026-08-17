"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutCollage from "@/components/ui/AboutCollage";
import { aboutOverview } from "@/data/about";
import {
  ABOUT_INNER,
  ABOUT_SECTION_PAD,
  ABOUT_BG_WHITE,
  ABOUT_BTN_MOBILE,
  ABOUT_FOCUS_RING,
  ABOUT_GRID_GAP,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

const badgePositions = [
  "left-0 top-4 -translate-x-2 sm:left-2 sm:translate-x-0 hidden sm:block",
  "right-0 top-8 translate-x-2 sm:right-2 sm:translate-x-0 hidden sm:block",
  "bottom-16 left-0 -translate-x-2 sm:left-4 sm:translate-x-0 hidden sm:block",
  "bottom-8 right-0 translate-x-2 sm:right-4 sm:translate-x-0 hidden sm:block",
];

function OverviewBlueprint() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[#1a2b4a]/[0.025] dark:text-foreground/[0.03]"
      viewBox="0 0 1440 800"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 160H1440M0 320H1440M0 480H1440M0 640H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M240 0V800M480 0V800M720 0V800M960 0V800M1200 0V800" stroke="currentColor" strokeWidth="0.75" />
      <path d="M160 120L480 320M760 200L1080 420M280 560L600 720" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="480" cy="320" r="4" fill="currentColor" />
      <circle cx="1080" cy="420" r="4" fill="currentColor" />
    </svg>
  );
}

export default function AboutOverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const collageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const collage = collageRef.current;
    const content = contentRef.current;
    if (!section || !collage || !content) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(collage, {
        opacity: 0,
        y: 40,
        scale: 0.97,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
      });

      gsap.to(collage.querySelectorAll("[data-floating-badge]"), {
        y: (i) => (i % 2 === 0 ? -8 : 8),
        duration: 3.2,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.5,
      });

      const lines = content.querySelectorAll("[data-overview-line]");
      gsap.fromTo(
        lines,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.12,
          immediateRender: false,
          scrollTrigger: { trigger: content, start: "top 85%", toggleActions: "play none none none" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${ABOUT_BG_WHITE} ${ABOUT_SECTION_PAD}`}
    >
      <OverviewBlueprint />
      <div className={ABOUT_INNER}>
        <div className={`grid grid-cols-1 items-start lg:grid-cols-[minmax(0,0.45fr)_minmax(0,0.55fr)] ${ABOUT_GRID_GAP}`}>
          {/* Image collage + floating badges */}
          <div ref={collageRef} className="relative mx-auto w-full max-w-[610px] lg:mx-0">
            <AboutCollage />
            {aboutOverview.floatingBadges.map((badge, i) => (
              <div
                key={badge.label}
                data-floating-badge
                className={`absolute z-20 rounded-full border border-white/60 bg-white/75 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-[#1a2b4a] shadow-[0_8px_24px_rgba(15,23,42,0.08)] backdrop-blur-[6px] dark:border-border/60 dark:bg-card/80 dark:text-foreground ${badgePositions[i]}`}
              >
                {badge.label}
              </div>
            ))}
            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:hidden">
              {aboutOverview.floatingBadges.map((badge) => (
                <span
                  key={`m-${badge.label}`}
                  className="rounded-full border border-[#e8edf2] bg-white px-3 py-1 text-[11px] font-semibold text-[#1a2b4a] dark:border-border dark:bg-card dark:text-foreground"
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Editorial content */}
          <div ref={contentRef} className="relative">
            <span data-overview-line className="section-label mb-4 block">
              {aboutOverview.label}
            </span>
            <h2
              data-overview-line
              className="mb-5 max-w-[680px] text-[clamp(28px,3.2vw,44px)] font-bold leading-[1.14] text-[#1a2b4a] dark:text-foreground"
            >
              {aboutOverview.title}
            </h2>
            <p
              data-overview-line
              className="mb-6 max-w-[680px] text-base leading-[1.9] text-[#5f6b7d] dark:text-foreground-muted"
            >
              {aboutOverview.description}
            </p>

            <div data-overview-line className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={aboutOverview.primaryCta.href} className={`btn-primary group justify-center ${ABOUT_BTN_MOBILE} ${ABOUT_FOCUS_RING}`}>
                {aboutOverview.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
              <Link href={aboutOverview.secondaryCta.href} className={`btn-secondary group justify-center ${ABOUT_BTN_MOBILE} ${ABOUT_FOCUS_RING}`}>
                {aboutOverview.secondaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
