"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { careersCta } from "@/data/careers-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CAREERS_BG_WHITE,
  CAREERS_FOCUS_RING_LIGHT,
  CAREERS_INNER,
  CAREERS_SECTION_PAD,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function CareersCTASection() {
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
        stagger: 0.08,
        scrollTrigger: { trigger: content, start: "top 88%", toggleActions: "play none none none" },
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className={`scroll-mt-28 ${CAREERS_BG_WHITE} ${CAREERS_SECTION_PAD}`}
      aria-label="Careers call to action"
    >
      <div className={CAREERS_INNER}>
        <div className="relative overflow-hidden rounded-[32px] border border-[#e8edf2] shadow-[0_20px_56px_rgba(15,23,42,0.14)] dark:border-border">
          <div className="absolute inset-0">
            <Image src={careersCta.backgroundImage} alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-[#0f1729]/82" />
          <div ref={contentRef} className="relative z-10 px-6 py-16 text-center sm:px-12 sm:py-20">
            <span data-cta-reveal className="mb-5 inline-block text-xs font-bold tracking-[0.24em] text-engineering-light">
              {careersCta.label}
            </span>
            <h2
              data-cta-reveal
              className="mx-auto max-w-[800px] text-[32px] font-bold leading-[1.12] text-white sm:text-[40px] lg:text-[48px]"
            >
              {careersCta.headline}
            </h2>
            <p data-cta-reveal className="mx-auto mt-5 max-w-2xl text-base leading-[1.85] text-white/75 sm:text-lg">
              {careersCta.description}
            </p>
            <div data-cta-reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={careersCta.primaryCta.href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-engineering px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-[#1a7ab8] sm:w-auto ${CAREERS_FOCUS_RING_LIGHT}`}
              >
                {careersCta.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={careersCta.secondaryCta.href}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] sm:w-auto ${CAREERS_FOCUS_RING_LIGHT}`}
              >
                {careersCta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
