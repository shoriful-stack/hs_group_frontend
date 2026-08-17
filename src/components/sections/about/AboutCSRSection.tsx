"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { csrSection } from "@/data/about";
import {
  ABOUT_BG_WHITE,
  ABOUT_IMAGE_FRAME,
  ABOUT_INNER,
  ABOUT_SECTION_PAD,
  CINEMATIC_IMAGE,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

function SustainabilityBlueprint() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[#1a2b4a]/[0.02] dark:text-foreground/[0.025]"
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 180H1440M0 360H1440M0 540H1440M0 720H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M280 0V900M560 0V900M840 0V900M1120 0V900" stroke="currentColor" strokeWidth="0.75" />
      <path d="M200 280C400 180 640 320 840 220C1040 120 1240 280 1320 360" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
      <circle cx="840" cy="220" r="3" fill="currentColor" />
      <circle cx="1040" cy="120" r="3" fill="currentColor" />
    </svg>
  );
}

export default function AboutCSRSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          x: -32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll("[data-commit-line]"), {
          opacity: 0,
          y: 28,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
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
      id="sustainability"
      aria-label="Engineering for a Sustainable Future"
      className={`relative overflow-hidden ${ABOUT_BG_WHITE} ${ABOUT_SECTION_PAD}`}
    >
      <SustainabilityBlueprint />

      <div className={`relative z-10 ${ABOUT_INNER}`}>
        <SectionHeading
          label={csrSection.label}
          title={csrSection.title}
          description={csrSection.subtitle}
          align="center"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[45fr_55fr] lg:gap-14 xl:gap-16">
          <div
            ref={imageRef}
            className={`group relative aspect-[4/3] ${ABOUT_IMAGE_FRAME}`}
          >
            <Image
              src={csrSection.image}
              alt="Solar energy and sustainable engineering infrastructure"
              fill
              className={`${CINEMATIC_IMAGE} transition-transform duration-500 ease-out group-hover:scale-[1.04]`}
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/30 via-transparent to-transparent" />
            <div className="light-sweep pointer-events-none" aria-hidden />
          </div>

          <div ref={contentRef}>
            <span data-commit-line className="section-label mb-5 block">
              {csrSection.commitment.label}
            </span>
            <h3
              data-commit-line
              className="mb-6 text-2xl font-bold leading-tight text-[#1a2b4a] sm:text-3xl lg:text-[34px] dark:text-foreground"
            >
              {csrSection.commitment.title}
            </h3>
            <p
              data-commit-line
              className="mb-8 max-w-prose text-base leading-[1.9] text-[#5a6478] dark:text-foreground-muted"
            >
              {csrSection.commitment.description}
            </p>
            <blockquote data-commit-line className="relative border-l-2 border-engineering pl-5 sm:pl-6">
              <p className="text-base leading-[1.9] font-medium text-[#1a2b4a] sm:text-lg dark:text-foreground">
                {csrSection.commitment.manifesto.lead}
              </p>
              <p className="mt-3 text-sm font-semibold tracking-wide text-engineering sm:text-base">
                {csrSection.commitment.manifesto.closing}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
