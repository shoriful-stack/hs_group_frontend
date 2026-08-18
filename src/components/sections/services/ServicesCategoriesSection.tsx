"use client";

import {
  Building2,
  Cpu,
  Monitor,
  Network,
  Radio,
  Shield,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ServiceCategoryView } from "@/types/home";
import {
  SERVICES_BG_SURFACE,
  SERVICES_CARD,
  SERVICES_CARD_HOVER,
  SERVICES_FOCUS_RING,
  SERVICES_ICON_BOX,
  SERVICES_ICON_STROKE,
  SERVICES_INNER,
  SERVICES_SECTION_PAD,
} from "./constants";

const icons: LucideIcon[] = [Zap, Radio, Building2, Sun, Cpu, Network, Shield, Monitor];

const iconByKeyword: Array<[string, LucideIcon]> = [
  ["power", Zap],
  ["energy", Zap],
  ["telecom", Radio],
  ["civil", Building2],
  ["solar", Sun],
  ["renewable", Sun],
  ["automation", Cpu],
  ["iot", Cpu],
  ["smart", Network],
  ["security", Shield],
  ["digital", Monitor],
];

function categoryIcon(slug: string, index: number): LucideIcon {
  const key = slug.toLowerCase();
  const match = iconByKeyword.find(([keyword]) => key.includes(keyword));
  return match?.[1] ?? icons[index % icons.length] ?? Building2;
}

export default function ServicesCategoriesSection({
  categories = [],
}: {
  categories?: ServiceCategoryView[];
}) {
  const items = Array.isArray(categories) ? categories : [];
  if (items.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-label="Service categories">
      <div className={SERVICES_INNER}>
        <div className="mb-10 max-w-2xl">
          <SectionHeading
            label="SERVICE CATEGORIES"
            title="Engineering Domains We Cover"
            description="Explore capability areas spanning power, telecom, civil, renewable, automation, and digital infrastructure."
            align="left"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((cat, index) => {
            const Icon = categoryIcon(cat.slug, index);
            return (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("services-filter", { detail: cat.slug }));
                  document.getElementById("services-grid")?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`group relative overflow-hidden p-6 text-left ${SERVICES_CARD} ${SERVICES_CARD_HOVER} ${SERVICES_FOCUS_RING}`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-engineering transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                <div className="mb-5 flex items-start justify-between">
                  <div className={SERVICES_ICON_BOX}>
                    <Icon strokeWidth={SERVICES_ICON_STROKE} className="h-5 w-5" aria-hidden />
                  </div>
                  <span className="text-xs font-bold tracking-[0.16em] text-[#c5ced8] transition-colors group-hover:text-engineering">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {cat.name}
                </h3>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
