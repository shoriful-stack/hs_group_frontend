"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projectsCta } from "@/data/projects-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  PROJECTS_BG_WHITE,
  PROJECTS_FOCUS_RING_LIGHT,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(content.querySelectorAll("[data-cta-reveal]"), {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: content,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Projects call to action"
      className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`}
    >
      <div className={PROJECTS_INNER}>
        <div className="group relative overflow-hidden rounded-[32px] border border-[#e8edf2] shadow-[0_20px_56px_rgba(15,23,42,0.14)] dark:border-border">
          <div className="absolute inset-0">
            <Image
              src={projectsCta.backgroundImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[#0f1729]/82" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1729]/40 via-transparent to-[#0f1729]/60" />
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

          <div
            ref={contentRef}
            className="relative z-10 px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-24"
          >
            <span
              data-cta-reveal
              className="mb-5 inline-block text-xs font-bold tracking-[0.24em] text-engineering-light sm:text-[13px]"
            >
              {projectsCta.label}
            </span>
            <h2
              data-cta-reveal
              className="mx-auto max-w-[760px] text-[32px] font-bold leading-[1.12] tracking-tight text-white sm:text-[40px] lg:text-[48px]"
            >
              {projectsCta.headline}
            </h2>
            <p
              data-cta-reveal
              className="mx-auto mt-5 max-w-2xl text-base leading-[1.85] text-white/75 sm:text-lg"
            >
              {projectsCta.description}
            </p>
            <div
              data-cta-reveal
              className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
            >
              <Link
                href={projectsCta.primaryCta.href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-engineering px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-[#1a7ab8] hover:shadow-[0_14px_36px_rgba(33,140,206,0.38)] sm:w-auto ${PROJECTS_FOCUS_RING_LIGHT}`}
              >
                {projectsCta.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
              <Link
                href={projectsCta.secondaryCta.href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] sm:w-auto ${PROJECTS_FOCUS_RING_LIGHT}`}
              >
                {projectsCta.secondaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
