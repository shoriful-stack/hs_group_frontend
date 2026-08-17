"use client";

import { useRef, useEffect } from "react";
import { Users, Briefcase, Building2, Calendar, Globe } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutStats } from "@/data/about";
import { ABOUT_BG_SURFACE, ABOUT_CARD_HOVER, ABOUT_INNER, ABOUT_SECTION_PAD } from "./constants";
import AboutBlueprint from "./AboutBlueprint";

gsap.registerPlugin(ScrollTrigger);

const iconMap = { Users, Briefcase, Building2, Calendar, Globe };

export default function AboutStatsSection() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll("[data-stat-card]");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.08,
          immediateRender: false,
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );

      grid.querySelectorAll("[data-count]").forEach((el) => {
        const target = Number(el.getAttribute("data-count"));
        if (Number.isNaN(target)) return;
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            immediateRender: false,
            scrollTrigger: {
              trigger: grid,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section className={`relative overflow-hidden ${ABOUT_BG_SURFACE} ${ABOUT_SECTION_PAD}`} aria-label="Company statistics">
      <AboutBlueprint />
      <div className={`relative z-10 ${ABOUT_INNER}`}>
        <div
          ref={gridRef}
          className="rounded-[28px] border border-[#e8edf2] bg-white p-4 shadow-[0_8px_32px_rgba(15,23,42,0.06)] sm:p-6 dark:border-border dark:bg-card"
          role="region"
          aria-label="Trust statistics"
        >
          {/*
            Mobile: 2 cols (all 5 visible — last card centered)
            Tablet: 3 cols
            Desktop: 5 cols
          */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-3">
            {aboutStats.map((stat, index) => {
              const Icon = iconMap[stat.icon as keyof typeof iconMap] ?? Building2;
              const isLastOddOnMobile = index === aboutStats.length - 1 && aboutStats.length % 2 === 1;

              return (
                <div
                  key={stat.label}
                  data-stat-card
                  className={`group flex min-h-[160px] flex-col items-center justify-center rounded-[20px] border border-[#e8edf2] bg-[#fafbfd] px-3 py-6 text-center transition-all duration-500 sm:min-h-[180px] sm:px-4 sm:py-8 dark:border-border dark:bg-card ${ABOUT_CARD_HOVER} hover:border-engineering hover:bg-white hover:shadow-[0_0_24px_rgba(33,140,206,0.08)] dark:hover:bg-card ${
                    isLastOddOnMobile ? "col-span-2 mx-auto w-full max-w-[calc(50%-0.375rem)] sm:col-span-1 sm:mx-0 sm:max-w-none" : ""
                  }`}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:shadow-[0_0_24px_rgba(33,140,206,0.25)] sm:mb-5 sm:h-12 sm:w-12">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <p className="mb-2 text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-[32px] dark:text-foreground">
                    <span data-count={stat.value}>{stat.value}</span>
                    {stat.suffix}
                  </p>
                  <p className="text-xs font-medium tracking-wide text-[#5a6478] sm:text-sm dark:text-foreground-muted">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
