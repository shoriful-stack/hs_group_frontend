"use client";

import {
  BadgeCheck,
  Building2,
  Cpu,
  Fuel,
  Landmark,
  Network,
  Radio,
  Sparkles,
  Sun,
  Trophy,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { projectAwards, projectIndustries } from "@/data/projects-page";
import {
  PROJECTS_BG_SURFACE,
  PROJECTS_BODY_SM,
  PROJECTS_CARD,
  PROJECTS_CARD_HOVER,
  PROJECTS_ICON_BOX,
  PROJECTS_ICON_STROKE,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
} from "./constants";

const icons: Record<string, LucideIcon> = {
  Zap,
  Radio,
  Fuel,
  Building2,
  Sun,
  Cpu,
  Landmark,
  Network,
};

export default function ProjectsIndustriesSection() {
  return (
    <section
      className={`${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`}
      aria-label="Industries served"
    >
      <div className={PROJECTS_INNER}>
        <div className="mb-10 max-w-2xl">
          <SectionHeading
            label="INDUSTRIES SERVED"
            title="Engineering Across Critical Sectors"
            description="Multidisciplinary delivery capability spanning utilities, telecom, industry, government, and smart infrastructure."
            align="left"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projectIndustries.map((item) => {
            const Icon = icons[item.icon] ?? Building2;
            return (
              <article
                key={item.id}
                className={`group p-6 ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER}`}
              >
                <div className={`mb-5 ${PROJECTS_ICON_BOX}`}>
                  <Icon strokeWidth={PROJECTS_ICON_STROKE} className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {item.title}
                </h3>
                <p className={PROJECTS_BODY_SM}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProjectsAwardsSection() {
  const awardIcons: Record<string, LucideIcon> = {
    Trophy,
    ShieldCheck,
    BadgeCheck,
    Sparkles,
  };

  return (
    <section
      className={`${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`}
      aria-label="Project awards"
    >
      <div className={PROJECTS_INNER}>
        <div className="mb-10 max-w-2xl">
          <SectionHeading
            label="RECOGNITION"
            title="Awards & Project Excellence"
            description="Recognition for quality systems, safety leadership, and reliable engineering delivery."
            align="left"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projectAwards.map((award) => {
            const Icon = awardIcons[award.icon] ?? Trophy;
            return (
              <article
                key={award.id}
                className={`group p-6 text-center ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER}`}
              >
                <div className={`mx-auto mb-5 ${PROJECTS_ICON_BOX}`}>
                  <Icon strokeWidth={PROJECTS_ICON_STROKE} className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {award.title}
                </h3>
                <p className={PROJECTS_BODY_SM}>{award.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
