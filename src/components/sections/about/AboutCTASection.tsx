"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutCta } from "@/data/about";
import { ABOUT_BG_WHITE, ABOUT_INNER, ABOUT_SECTION_PAD, ABOUT_FOCUS_RING_LIGHT } from "./constants";

gsap.registerPlugin(ScrollTrigger);

function CtaBlueprint() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.04]"
      viewBox="0 0 1440 700"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 140H1440M0 280H1440M0 420H1440M0 560H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M240 0V700M480 0V700M720 0V700M960 0V700M1200 0V700" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export default function AboutCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    if (!section || !card) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (image) {
        gsap.fromTo(
          image.querySelector("img"),
          { scale: 1.08 },
          {
            scale: 1,
            duration: 1.4,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
          }
        );

        gsap.to(image.querySelector("img"), {
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      if (content) {
        gsap.from(content.querySelectorAll("[data-cta-reveal]"), {
          opacity: 0,
          y: 32,
          duration: 0.65,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: content, start: "top 88%", toggleActions: "play none none none" },
        });
      }

      const transmission = card.querySelector("[data-transmission-line]") as SVGPathElement | null;
      if (transmission) {
        const length = transmission.getTotalLength();
        gsap.set(transmission, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(transmission, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.inOut",
          scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-cta"
      aria-label="Contact HS Group"
      className={`${ABOUT_BG_WHITE} ${ABOUT_SECTION_PAD}`}
    >
      <div className={ABOUT_INNER}>
        <div
          ref={cardRef}
          className="group relative overflow-hidden rounded-[32px] border border-[#e8edf2] shadow-[0_20px_56px_rgba(15,23,42,0.14)] dark:border-border"
        >
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={aboutCta.backgroundImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority={false}
            />
          </div>

          <div className="absolute inset-0 bg-[#0f1729]/82 dark:bg-[#0a0f1a]/88" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1729]/40 via-transparent to-[#0f1729]/60" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-engineering/10 via-transparent to-engineering/5 opacity-60" />

          <CtaBlueprint />

          <svg
            className="pointer-events-none absolute inset-0 text-engineering/[0.12]"
            viewBox="0 0 1200 500"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden
          >
            <path
              data-transmission-line
              d="M40 320C200 240 360 360 520 280C680 200 840 160 1160 220"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <div className="light-sweep pointer-events-none opacity-30" aria-hidden />

          <div ref={contentRef} className="relative z-10 px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <span
              data-cta-reveal
              className="mb-5 inline-block text-xs font-bold tracking-[0.24em] text-engineering-light sm:text-[13px]"
            >
              {aboutCta.label}
            </span>

            <h2
              data-cta-reveal
              className="mx-auto max-w-[760px] text-[32px] font-bold leading-[1.12] tracking-tight text-white sm:text-[40px] lg:text-[48px]"
            >
              {aboutCta.headline}
            </h2>

            <p
              data-cta-reveal
              className="mx-auto mt-6 max-w-[760px] text-base leading-[1.9] text-white/80 sm:text-[17px]"
            >
              {aboutCta.subtitle}
            </p>

            <p
              data-cta-reveal
              className="mx-auto mt-4 max-w-[640px] text-sm leading-[1.85] text-white/65 sm:text-base"
            >
              {aboutCta.description}
            </p>

            <div
              data-cta-reveal
              className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
            >
              <Link
                href={aboutCta.primaryCta.href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-engineering px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-[#1a7ab8] hover:shadow-[0_14px_36px_rgba(33,140,206,0.38)] sm:w-auto ${ABOUT_FOCUS_RING_LIGHT}`}
              >
                {aboutCta.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
              <Link
                href={aboutCta.secondaryCta.href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] sm:w-auto ${ABOUT_FOCUS_RING_LIGHT}`}
              >
                {aboutCta.secondaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
