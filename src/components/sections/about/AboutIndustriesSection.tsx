"use client";

import {
  Building2,
  Cpu,
  Fuel,
  Landmark,
  Network,
  Radio,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { projectIndustries } from "@/data/projects-page";
import {
  ABOUT_BG_SURFACE,
  ABOUT_BODY_SM,
  ABOUT_CARD,
  ABOUT_CARD_HOVER,
  ABOUT_ICON_BOX,
  ABOUT_ICON_STROKE,
  ABOUT_INNER,
  ABOUT_SECTION_PAD,
} from "./constants";
import { useAboutReveal } from "./useAboutReveal";

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

export default function AboutIndustriesSection() {
  const gridRef = useAboutReveal<HTMLDivElement>({
    childSelector: "[data-industry]",
    stagger: 0.07,
  });

  return (
    <section
      className={`${ABOUT_BG_SURFACE} ${ABOUT_SECTION_PAD}`}
      aria-label="Industries served"
    >
      <div className={ABOUT_INNER}>
        <div className="mb-10 max-w-2xl">
          <SectionHeading
            label="INDUSTRIES SERVED"
            title="Engineering Across Critical Sectors"
            description="Multidisciplinary delivery capability spanning utilities, telecom, industry, government, and smart infrastructure."
            align="left"
          />
        </div>

        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projectIndustries.map((item) => {
            const Icon = icons[item.icon] ?? Building2;
            return (
              <article
                key={item.id}
                data-industry
                className={`group p-6 ${ABOUT_CARD} ${ABOUT_CARD_HOVER}`}
              >
                <div className={`mb-5 ${ABOUT_ICON_BOX}`}>
                  <Icon strokeWidth={ABOUT_ICON_STROKE} className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {item.title}
                </h3>
                <p className={ABOUT_BODY_SM}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
