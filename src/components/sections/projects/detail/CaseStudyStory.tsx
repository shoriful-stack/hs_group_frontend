"use client";

import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  Building2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Compass,
  Cpu,
  Factory,
  FileCheck,
  Globe2,
  Leaf,
  Lightbulb,
  Lock,
  Map,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  Users,
  Wallet,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectCaseStudy } from "@/data/project-case-study";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  PROJECTS_BG_SURFACE,
  PROJECTS_BG_WHITE,
  PROJECTS_BLOCK_SPACING,
  PROJECTS_BODY,
  PROJECTS_CARD,
  PROJECTS_CARD_GAP,
  PROJECTS_CARD_HOVER,
  PROJECTS_GRID_GAP,
  PROJECTS_ICON_BOX,
  PROJECTS_ICON_STROKE,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
} from "../constants";

const challengeColumns: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  key: "painPoints" | "constraints" | "risks";
}[] = [
  {
    title: "Pain Points",
    subtitle: "Operational pressure",
    icon: AlertTriangle,
    key: "painPoints",
  },
  {
    title: "Constraints",
    subtitle: "Delivery boundaries",
    icon: Lock,
    key: "constraints",
  },
  {
    title: "Risk Factors",
    subtitle: "Exposure to watch",
    icon: ShieldAlert,
    key: "risks",
  },
];

const solutionBlocks: {
  title: string;
  key: "strategy" | "design" | "execution" | "innovation" | "sustainability";
  icon: LucideIcon;
}[] = [
  { title: "Strategy", key: "strategy", icon: Map },
  { title: "Design Approach", key: "design", icon: Compass },
  { title: "Execution", key: "execution", icon: Wrench },
  { title: "Innovation", key: "innovation", icon: Lightbulb },
  { title: "Sustainability", key: "sustainability", icon: Leaf },
];

gsap.registerPlugin(ScrollTrigger);

export function CaseStudyOverview({ study }: { study: ProjectCaseStudy }) {
  const facts: { label: string; value: string; icon: LucideIcon }[] = [
    { label: "Client", value: study.client, icon: Building2 },
    { label: "Industry", value: study.industry, icon: Factory },
    { label: "Country", value: study.country, icon: Globe2 },
    { label: "Location", value: study.location, icon: MapPin },
    { label: "Project Value", value: study.projectValueDisplay, icon: Wallet },
    { label: "Duration", value: study.duration, icon: Clock },
    { label: "Completion", value: study.completion, icon: CalendarCheck },
    { label: "Lead Engineer", value: study.leadEngineer, icon: UserRound },
  ];

  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="project-overview">
      <div className={PROJECTS_INNER}>
        <div className={`grid lg:grid-cols-[1.15fr_0.85fr] ${PROJECTS_GRID_GAP}`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Project Overview
            </p>
            <h2 id="project-overview" className="mb-5 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Engineering Story
            </h2>
            <p className={`mb-6 text-lg font-medium text-[#1a2b4a] dark:text-foreground`}>{study.overview}</p>
            <p className={PROJECTS_BODY}>{study.executiveSummary}</p>
          </div>

          <aside
            className={`${PROJECTS_CARD} h-fit overflow-hidden`}
            aria-label="Project facts"
          >
            <div className="border-b border-[#e8edf2] bg-[#fafbfd] px-5 py-5 sm:px-6 dark:border-border dark:bg-surface">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
                    At a Glance
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    Project Facts
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-engineering/25 bg-engineering/10 px-3 py-1 text-[11px] font-bold tracking-wide text-engineering uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-engineering" aria-hidden />
                  {study.status}
                </span>
              </div>
            </div>

            <dl className="grid sm:grid-cols-2 sm:divide-x sm:divide-[#e8edf2] dark:sm:divide-border">
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label}
                    className="group flex gap-3 border-b border-[#e8edf2] px-5 py-4 transition-colors duration-300 last:border-b-0 hover:bg-engineering/[0.03] sm:odd:border-r-0 dark:border-border [&:nth-last-child(-n+2)]:sm:border-b-0"
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-400 group-hover:scale-105">
                      <Icon className="h-4 w-4" strokeWidth={PROJECTS_ICON_STROKE} aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[10px] font-bold tracking-[0.16em] text-[#94a3b8] uppercase">
                        {f.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-snug font-semibold text-[#1a2b4a] dark:text-foreground">
                        {f.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyStats({ study }: { study: ProjectCaseStudy }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  const statIcons: Record<string, LucideIcon> = {
    Engineers: Users,
    "Man-hours": Clock,
    Completion: CheckCircle2,
    "Quality Gates": ShieldCheck,
    Systems: Cpu,
    "Handover Docs": FileCheck,
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = grid.querySelectorAll("[data-stat-card]");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          stagger: 0.07,
          immediateRender: false,
          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
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
            duration: 1.6,
            ease: "power2.out",
            snap: { innerText: 1 },
            immediateRender: false,
            scrollTrigger: {
              trigger: grid,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, grid);

    return () => ctx.revert();
  }, [reducedMotion, study.slug]);

  return (
    <section
      className={`${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`}
      aria-label="Project statistics"
    >
      <div className={PROJECTS_INNER}>
        <div className={`${PROJECTS_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Delivery Metrics
            </p>
            <h2 className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Project Performance
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            Quantified outcomes from engineering effort, quality control, and documented handover.
          </p>
        </div>

        <div
          className="rounded-[28px] border border-[#e8edf2] bg-white p-4 shadow-[0_8px_32px_rgba(15,23,42,0.06)] sm:p-6 dark:border-border dark:bg-card"
          role="region"
          aria-label="Project performance statistics"
        >
          <div
            ref={gridRef}
            className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 ${PROJECTS_CARD_GAP}`}
          >
            {study.stats.map((stat) => {
              const Icon = statIcons[stat.label] ?? CheckCircle2;
              return (
                <div
                  key={stat.label}
                  data-stat-card
                  className={`group flex min-h-[148px] flex-col items-center justify-center rounded-[20px] border border-[#e8edf2] bg-[#fafbfd] px-3 py-6 text-center transition-all duration-500 sm:min-h-[168px] sm:px-4 sm:py-7 dark:border-border dark:bg-surface ${PROJECTS_CARD_HOVER} hover:border-engineering hover:bg-white hover:shadow-[0_0_24px_rgba(33,140,206,0.08)] dark:hover:bg-card`}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(33,140,206,0.25)]">
                    <Icon className="h-5 w-5" strokeWidth={PROJECTS_ICON_STROKE} aria-hidden />
                  </div>
                  <p className="mb-2 text-2xl font-bold tracking-tight text-[#1a2b4a] sm:text-[28px] lg:text-[30px] dark:text-foreground">
                    <span data-count={stat.value}>
                      {reducedMotion ? stat.value : 0}
                    </span>
                    {stat.suffix}
                  </p>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-[#5a6478] uppercase dark:text-foreground-muted">
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

export function CaseStudyStory({
  study,
  embedded = false,
}: {
  study: ProjectCaseStudy;
  embedded?: boolean;
}) {
  const challenge = (
    <section id="challenge" className={embedded ? `${PROJECTS_BLOCK_SPACING} scroll-mt-28` : `scroll-mt-28 ${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`}>
      <div className={embedded ? "" : PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Challenge</p>
        <h2 className="mb-5 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Client Challenge
        </h2>
        <p className="mb-8 max-w-3xl text-lg font-medium leading-[1.75] text-[#1a2b4a] lg:mb-10 dark:text-foreground">
          {study.challenge.statement}
        </p>
        <div className={`grid md:grid-cols-3 ${PROJECTS_GRID_GAP}`}>
          {challengeColumns.map((col) => {
            const Icon = col.icon;
            const items = study.challenge[col.key];
            return (
              <article
                key={col.title}
                className={`group ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER} flex h-full flex-col overflow-hidden`}
              >
                <div className="h-1 w-full bg-engineering" aria-hidden />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className={`mb-5 ${PROJECTS_ICON_BOX}`}>
                    <Icon className="h-5 w-5" strokeWidth={PROJECTS_ICON_STROKE} aria-hidden />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    {col.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-engineering uppercase">
                    {col.subtitle}
                  </p>
                  <ul className="mt-6 space-y-3.5">
                    {items.map((item, i) => (
                      <li key={item} className="flex gap-3">
                        <span
                          className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-engineering/20 bg-engineering/5 text-[11px] font-bold text-engineering"
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );

  const solution = (
    <section id="solution" className={embedded ? "scroll-mt-28" : `scroll-mt-28 ${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`}>
      <div className={embedded ? "" : PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
          Analysis → Solution
        </p>
        <h2 className="mb-5 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Engineering Solution
        </h2>
        <p className="mb-8 max-w-3xl text-base leading-[1.85] text-[#5a6478] lg:mb-10 dark:text-foreground-muted">
          From strategy through sustainability — how HS Group structured delivery for this program.
        </p>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${PROJECTS_CARD_GAP}`}>
          {solutionBlocks.map((block, i) => {
            const Icon = block.icon;
            return (
              <article
                key={block.title}
                className={`group ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER} flex h-full flex-col overflow-hidden`}
              >
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className={PROJECTS_ICON_BOX}>
                      <Icon className="h-5 w-5" strokeWidth={PROJECTS_ICON_STROKE} aria-hidden />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.18em] text-engineering/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    {block.title}
                  </h3>
                  <p className="text-sm leading-[1.8] text-[#5a6478] dark:text-foreground-muted">
                    {study.solution[block.key]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-12 lg:mt-16">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
                Targets
              </p>
              <h3 className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
                Objectives
              </h3>
            </div>
            <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
              Clear outcomes that guided design decisions and field execution.
            </p>
          </div>
          <ul className={`grid sm:grid-cols-2 ${PROJECTS_CARD_GAP}`}>
            {study.objectives.map((obj, i) => (
              <li
                key={obj}
                className={`group ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER} flex gap-4 p-5 sm:p-6`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(33,140,206,0.25)]">
                  <CheckCircle2 className="h-5 w-5" strokeWidth={PROJECTS_ICON_STROKE} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-engineering uppercase">
                    Objective {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-[1.8] font-medium text-[#1a2b4a] dark:text-foreground">
                    {obj}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {challenge}
      {solution}
    </>
  );
}
