"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Bot,
  ClipboardCheck,
  Cpu,
  DraftingCompass,
  FileCheck,
  Monitor,
  Network,
  Package,
  PenTool,
  Play,
  Power,
  Settings,
  ShieldCheck,
  Star,
  Trophy,
  Workflow,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectCaseStudy } from "@/data/project-case-study";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  PROJECTS_BG_SURFACE,
  PROJECTS_BG_WHITE,
  PROJECTS_BODY_SM,
  PROJECTS_CARD,
  PROJECTS_CARD_GAP,
  PROJECTS_CARD_HOVER,
  PROJECTS_FOCUS_RING,
  PROJECTS_ICON_BOX,
  PROJECTS_ICON_STROKE,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
  PROJECTS_TOUCH_TARGET,
} from "../constants";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  PenTool,
  DraftingCompass,
  Package,
  Wrench,
  ClipboardCheck,
  Power,
  Settings,
  Cpu,
  Monitor,
  BookCheck: FileCheck,
  Workflow,
  Bot,
  Network,
  BadgeCheck,
  ShieldCheck,
  Trophy,
};

export function CaseStudyScope({ study }: { study: ProjectCaseStudy }) {
  return (
    <section className={`${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="scope-of-work">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Implementation</p>
        <h2 id="scope-of-work" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Scope of Work
        </h2>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${PROJECTS_CARD_GAP}`}>
          {study.scope.map((item) => {
            const Icon = iconMap[item.icon] ?? Wrench;
            return (
              <article key={item.title} className={`group p-5 sm:p-6 ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER}`}>
                <div className={`mb-4 ${PROJECTS_ICON_BOX}`}>
                  <Icon strokeWidth={PROJECTS_ICON_STROKE} className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{item.title}</h3>
                <p className={PROJECTS_BODY_SM}>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyProcess({ study }: { study: ProjectCaseStudy }) {
  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="project-process">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Process</p>
        <h2 id="project-process" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Project Process
        </h2>
        <div className="relative">
          <div className="absolute top-8 right-0 left-0 hidden h-px bg-engineering/20 lg:block" aria-hidden />
          <ol className={`grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 ${PROJECTS_CARD_GAP}`}>
            {study.process.map((step) => (
              <li key={step.step} className={`relative p-5 sm:p-6 ${PROJECTS_CARD}`}>
                <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-engineering text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{step.title}</h3>
                <p className={PROJECTS_BODY_SM}>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyTech({ study }: { study: ProjectCaseStudy }) {
  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="technologies-used">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Capabilities</p>
        <h2 id="technologies-used" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Technologies Used
        </h2>
        <div className="mb-6 flex flex-wrap gap-2">
          {study.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border border-engineering/25 bg-engineering/10 px-3 py-1.5 text-xs font-semibold text-engineering"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {study.techCards.map((card) => {
            const Icon = iconMap[card.icon] ?? Cpu;
            return (
              <article key={card.title} className={`group p-5 ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER}`}>
                <div className={`mb-4 ${PROJECTS_ICON_BOX}`}>
                  <Icon strokeWidth={PROJECTS_ICON_STROKE} className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{card.title}</h3>
                <p className={PROJECTS_BODY_SM}>{card.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyGallery({ study }: { study: ProjectCaseStudy }) {
  const [active, setActive] = useState<(typeof study.gallery)[number] | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section className={`${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="media-gallery">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Media</p>
        <h2 id="media-gallery" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Image & Video Gallery
        </h2>
        <div className={`grid sm:grid-cols-2 ${PROJECTS_CARD_GAP}`}>
          {study.gallery.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(item)}
              className={`group overflow-hidden text-left ${PROJECTS_CARD} ${PROJECTS_FOCUS_RING}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
                {(item.type === "video" || item.type === "drone") && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-engineering">
                      <Play className="h-5 w-5 fill-current" aria-hidden />
                    </span>
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="font-semibold text-[#1a2b4a] dark:text-foreground">{item.title}</p>
                <p className="mt-1 text-xs text-[#94a3b8]">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0f1729]/90 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className={`absolute top-4 right-4 rounded-full bg-white/10 p-3 text-white ${PROJECTS_FOCUS_RING} ${PROJECTS_TOUCH_TARGET}`}
            aria-label="Close"
            onClick={() => setActive(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video overflow-hidden rounded-[20px]">
              <Image src={active.image} alt={active.title} fill className="object-cover" sizes="90vw" />
            </div>
            <p className="mt-3 text-center text-sm text-white/80">{active.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export function CaseStudyMilestones({ study }: { study: ProjectCaseStudy }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="project-timeline">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Timeline</p>
        <h2 id="project-timeline" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Project Timeline
        </h2>
        {mounted && (
          <Swiper
            modules={[Navigation, A11y, Keyboard]}
            spaceBetween={24}
            slidesPerView={1.1}
            keyboard={{ enabled: true }}
            breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
            className="!overflow-hidden"
          >
            {study.milestones.map((m) => (
              <SwiperSlide key={m.title} className="!h-auto">
                <article className={`flex h-full flex-col overflow-hidden ${PROJECTS_CARD}`}>
                  <div className="relative aspect-[16/10]">
                    <Image src={m.image} alt={m.title} fill className={CINEMATIC_IMAGE} sizes="33vw" loading="lazy" />
                    <span className="absolute top-4 left-4 rounded-full bg-[#0f1729]/75 px-3 py-1 text-xs font-bold text-white">
                      {m.date}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{m.title}</h3>
                    <p className={PROJECTS_BODY_SM}>{m.description}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export function CaseStudyImpact({ study }: { study: ProjectCaseStudy }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;
    const ctx = gsap.context(() => {
      grid.querySelectorAll("[data-count]").forEach((el) => {
        const target = Number(el.getAttribute("data-count"));
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: grid, start: "top 85%", toggleActions: "play none none none" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      });
    }, grid);
    return () => ctx.revert();
  }, [reducedMotion, study.slug]);

  return (
    <section id="results" className={`scroll-mt-28 ${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="results-impact">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Result → Impact</p>
        <h2 id="results-impact" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Results & Impact
        </h2>
        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {study.impacts.map((item) => (
            <div key={item.label} className={`${PROJECTS_CARD} p-6`}>
              <p className="mb-2 text-3xl font-bold text-engineering sm:text-4xl">
                <span data-count={item.value}>{reducedMotion ? item.value : 0}</span>
                {item.suffix}
              </p>
              <p className="mb-1 font-bold text-[#1a2b4a] dark:text-foreground">{item.label}</p>
              <p className="text-sm text-[#94a3b8]">{item.detail}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e8edf2] dark:bg-border">
                <div
                  className="h-full rounded-full bg-engineering"
                  style={{ width: `${Math.min(item.value, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyTestimonial({ study }: { study: ProjectCaseStudy }) {
  const t = study.testimonial;
  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="client-testimonial">
      <div className={PROJECTS_INNER}>
        <div className={`mx-auto max-w-4xl overflow-hidden ${PROJECTS_CARD}`}>
          <div className="grid lg:grid-cols-[200px_1fr]">
            {t.photo && (
              <div className="relative min-h-[200px]">
                <Image src={t.photo} alt={t.name} fill className={`${CINEMATIC_IMAGE} object-top`} sizes="200px" />
              </div>
            )}
            <div className="p-6 sm:p-10">
              <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Client Testimonial</p>
              <h2 id="client-testimonial" className="sr-only">
                Client Testimonial
              </h2>
              <div className="mb-4 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-engineering text-engineering" aria-hidden />
                ))}
              </div>
              <p className="mb-6 text-lg font-medium leading-[1.7] text-[#1a2b4a] dark:text-foreground">
                “{t.quote}”
              </p>
              <p className="font-bold text-[#1a2b4a] dark:text-foreground">{t.name}</p>
              <p className="text-sm text-[#94a3b8]">
                {t.designation} · {t.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CaseStudyAwards({ study }: { study: ProjectCaseStudy }) {
  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="awards-compliance">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Recognition</p>
        <h2 id="awards-compliance" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Awards & Compliance
        </h2>
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 ${PROJECTS_CARD_GAP}`}>
          {study.awards.map((award) => {
            const Icon = iconMap[award.icon] ?? BadgeCheck;
            return (
              <article key={award.title} className={`p-6 text-center ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER}`}>
                <div className={`mx-auto mb-4 ${PROJECTS_ICON_BOX}`}>
                  <Icon strokeWidth={PROJECTS_ICON_STROKE} className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{award.title}</h3>
                <p className={PROJECTS_BODY_SM}>{award.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
