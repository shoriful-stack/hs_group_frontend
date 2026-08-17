"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Building2,
  Cpu,
  Power,
  Radio,
  Shield,
  Sun,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  portfolioServices,
  serviceFilterCategories,
  type PortfolioService,
  type ServiceFilterCategory,
} from "@/data/services-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  SERVICES_BG_WHITE,
  SERVICES_BODY_SM,
  SERVICES_CARD,
  SERVICES_CARD_HOVER,
  SERVICES_FOCUS_RING,
  SERVICES_ICON_BOX,
  SERVICES_ICON_STROKE,
  SERVICES_INNER,
  SERVICES_SECTION_PAD,
  SERVICES_TAB_PILL,
} from "./constants";

const icons: Record<string, LucideIcon> = {
  Power, Radio, Sun, Building2, Zap, Cpu, Wrench, Shield, Bot,
};

function ServiceCard({ service }: { service: PortfolioService }) {
  const Icon = icons[service.icon] ?? Building2;
  return (
    <article
      id={`service-${service.slug}`}
      className={`group relative flex h-full scroll-mt-28 flex-col overflow-hidden ${SERVICES_CARD} ${SERVICES_CARD_HOVER}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className={`${CINEMATIC_IMAGE} transition-transform duration-700 ease-out group-hover:scale-[1.07]`}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729]/80 via-[#0f1729]/25 to-transparent transition-opacity duration-500 group-hover:via-[#0f1729]/40" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className={`${SERVICES_ICON_BOX} !h-11 !w-11 !bg-white/95 shadow-[0_8px_24px_rgba(15,23,42,0.18)]`}>
              <Icon strokeWidth={SERVICES_ICON_STROKE} className="h-5 w-5" aria-hidden />
            </div>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-white uppercase backdrop-blur-[2px]">
              {service.category}
            </span>
          </div>
          <h3 className="text-xl font-bold leading-snug text-white">{service.title}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className={`mb-5 line-clamp-2 ${SERVICES_BODY_SM}`}>{service.description}</p>

        <Link
          href={`/services/${service.slug}`}
          className={`mt-auto inline-flex items-center gap-2 border-t border-transparent pt-1 text-sm font-semibold text-engineering transition-all group-hover:gap-3 ${SERVICES_FOCUS_RING}`}
        >
          View Service Details
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function ServicesFilterGridSection() {
  const [category, setCategory] = useState<ServiceFilterCategory>("All Services");
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ServiceFilterCategory>).detail;
      if (detail) setCategory(detail);
    };
    window.addEventListener("services-filter", handler as EventListener);
    return () => window.removeEventListener("services-filter", handler as EventListener);
  }, []);

  const filtered = useMemo(() => {
    if (category === "All Services") return portfolioServices;
    return portfolioServices.filter((s) => s.category === category);
  }, [category]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" },
    );
  }, [filtered, reducedMotion]);

  return (
    <section
      id="services-grid"
      className={`scroll-mt-24 ${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`}
      aria-label="Complete services"
    >
      <div className={SERVICES_INNER}>
        <div className="mb-8 max-w-2xl">
          <SectionHeading
            label="COMPLETE SERVICES"
            title="Engineering Services Portfolio"
            description="Filter by capability domain to explore HS Group’s full multidisciplinary service offering."
            align="left"
          />
        </div>

        <div className="sticky top-20 z-20 -mx-4 mb-8 bg-white/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-[20px] sm:border sm:border-[#e8edf2] sm:px-4 sm:shadow-[0_8px_32px_rgba(15,23,42,0.06)] dark:bg-background/90 dark:sm:border-border">
          <div
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Service filters"
          >
            {serviceFilterCategories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`${SERVICES_TAB_PILL} ${
                    active
                      ? "border border-engineering bg-engineering text-white shadow-[0_8px_20px_rgba(33,140,206,0.25)]"
                      : "border border-[#e8edf2] bg-white text-[#5a6478] hover:border-engineering hover:text-engineering dark:border-border dark:bg-card dark:text-foreground-muted"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        <p className="mb-6 text-sm text-[#94a3b8]" aria-live="polite">
          Showing <span className="font-semibold text-[#1a2b4a] dark:text-foreground">{filtered.length}</span>{" "}
          service{filtered.length === 1 ? "" : "s"}
          {category !== "All Services" ? (
            <>
              {" "}
              in <span className="font-semibold text-engineering">{category}</span>
            </>
          ) : null}
        </p>

        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-7">
          {filtered.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
