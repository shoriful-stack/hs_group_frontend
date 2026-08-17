"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { newsCta } from "@/data/news";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  NEWS_BG_SURFACE,
  NEWS_FOCUS_RING_LIGHT,
  NEWS_INNER,
  NEWS_SECTION_PAD,
} from "./constants";

gsap.registerPlugin(ScrollTrigger);

export default function NewsCTASection() {
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
      aria-label="News call to action"
      className={`${NEWS_BG_SURFACE} ${NEWS_SECTION_PAD}`}
    >
      <div className={NEWS_INNER}>
        <div className="group relative overflow-hidden rounded-[32px] border border-[#e8edf2] shadow-[0_20px_56px_rgba(15,23,42,0.14)] dark:border-border">
          <div className="absolute inset-0">
            <Image
              src={newsCta.backgroundImage}
              alt=""
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-[#0f1729]/82" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f1729]/40 via-transparent to-[#0f1729]/60" />

          <div
            ref={contentRef}
            className="relative z-10 px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-24"
          >
            <span
              data-cta-reveal
              className="mb-5 inline-block text-xs font-bold tracking-[0.24em] text-engineering-light sm:text-[13px]"
            >
              {newsCta.label}
            </span>
            <h2
              data-cta-reveal
              className="mx-auto max-w-[760px] text-[32px] font-bold leading-[1.12] tracking-tight text-white sm:text-[40px] lg:text-[48px]"
            >
              {newsCta.headline}
            </h2>
            <p
              data-cta-reveal
              className="mx-auto mt-6 max-w-[640px] text-base leading-[1.9] text-white/75"
            >
              {newsCta.description}
            </p>
            <div
              data-cta-reveal
              className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
            >
              <Link
                href={newsCta.primaryCta.href}
                className={`btn-primary group inline-flex w-full items-center justify-center transition-all duration-[400ms] hover:-translate-y-0.5 sm:w-auto ${NEWS_FOCUS_RING_LIGHT}`}
              >
                {newsCta.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
              <Link
                href={newsCta.secondaryCta.href}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] sm:w-auto ${NEWS_FOCUS_RING_LIGHT}`}
              >
                {newsCta.secondaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
