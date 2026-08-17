"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { executiveMessages, leadershipMessageSection } from "@/data/about";
import { ABOUT_BG_SURFACE, ABOUT_INNER, ABOUT_SECTION_PAD, ABOUT_PORTRAIT, ABOUT_NAV_BTN, ABOUT_TAB_PILL } from "./constants";

gsap.registerPlugin(ScrollTrigger);

const PORTRAIT_CLASS = ABOUT_PORTRAIT;

function MessageBlueprint() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[#1a2b4a]/[0.025] dark:text-foreground/[0.03]"
      viewBox="0 0 1440 800"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 160H1440M0 320H1440M0 480H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M240 0V800M480 0V800M720 0V800M960 0V800M1200 0V800" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export default function AboutChairmanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);
  const touchStartX = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = executiveMessages[activeIndex];
  const total = executiveMessages.length;

  const goTo = useCallback((index: number) => {
    const next = ((index % total) + total) % total;
    setActiveIndex(next);
  }, [total]);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  useEffect(() => {
    const portrait = portraitRef.current;
    const message = messageRef.current;
    if (!portrait || !message) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.7 } });
      tl.to([portrait, message], { opacity: 0, duration: 0.25 })
        .fromTo(portrait, { scale: 1.03, opacity: 0 }, { scale: 1, opacity: 1 }, 0.2)
        .fromTo(message, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, 0.25)
        .from(message.querySelectorAll("[data-msg-line]"), { y: 16, opacity: 0, stagger: 0.08 }, 0.35)
        .from(message.querySelector("[data-signature]"), { y: 12, opacity: 0 }, 0.55);
    });

    return () => ctx.revert();
  }, [activeIndex]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector("[data-leadership-carousel]"), {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", toggleActions: "play none none none" },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${ABOUT_BG_SURFACE} ${ABOUT_SECTION_PAD}`}
      aria-label="Executive leadership messages"
    >
      <MessageBlueprint />
      <div className={ABOUT_INNER}>
        <SectionHeading
          label={leadershipMessageSection.label}
          title={leadershipMessageSection.title}
          description={leadershipMessageSection.subtitle}
          align="center"
        />

        <div
          data-leadership-carousel
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Leadership messages"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-10">
            {/* Portrait */}
            <div
              ref={portraitRef}
              className="group relative mx-auto w-full max-w-[420px] lg:mx-0 lg:max-w-none"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[32px] shadow-[0_20px_56px_rgba(15,23,42,0.12)] ring-1 ring-[#e8edf2] transition-transform duration-700 group-hover:scale-[1.02] dark:ring-border">
                <Image
                  key={active.image}
                  src={active.image}
                  alt={active.name}
                  fill
                  className={PORTRAIT_CLASS}
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  priority={activeIndex === 0}
                  loading={activeIndex === 0 ? undefined : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/25 via-transparent to-transparent" />
              </div>
            </div>

            {/* Message card */}
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-engineering/40" aria-hidden />
              <div
                ref={messageRef}
                className="relative rounded-[28px] border border-[#e8edf2] bg-[#fafbfd] p-6 pl-8 sm:p-8 sm:pl-10 dark:border-border dark:bg-surface"
              >
                <span
                  className="pointer-events-none absolute top-6 right-6 select-none font-serif text-[120px] leading-none text-engineering/[0.05] sm:text-[140px]"
                  aria-hidden
                >
                  &ldquo;
                </span>

                <span data-msg-line className="section-label mb-3 block">
                  {active.roleLabel}
                </span>
                <h3 data-msg-line className="mb-1 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {active.name}
                </h3>
                <p data-msg-line className="mb-6 text-sm font-medium text-engineering">
                  {active.designation}
                </p>

                <p
                  data-msg-line
                  className="relative mb-4 max-w-[640px] text-lg font-medium leading-[1.75] text-[#1a2b4a] sm:text-xl dark:text-foreground"
                >
                  &ldquo;{active.quote}&rdquo;
                </p>
                <p
                  data-msg-line
                  className="mb-8 max-w-[640px] text-sm leading-[1.9] text-[#5a6478] sm:text-base dark:text-foreground-muted"
                >
                  {active.message}
                </p>

                <div data-signature className="border-t border-[#e8edf2] pt-6 dark:border-border">
                  <p className="text-xl font-semibold italic tracking-wide text-[#1a2b4a] dark:text-foreground">
                    {active.signature}
                  </p>
                  <p className="mt-1 text-sm font-medium text-engineering">{active.designation}</p>
                  <p className="mt-0.5 text-xs font-semibold tracking-wider text-[#5a6478] uppercase dark:text-foreground-muted">
                    {active.company}
                  </p>
                </div>

                {/* Navigation — bottom right */}
                <div className="mt-8 flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex gap-2" role="tablist" aria-label="Select executive message">
                    {executiveMessages.map((msg, i) => (
                      <button
                        key={msg.id}
                        type="button"
                        role="tab"
                        aria-selected={i === activeIndex}
                        onClick={() => goTo(i)}
                        className={`${ABOUT_TAB_PILL} min-w-0 px-4 ${
                          i === activeIndex
                            ? "bg-engineering text-white shadow-[0_4px_16px_rgba(33,140,206,0.3)]"
                            : "text-[#94a3b8] hover:text-engineering"
                        }`}
                      >
                        {msg.roleLabel}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span className="text-xs font-semibold tracking-wider text-[#5a6478] dark:text-foreground-muted">
                      {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Previous message"
                        className={ABOUT_NAV_BTN}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Next message"
                        className={ABOUT_NAV_BTN}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
