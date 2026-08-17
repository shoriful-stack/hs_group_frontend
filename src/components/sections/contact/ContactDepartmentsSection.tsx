"use client";

import {
  Briefcase,
  Calculator,
  HardHat,
  Headphones,
  Mail,
  Package,
  Phone,
  TrendingUp,
  Users,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { contactDepartments } from "@/data/contact";
import { useAboutReveal } from "@/components/sections/about/useAboutReveal";
import {
  CONTACT_BG_SURFACE,
  CONTACT_CARD,
  CONTACT_CARD_HOVER,
  CONTACT_FOCUS_RING,
  CONTACT_GRID_GAP,
  CONTACT_ICON_BOX,
  CONTACT_INNER,
  CONTACT_SECTION_PAD,
} from "./constants";

const iconMap = {
  HardHat,
  Briefcase,
  TrendingUp,
  Headphones,
  Calculator,
  Package,
  Users,
};

export default function ContactDepartmentsSection() {
  const gridRef = useAboutReveal<HTMLDivElement>({
    childSelector: "[data-dept-card]",
    stagger: 0.07,
  });

  return (
    <section
      className={`relative overflow-hidden ${CONTACT_BG_SURFACE} ${CONTACT_SECTION_PAD}`}
      aria-label="Department directory"
    >
      <div className={CONTACT_INNER}>
        <SectionHeading
          label={contactDepartments.label}
          title={contactDepartments.title}
          description={contactDepartments.subtitle}
          align="center"
        />
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${CONTACT_GRID_GAP}`}
        >
          {contactDepartments.items.map((dept) => {
            const Icon = iconMap[dept.icon as keyof typeof iconMap] ?? Users;
            return (
              <article
                key={dept.name}
                data-dept-card
                className={`group relative overflow-hidden p-6 ${CONTACT_CARD} ${CONTACT_CARD_HOVER}`}
              >
                <div className="light-sweep pointer-events-none" aria-hidden />
                <div className={`mb-5 ${CONTACT_ICON_BOX}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mb-1 text-base font-bold text-[#1a2b4a] dark:text-foreground">
                  {dept.name}
                </h3>
                <p className="mb-4 text-xs font-medium text-engineering">{dept.manager}</p>
                <ul className="space-y-2 text-sm text-[#5a6478] dark:text-foreground-muted">
                  <li>
                    <a
                      href={`mailto:${dept.email}`}
                      className={`inline-flex items-center gap-2 transition-colors hover:text-engineering ${CONTACT_FOCUS_RING}`}
                    >
                      <Mail className="h-3.5 w-3.5 text-engineering" aria-hidden />
                      {dept.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${dept.phone.replace(/\s/g, "")}`}
                      className={`inline-flex items-center gap-2 transition-colors hover:text-engineering ${CONTACT_FOCUS_RING}`}
                    >
                      <Phone className="h-3.5 w-3.5 text-engineering" aria-hidden />
                      {dept.phone}
                    </a>
                  </li>
                </ul>
                <p className="mt-4 border-t border-[#e8edf2] pt-4 text-[11px] font-semibold tracking-wide text-[#94a3b8] uppercase dark:border-border">
                  Response · {dept.responseTime}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
