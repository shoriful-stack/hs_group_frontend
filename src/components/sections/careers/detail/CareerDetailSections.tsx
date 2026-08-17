"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CareerDetail } from "@/data/career-detail";
import type { CareerJob } from "@/data/careers-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CAREERS_BG_SURFACE,
  CAREERS_BG_WHITE,
  CAREERS_BLOCK_SPACING,
  CAREERS_BODY_SM,
  CAREERS_CARD,
  CAREERS_CARD_GAP,
  CAREERS_CARD_HOVER,
  CAREERS_FOCUS_RING,
  CAREERS_FOCUS_RING_LIGHT,
  CAREERS_INNER,
  CAREERS_SECTION_PAD,
  CINEMATIC_IMAGE,
} from "../constants";

gsap.registerPlugin(ScrollTrigger);

export function CareerDetailRelated({ jobs }: { jobs: CareerJob[] }) {
  if (jobs.length === 0) return null;

  return (
    <section
      id="related-roles"
      className={`scroll-mt-28 ${CAREERS_BG_WHITE} ${CAREERS_SECTION_PAD}`}
      aria-labelledby="related-roles-heading"
    >
      <div className={CAREERS_INNER}>
        <div className={CAREERS_BLOCK_SPACING}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
            Related Roles
          </p>
          <h2
            id="related-roles-heading"
            className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
          >
            Other Opportunities
          </h2>
        </div>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${CAREERS_CARD_GAP}`}>
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.slug}`}
              className={`group flex h-full flex-col p-6 ${CAREERS_CARD} ${CAREERS_CARD_HOVER} ${CAREERS_FOCUS_RING}`}
            >
              <span className="mb-3 text-[10px] font-bold tracking-wide text-engineering uppercase">
                {job.department}
              </span>
              <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                {job.title}
              </h3>
              <p className={`mb-4 line-clamp-2 flex-1 ${CAREERS_BODY_SM}`}>{job.summary}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                View Role
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CareerDetailCTA({ job }: { job: CareerDetail }) {
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
      className={`scroll-mt-28 ${CAREERS_BG_SURFACE} ${CAREERS_SECTION_PAD}`}
      aria-label="Career call to action"
    >
      <div className={CAREERS_INNER}>
        <div className="relative overflow-hidden rounded-[32px] border border-[#e8edf2] shadow-[0_20px_56px_rgba(15,23,42,0.14)] dark:border-border">
          <div className="absolute inset-0">
            <Image src={job.image} alt="" fill className={CINEMATIC_IMAGE} sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-[#0f1729]/82" />
          <div ref={contentRef} className="relative z-10 px-6 py-16 text-center sm:px-12 sm:py-20">
            <span
              data-cta-reveal
              className="mb-5 inline-block text-xs font-bold tracking-[0.24em] text-engineering-light"
            >
              JOIN HS GROUP
            </span>
            <h2
              data-cta-reveal
              className="mx-auto max-w-[800px] text-[32px] font-bold leading-[1.12] text-white sm:text-[40px]"
            >
              Ready to Apply for {job.title}?
            </h2>
            <div
              data-cta-reveal
              className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              <a
                href="#apply"
                className={`inline-flex items-center justify-center gap-2 rounded-full bg-engineering px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-[#1a7ab8] ${CAREERS_FOCUS_RING_LIGHT}`}
              >
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/careers"
                className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] ${CAREERS_FOCUS_RING_LIGHT}`}
              >
                Back to Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
