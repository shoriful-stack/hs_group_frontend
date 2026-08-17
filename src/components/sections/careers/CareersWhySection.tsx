"use client";

import {
  Briefcase,
  GraduationCap,
  HeartHandshake,
  Rocket,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { careersWhy } from "@/data/careers-page";
import {
  CAREERS_BG_WHITE,
  CAREERS_BLOCK_SPACING,
  CAREERS_BODY_SM,
  CAREERS_CARD,
  CAREERS_CARD_GAP,
  CAREERS_CARD_HOVER,
  CAREERS_ICON_BOX,
  CAREERS_ICON_STROKE,
  CAREERS_INNER,
  CAREERS_SECTION_PAD,
} from "./constants";

const icons: Record<string, LucideIcon> = {
  Briefcase,
  GraduationCap,
  ShieldCheck,
  Rocket,
  Users,
  HeartHandshake,
};

export default function CareersWhySection() {
  return (
    <section
      id="why-join"
      className={`scroll-mt-28 ${CAREERS_BG_WHITE} ${CAREERS_SECTION_PAD}`}
      aria-labelledby="why-join-heading"
    >
      <div className={CAREERS_INNER}>
        <div className={`${CAREERS_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              {careersWhy.label}
            </p>
            <h2
              id="why-join-heading"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              {careersWhy.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            {careersWhy.description}
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${CAREERS_CARD_GAP}`}>
          {careersWhy.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Briefcase;
            return (
              <article
                key={item.title}
                className={`group flex h-full flex-col overflow-hidden ${CAREERS_CARD} ${CAREERS_CARD_HOVER}`}
              >
                <div className="h-1 w-full bg-engineering" aria-hidden />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <div className={CAREERS_ICON_BOX}>
                      <Icon className="h-5 w-5" strokeWidth={CAREERS_ICON_STROKE} aria-hidden />
                    </div>
                    <span className="text-[11px] font-bold tracking-[0.18em] text-engineering/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                    {item.title}
                  </h3>
                  <p className={CAREERS_BODY_SM}>{item.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
