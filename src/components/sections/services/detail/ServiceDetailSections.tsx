"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Brain,
  Cable,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Cloud,
  Compass,
  Cpu,
  DraftingCompass,
  Download,
  Headset,
  Layers,
  Lightbulb,
  ListTree,
  Mail,
  MapPin,
  MessagesSquare,
  Monitor,
  Network,
  Package,
  PenTool,
  Phone,
  Power,
  Settings,
  Shield,
  ShieldAlert,
  Star,
  Sun,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceDetail } from "@/data/service-detail";
import type { ServiceCardView, ServiceDetailData } from "@/types/home";
import type { PortfolioProject } from "@/data/projects-page";
import CTASection from "@/components/sections/CTASection";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  SERVICES_BG_SURFACE,
  SERVICES_BG_WHITE,
  SERVICES_BODY_SM,
  SERVICES_BTN_MOBILE,
  SERVICES_CARD,
  SERVICES_CARD_HOVER,
  SERVICES_FOCUS_RING,
  SERVICES_FOCUS_RING_LIGHT,
  SERVICES_ICON_BOX,
  SERVICES_ICON_STROKE,
  SERVICES_IMAGE_FRAME,
  SERVICES_INNER,
  SERVICES_SECTION_PAD,
  SERVICES_TOUCH_TARGET,
} from "../constants";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, LucideIcon> = {
  MessagesSquare,
  PenTool,
  DraftingCompass,
  Package,
  Wrench,
  ClipboardCheck,
  Power,
  Settings,
  Headset,
  Monitor,
  Cpu,
  Cable,
  Network,
  Brain,
  Sun,
  Bot,
  Cloud,
  Shield,
};

function useNav() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const init = (swiper: SwiperType) => {
    if (
      prevRef.current &&
      nextRef.current &&
      swiper.params.navigation &&
      typeof swiper.params.navigation !== "boolean"
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };
  return { prevRef, nextRef, mounted, init };
}

export function ServiceDetailScopeTech({ service }: { service: ServiceDetail }) {
  return (
    <>
      <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="service-scope">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Scope</p>
          <h2 id="service-scope" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Service Scope
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.scope.map((item) => {
              const Icon = iconMap[item.icon] ?? Wrench;
              return (
                <article key={item.title} className={`group p-5 ${SERVICES_CARD} ${SERVICES_CARD_HOVER}`}>
                  <div className={`mb-4 ${SERVICES_ICON_BOX}`}>
                    <Icon strokeWidth={SERVICES_ICON_STROKE} className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{item.title}</h3>
                  <p className={SERVICES_BODY_SM}>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="technologies-used">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Stack</p>
          <h2 id="technologies-used" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Technologies Used
          </h2>
          <div className="mb-6 flex flex-wrap gap-2">
            {service.technologies.map((t) => (
              <span key={t} className="rounded-full border border-engineering/25 bg-engineering/10 px-3 py-1.5 text-xs font-semibold text-engineering">
                {t}
              </span>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.techCards.map((t) => {
              const Icon = iconMap[t.icon] ?? Cpu;
              return (
                <article key={t.title} className={`group p-5 ${SERVICES_CARD} ${SERVICES_CARD_HOVER}`}>
                  <div className={`mb-4 ${SERVICES_ICON_BOX}`}>
                    <Icon strokeWidth={SERVICES_ICON_STROKE} className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{t.title}</h3>
                  <p className={SERVICES_BODY_SM}>{t.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export function ServiceDetailIndustriesWhy({ service }: { service: ServiceDetail }) {
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
  }, [reducedMotion, service.slug]);

  return (
    <>
      <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="industries-served">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Industries</p>
          <h2 id="industries-served" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Industries Served
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.industryCards.map((ind) => (
              <article key={ind.title} className={`p-5 ${SERVICES_CARD} ${SERVICES_CARD_HOVER}`}>
                <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{ind.title}</h3>
                <p className={SERVICES_BODY_SM}>{ind.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="why-hs-group">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Credibility</p>
          <h2 id="why-hs-group" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Why Choose HS Group
          </h2>
          <div ref={gridRef} className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {service.whyPoints.map((stat) => (
              <div key={stat.label} className={`${SERVICES_CARD} border-engineering/10 bg-engineering/[0.03] px-4 py-6 text-center`}>
                <p className="mb-1 text-3xl font-bold text-engineering sm:text-4xl">
                  <span data-count={stat.value}>{reducedMotion ? stat.value : 0}</span>
                  {stat.suffix}
                </p>
                <p className="text-[11px] font-semibold tracking-[0.14em] text-[#5a6478] uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.whyItems.map((item) => (
              <article key={item.title} className="rounded-r-[20px] border-l-[3px] border-engineering bg-[#fafbfd] p-5 dark:bg-surface">
                <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{item.title}</h3>
                <p className={SERVICES_BODY_SM}>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ServiceDetailSpecsStandards({ service }: { service: ServiceDetail }) {
  return (
    <>
      <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="tech-specs">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Specifications</p>
          <h2 id="tech-specs" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Technical Specifications
          </h2>
          <div className={`overflow-hidden ${SERVICES_CARD}`}>
            <table className="w-full text-left text-sm">
              <thead className="bg-[#fafbfd] dark:bg-surface">
                <tr>
                  <th className="px-5 py-4 font-bold text-[#1a2b4a] dark:text-foreground">Specification</th>
                  <th className="px-5 py-4 font-bold text-[#1a2b4a] dark:text-foreground">Detail</th>
                </tr>
              </thead>
              <tbody>
                {service.specs.map((row) => (
                  <tr key={row.label} className="border-t border-[#e8edf2] dark:border-border">
                    <td className="px-5 py-4 font-semibold text-engineering">{row.label}</td>
                    <td className="px-5 py-4 text-[#5a6478] dark:text-foreground-muted">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="standards">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Compliance</p>
          <h2 id="standards" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            International Standards
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.standards.map((s) => (
              <article key={s.title} className={`p-5 text-center ${SERVICES_CARD} ${SERVICES_CARD_HOVER}`}>
                <p className="mb-2 text-lg font-bold text-engineering">{s.title}</p>
                <p className={SERVICES_BODY_SM}>{s.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ServiceDetailShowcase({
  projects,
}: {
  projects: PortfolioProject[];
}) {
  const { prevRef, nextRef, mounted, init } = useNav();
  if (!projects.length) return null;

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="project-showcase">
      <div className={SERVICES_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Proof</p>
            <h2 id="project-showcase" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Project Showcase
            </h2>
          </div>
          <div className="flex gap-2">
            <button ref={prevRef} type="button" aria-label="Previous project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button ref={nextRef} type="button" aria-label="Next project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mounted && (
          <Swiper modules={[Navigation, A11y, Keyboard]} onSwiper={init} spaceBetween={24} slidesPerView={1.1} breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }} className="!overflow-hidden">
            {projects.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link href={`/projects/${p.slug}`} className={`group flex h-full flex-col overflow-hidden ${SERVICES_CARD} ${SERVICES_CARD_HOVER} ${SERVICES_FOCUS_RING}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`} sizes="33vw" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-semibold tracking-wide text-engineering uppercase">{p.industry}</p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{p.title}</h3>
                    <p className="mb-4 inline-flex items-center gap-1.5 text-xs text-[#94a3b8]">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {p.location} · {p.completion}
                    </p>
                    <span className="mt-auto text-sm font-semibold text-engineering">View Case Study →</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export function ServiceDetailFaqDownloads({ service }: { service: ServiceDetail }) {
  const [open, setOpen] = useState(0);

  return (
    <>
      <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="service-faq">
        <div className={`${SERVICES_INNER} max-w-3xl`}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">FAQ</p>
          <h2 id="service-faq" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {service.faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className={SERVICES_CARD}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left ${SERVICES_FOCUS_RING} rounded-[28px]`}
                  >
                    <span className="font-semibold text-[#1a2b4a] dark:text-foreground">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-engineering transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#e8edf2] px-5 py-4 dark:border-border">
                      <p className={SERVICES_BODY_SM}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="downloads" className={`scroll-mt-24 ${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="download-center">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Resources</p>
          <h2 id="download-center" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Download Center
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.downloads.map((file) => (
              <a
                key={file.id}
                href={file.href}
                className={`group flex items-center justify-between gap-4 p-5 ${SERVICES_CARD} ${SERVICES_CARD_HOVER} ${SERVICES_FOCUS_RING}`}
                aria-label={`Download ${file.title}`}
              >
                <div>
                  <p className="font-semibold text-[#1a2b4a] dark:text-foreground">{file.title}</p>
                  <p className="mt-1 text-xs text-[#94a3b8]">{file.fileType} · {file.size}</p>
                </div>
                <span className="btn-secondary inline-flex items-center gap-2 px-3 py-2 text-xs">
                  <Download className="h-3.5 w-3.5" aria-hidden />
                  Download
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function ServiceDetailRelatedServices({
  services,
}: {
  services: ServiceCardView[];
}) {
  const items = Array.isArray(services) ? services : [];
  const { prevRef, nextRef, mounted, init } = useNav();
  if (!items.length) return null;

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="related-services">
      <div className={SERVICES_INNER}>
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Capabilities
            </p>
            <h2
              id="related-services"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Related Services
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous service"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next service"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {mounted && (
          <Swiper
            modules={[Navigation, A11y, Keyboard]}
            onSwiper={init}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            className="!overflow-hidden"
          >
            {items.map((s) => (
              <SwiperSlide key={s.slug} className="!h-auto">
                <Link
                  href={`/services/${s.slug}`}
                  className={`group flex h-full flex-col overflow-hidden ${SERVICES_CARD} ${SERVICES_CARD_HOVER} ${SERVICES_FOCUS_RING}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt={s.title}
                        fill
                        className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                        sizes="(max-width: 640px) 90vw, 33vw"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-[#0a1628]" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="mb-1 text-xs font-semibold tracking-wide text-engineering uppercase">
                      {s.category}
                    </p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      {s.title}
                    </h3>
                    <p className={`mb-4 line-clamp-2 flex-1 ${SERVICES_BODY_SM}`}>{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                      View Details
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export function ServiceDetailRelated({
  services,
  projects,
}: {
  services: ServiceCardView[];
  projects: PortfolioProject[];
}) {
  return (
    <>
      <ServiceDetailRelatedServices services={services} />
      {projects.length > 0 && (
        <ServiceDetailRelatedProjects projects={projects} />
      )}
    </>
  );
}

function ServiceDetailRelatedProjects({ projects }: { projects: PortfolioProject[] }) {
  const { prevRef, nextRef, mounted, init } = useNav();

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="related-projects">
      <div className={SERVICES_INNER}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Portfolio</p>
            <h2 id="related-projects" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Related Projects
            </h2>
          </div>
          <div className="flex gap-2">
            <button ref={prevRef} type="button" aria-label="Previous project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button ref={nextRef} type="button" aria-label="Next project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mounted && (
          <Swiper modules={[Navigation, A11y, Keyboard]} onSwiper={init} spaceBetween={24} slidesPerView={1.1} breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }} className="!overflow-hidden">
            {projects.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link href={`/projects/${p.slug}`} className={`group flex h-full flex-col overflow-hidden ${SERVICES_CARD} ${SERVICES_CARD_HOVER} ${SERVICES_FOCUS_RING}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`} sizes="33vw" loading="lazy" />
                  </div>
                  <div className="p-5">
                    <p className="mb-1 text-xs font-semibold text-engineering uppercase">{p.industry}</p>
                    <h3 className="mb-2 font-bold text-[#1a2b4a] dark:text-foreground">{p.title}</h3>
                    <p className="mb-3 text-xs text-[#94a3b8]">{p.location} · {p.completion}</p>
                    <span className="text-sm font-semibold text-engineering">View Case Study →</span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export function ServiceDetailTestimonialContact({ service }: { service: ServiceDetail }) {
  const t = service.testimonial;

  return (
    <>
      <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="testimonials">
        <div className={SERVICES_INNER}>
          <div className={`mx-auto max-w-3xl p-8 text-center sm:p-12 ${SERVICES_CARD}`}>
            <div className="mb-4 flex justify-center gap-1" aria-label={`${t.rating} out of 5`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-engineering text-engineering" aria-hidden />
              ))}
            </div>
            <h2 id="testimonials" className="sr-only">Client Testimonial</h2>
            <p className="mb-6 text-lg font-medium leading-[1.7] text-[#1a2b4a] dark:text-foreground">
              “{t.quote}”
            </p>
            <p className="font-bold text-[#1a2b4a] dark:text-foreground">{t.name}</p>
            <p className="text-sm text-[#94a3b8]">
              {t.designation} · {t.company}
            </p>
          </div>
        </div>
      </section>

      <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-labelledby="contact-team">
        <div className={SERVICES_INNER}>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Engage</p>
          <h2 id="contact-team" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Contact Engineering Team
          </h2>
          <div className="mb-8 grid gap-5 md:grid-cols-3">
            {service.contacts.map((c) => (
              <article key={c.email} className={`p-5 ${SERVICES_CARD}`}>
                <div className={`relative mb-4 h-16 w-16 overflow-hidden rounded-full ${SERVICES_IMAGE_FRAME} !rounded-full`}>
                  <Image src={c.photo} alt={c.name} fill className={`${CINEMATIC_IMAGE} object-top`} sizes="64px" />
                </div>
                <h3 className="font-bold text-[#1a2b4a] dark:text-foreground">{c.name}</h3>
                <p className="text-sm font-semibold text-engineering">{c.role}</p>
                <p className="mb-3 text-xs text-[#94a3b8]">{c.department}</p>
                <a href={`mailto:${c.email}`} className={`mb-1 flex items-center gap-2 text-sm text-engineering ${SERVICES_FOCUS_RING} rounded`}>
                  <Mail className="h-4 w-4" aria-hidden />
                  {c.email}
                </a>
                <a href={`tel:${c.phone.replace(/\s/g, "")}`} className={`flex items-center gap-2 text-sm text-engineering ${SERVICES_FOCUS_RING} rounded`}>
                  <Phone className="h-4 w-4" aria-hidden />
                  {c.phone}
                </a>
              </article>
            ))}
          </div>
          <Link href="/contact" className={`btn-primary inline-flex items-center gap-2 ${SERVICES_BTN_MOBILE} ${SERVICES_FOCUS_RING}`}>
            Schedule Meeting
          </Link>
        </div>
      </section>
    </>
  );
}

export function ServiceDetailCTA() {
  return <CTASection />;
}

export function ServiceDetailSidebar({
  service,
  related,
}: {
  service: ServiceDetailData;
  related: ServiceCardView[];
}) {
  const facts = Array.isArray(service.quickFacts) ? service.quickFacts : [];
  const relatedItems = Array.isArray(related) ? related : [];
  const nav: { href: string; label: string; hint: string; icon: LucideIcon }[] = [
    { href: "#executive-overview", label: "Overview", hint: "Solution summary", icon: ListTree },
    { href: "#key-benefits", label: "Benefits", hint: "Client outcomes", icon: Lightbulb },
    { href: "#challenges", label: "Challenges", hint: "Problems we solve", icon: ShieldAlert },
    { href: "#solution", label: "Solution", hint: "How we deliver", icon: Compass },
    { href: "#engineering-process", label: "Process", hint: "Delivery stages", icon: Layers },
  ];

  return (
    <aside className="space-y-6 lg:space-y-8" aria-label="Service sidebar">
      <div className={`${SERVICES_CARD} overflow-hidden`}>
        <div className="border-b border-[#e8edf2] px-5 py-4 dark:border-border">
          <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
            On This Page
          </p>
          <h2 className="mt-1 text-base font-bold text-[#1a2b4a] dark:text-foreground">
            Quick Navigation
          </h2>
        </div>
        <nav aria-label="Section navigation">
          <ol className="relative p-4">
            <div
              className="absolute top-8 bottom-8 left-[2.15rem] w-px bg-engineering/20"
              aria-hidden
            />
            {nav.map((item, i) => {
              const Icon = item.icon;
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={`group mb-2 flex gap-3.5 rounded-[16px] p-2 last:mb-0 transition-all duration-300 hover:bg-engineering/[0.04] ${SERVICES_FOCUS_RING}`}
                  >
                    <span className="relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-engineering bg-white text-[11px] font-bold text-engineering shadow-[0_4px_12px_rgba(33,140,206,0.18)] transition-transform duration-300 group-hover:scale-105 dark:bg-card">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1 pt-0.5">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#1a2b4a] transition-colors group-hover:text-engineering dark:text-foreground">
                          {item.label}
                        </span>
                        <Icon
                          className="h-3.5 w-3.5 shrink-0 text-[#94a3b8] transition-colors group-hover:text-engineering"
                          strokeWidth={SERVICES_ICON_STROKE}
                          aria-hidden
                        />
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-snug text-[#94a3b8]">
                        {item.hint}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {facts.length > 0 ? (
      <div className={`${SERVICES_CARD} overflow-hidden`}>
        <div className="border-b border-[#e8edf2] px-5 py-4 dark:border-border">
          <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
            At a Glance
          </p>
          <h2 className="mt-1 text-base font-bold text-[#1a2b4a] dark:text-foreground">
            Quick Facts
          </h2>
        </div>
        <dl className="divide-y divide-[#e8edf2] dark:divide-border">
          {facts.map((f) => (
            <div key={f.label} className="flex items-center justify-between gap-3 px-5 py-3.5">
              <dt className="text-[11px] font-bold tracking-[0.12em] text-[#94a3b8] uppercase">
                {f.label}
              </dt>
              <dd className="text-sm font-semibold text-[#1a2b4a] dark:text-foreground">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      ) : null}

      {relatedItems.length > 0 ? (
      <div className={`${SERVICES_CARD} overflow-hidden`}>
        <div className="border-b border-[#e8edf2] px-5 py-4 dark:border-border">
          <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
            Explore More
          </p>
          <h2 className="mt-1 text-base font-bold text-[#1a2b4a] dark:text-foreground">
            Related Services
          </h2>
        </div>
        <ul className="space-y-3 p-4">
          {relatedItems.slice(0, 3).map((s) => (
            <li key={s.slug}>
              <Link
                href={`/services/${s.slug}`}
                className={`group flex gap-3 rounded-[18px] border border-[#e8edf2] bg-[#fafbfd] p-2.5 transition-all duration-400 hover:-translate-y-0.5 hover:border-engineering hover:bg-white hover:shadow-[0_12px_28px_rgba(33,140,206,0.1)] dark:border-border dark:bg-surface ${SERVICES_FOCUS_RING}`}
              >
                <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[14px]">
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.06]`}
                      sizes="72px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#0a1628]" />
                  )}
                </div>
                <div className="min-w-0 flex-1 py-0.5">
                  <span className="mb-1 inline-block text-[10px] font-bold tracking-[0.14em] text-engineering uppercase">
                    {s.category}
                  </span>
                  <p className="line-clamp-2 text-sm leading-snug font-semibold text-[#1a2b4a] transition-colors group-hover:text-engineering dark:text-foreground">
                    {s.title}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-1 h-4 w-4 shrink-0 text-[#94a3b8] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-engineering"
                  strokeWidth={SERVICES_ICON_STROKE}
                  aria-hidden
                />
              </Link>
            </li>
          ))}
        </ul>
        <div className="border-t border-[#e8edf2] px-5 py-3.5 dark:border-border">
          <Link
            href="/services"
            className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] text-engineering uppercase transition-colors hover:text-[#1a7ab8] ${SERVICES_FOCUS_RING} rounded`}
          >
            View all services
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
      </div>
      ) : null}

      <div className={`${SERVICES_CARD} border-engineering/20 bg-engineering/[0.03] p-5`}>
        <h2 className="mb-3 text-sm font-bold text-[#1a2b4a] dark:text-foreground">Contact Expert</h2>
        <Link href="/contact" className={`btn-primary inline-flex w-full items-center justify-center ${SERVICES_FOCUS_RING}`}>
          Talk to Engineering
        </Link>
      </div>
    </aside>
  );
}
