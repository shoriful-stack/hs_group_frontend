"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LogoMarquee from "@/components/ui/LogoMarquee";
import type { PartnerLogoView } from "@/types/home";

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

function textOrEmpty(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function sanitizePartnerLogos(value: unknown): PartnerLogoView[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const logos: PartnerLogoView[] = [];

  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const name = textOrEmpty(row.name);
    if (!name || seen.has(name)) continue;
    seen.add(name);

    const logo = textOrEmpty(row.logo) || undefined;
    const category = textOrEmpty(row.category) || undefined;
    const brandColor = textOrEmpty(row.brandColor) || undefined;

    logos.push({ name, ...(logo ? { logo } : {}), ...(category ? { category } : {}), ...(brandColor ? { brandColor } : {}) });
  }

  return logos;
}

type TrustNetworkSectionProps = {
  logos?: PartnerLogoView[] | null;
  label?: string | null;
  title?: string | null;
  subtitle?: string | null;
};

export default function TrustNetworkSection({
  logos,
  label,
  title,
  subtitle,
}: TrustNetworkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const items = sanitizePartnerLogos(logos);
  const headingLabel = textOrEmpty(label);
  const headingTitle = textOrEmpty(title);
  const headingSubtitle = textOrEmpty(subtitle);
  const hasHeading = Boolean(headingLabel || headingTitle || headingSubtitle);
  const midpoint = Math.ceil(items.length / 2);
  const topRow = items.slice(0, midpoint);
  const bottomRow = items.slice(midpoint);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    if (!section || !header) return;

    try {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const ctx = gsap.context(() => {
        gsap.set(header, { opacity: 0, y: 32 });
        gsap.to(header, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }, section);

      return () => ctx.revert();
    } catch {
      return;
    }
  }, [hasHeading]);

  if (items.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="trust-network"
      aria-labelledby={headingTitle ? "trust-network-heading" : undefined}
      className="relative w-full overflow-hidden bg-[#fafbfd] py-24 sm:py-28 lg:py-32 dark:bg-background"
    >
      <BlueprintBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {hasHeading ? (
          <div ref={headerRef} className="mx-auto mb-14 max-w-4xl text-center lg:mb-16">
            {headingLabel ? (
              <span className="mb-5 block text-xs font-bold tracking-[0.24em] text-engineering sm:text-[13px]">
                {headingLabel}
              </span>
            ) : null}
            {headingTitle ? (
              <h2
                id="trust-network-heading"
                className="mb-6 text-[32px] font-bold leading-[1.15] tracking-tight text-[#1a2b4a] sm:text-[40px] lg:text-[48px] dark:text-foreground"
              >
                {headingTitle}
              </h2>
            ) : null}
            {headingSubtitle ? (
              <p className="mx-auto max-w-3xl text-base leading-[1.9] text-[#5a6478] sm:text-[17px] dark:text-foreground-muted">
                {headingSubtitle}
              </p>
            ) : null}
          </div>
        ) : null}

        <div className="space-y-5 sm:space-y-6">
          {topRow.length > 0 ? (
            <LogoMarquee
              items={topRow}
              direction="ltr"
              duration={23}
              ariaLabel="Trusted clients and partners marquee row one"
            />
          ) : null}
          {bottomRow.length > 0 ? (
            <LogoMarquee
              items={bottomRow}
              direction="rtl"
              duration={21}
              ariaLabel="Trusted clients and partners marquee row two"
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
