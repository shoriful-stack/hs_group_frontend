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
  SERVICES_BG_WHITE,
  SERVICES_BODY_SM,
  SERVICES_CARD,
  SERVICES_CARD_GAP,
  SERVICES_CARD_HOVER,
  SERVICES_ICON_BOX,
  SERVICES_ICON_STROKE,
  SERVICES_INNER,
  SERVICES_SECTION_PAD,
} from "../constants";

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

/** Same layout/content as About Industries Served */
export default function ServiceDetailIndustriesSection() {
  return (
    <section
      className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`}
      aria-label="Industries served"
    >
      <div className={SERVICES_INNER}>
        <div className="mb-10 max-w-2xl">
          <SectionHeading
            label="INDUSTRIES SERVED"
            title="Engineering Across Critical Sectors"
            description="Multidisciplinary delivery capability spanning utilities, telecom, industry, government, and smart infrastructure."
            align="left"
          />
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 ${SERVICES_CARD_GAP}`}>
          {projectIndustries.map((item) => {
            const Icon = icons[item.icon] ?? Building2;
            return (
              <article
                key={item.id}
                className={`group p-6 ${SERVICES_CARD} ${SERVICES_CARD_HOVER}`}
              >
                <div className={`mb-5 ${SERVICES_ICON_BOX}`}>
                  <Icon strokeWidth={SERVICES_ICON_STROKE} className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {item.title}
                </h3>
                <p className={SERVICES_BODY_SM}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
