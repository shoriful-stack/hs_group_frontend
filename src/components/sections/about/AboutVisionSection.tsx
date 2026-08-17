"use client";

import {
  BadgeCheck, Compass, Gem, Handshake, HardHat, Leaf, Scale, Sparkles, Target,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { foundationSection, visionMissionValues } from "@/data/about";
import { ABOUT_BG_WHITE, ABOUT_INNER, ABOUT_SECTION_PAD } from "./constants";
import { useAboutReveal } from "./useAboutReveal";

const cardIcons = { Compass, Target, Gem };
const valueIcons = { Scale, Sparkles, BadgeCheck, HardHat, Leaf, Handshake };

const CARD_BASE =
  "group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-[#e8edf2] bg-white p-8 shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_20px_48px_rgba(33,140,206,0.12)] dark:border-border dark:bg-[#152238]";

function FoundationBlueprint() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-[#1a2b4a]/[0.02] dark:text-foreground/[0.025]"
      viewBox="0 0 1440 800"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 200H1440M0 400H1440M0 600H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M360 0V800M720 0V800M1080 0V800" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}

export default function AboutVisionSection() {
  const gridRef = useAboutReveal<HTMLDivElement>({ childSelector: "[data-vision-card]", stagger: 0.12 });

  return (
    <section className={`relative overflow-hidden ${ABOUT_BG_WHITE} ${ABOUT_SECTION_PAD}`}>
      <FoundationBlueprint />
      <div className={ABOUT_INNER}>
        <SectionHeading
          label={foundationSection.label}
          title={foundationSection.title}
          description={foundationSection.subtitle}
          align="center"
        />

        <div
          ref={gridRef}
          className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          {visionMissionValues.map((item) => {
            const Icon = cardIcons[item.icon as keyof typeof cardIcons] ?? Compass;
            const chips = "values" in item && item.values ? item.values : null;

            return (
              <article
                key={item.title}
                data-vision-card
                className={`${CARD_BASE} ${chips ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="light-sweep" aria-hidden />

                <div className="relative flex flex-1 flex-col">
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(33,140,206,0.22)]">
                    <Icon className="h-8 w-8" strokeWidth={1.5} />
                  </div>

                  <span className="section-label mb-3 block">{item.label}</span>
                  <h3 className="mb-4 text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mb-6 max-w-prose text-sm leading-[1.9] text-[#5a6478] dark:text-foreground-muted">
                      {item.description}
                    </p>
                  )}

                  {chips && (
                    <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                      {chips.map((chip) => {
                        const ChipIcon = valueIcons[chip.icon as keyof typeof valueIcons] ?? Scale;
                        return (
                          <button
                            key={chip.name}
                            type="button"
                            className="group/chip flex items-center gap-2 rounded-full border border-[#e8edf2] bg-[#fafbfd] px-3 py-2 text-left transition-all duration-400 hover:border-engineering hover:bg-engineering hover:text-white dark:border-border dark:bg-surface dark:hover:bg-engineering"
                          >
                            <ChipIcon className="h-3.5 w-3.5 shrink-0 text-engineering transition-colors duration-400 group-hover/chip:text-white" strokeWidth={1.75} />
                            <span className="text-[10px] font-bold tracking-[0.12em] text-[#1a2b4a] uppercase transition-colors duration-400 group-hover/chip:text-white dark:text-foreground">
                              {chip.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="mt-auto border-t border-[#e8edf2] pt-5 dark:border-border">
                    <div className="flex items-center gap-3">
                      <span className="h-px w-8 bg-engineering/60" aria-hidden />
                      <p className="text-xs font-semibold tracking-[0.14em] text-engineering uppercase">
                        {item.footer}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
