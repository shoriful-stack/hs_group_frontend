"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { ProjectCaseStudy } from "@/data/project-case-study";
import type { PortfolioProject } from "@/data/projects-page";
import { services } from "@/data/site";
import {
  CINEMATIC_IMAGE,
  PROJECTS_BG_SURFACE,
  PROJECTS_BG_WHITE,
  PROJECTS_BODY_SM,
  PROJECTS_BTN_MOBILE,
  PROJECTS_CARD,
  PROJECTS_CARD_HOVER,
  PROJECTS_FOCUS_RING,
  PROJECTS_IMAGE_FRAME,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
  PROJECTS_TOUCH_TARGET,
} from "../constants";

import "swiper/css";

type ServiceItem = (typeof services)[number];

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

export function CaseStudyRelatedServices({ items }: { items: ServiceItem[] }) {
  const { prevRef, nextRef, mounted, init } = useNav();
  if (!items.length) return null;

  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="related-services">
      <div className={PROJECTS_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Related Services</p>
            <h2 id="related-services" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Capabilities Behind This Delivery
            </h2>
          </div>
          <div className="flex gap-2">
            <button ref={prevRef} type="button" aria-label="Previous service" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PROJECTS_TOUCH_TARGET} ${PROJECTS_FOCUS_RING}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button ref={nextRef} type="button" aria-label="Next service" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PROJECTS_TOUCH_TARGET} ${PROJECTS_FOCUS_RING}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mounted && (
          <Swiper modules={[Navigation, A11y, Keyboard]} onSwiper={init} spaceBetween={24} slidesPerView={1.1} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="!overflow-hidden">
            {items.map((s) => (
              <SwiperSlide key={s.id} className="!h-auto">
                <Link href="/services" className={`group flex h-full flex-col overflow-hidden ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER} ${PROJECTS_FOCUS_RING}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={s.image} alt={s.title} fill className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`} sizes="33vw" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{s.title}</h3>
                    <p className={`mb-4 flex-1 ${PROJECTS_BODY_SM}`}>{s.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                      Learn more <ArrowRight className="h-4 w-4" />
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

export function CaseStudyRelatedProjects({ items }: { items: PortfolioProject[] }) {
  const { prevRef, nextRef, mounted, init } = useNav();
  if (!items.length) return null;

  return (
    <section className={`${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="related-projects">
      <div className={PROJECTS_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Related Projects</p>
            <h2 id="related-projects" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Continue Exploring
            </h2>
          </div>
          <div className="flex gap-2">
            <button ref={prevRef} type="button" aria-label="Previous project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PROJECTS_TOUCH_TARGET} ${PROJECTS_FOCUS_RING}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button ref={nextRef} type="button" aria-label="Next project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PROJECTS_TOUCH_TARGET} ${PROJECTS_FOCUS_RING}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mounted && (
          <Swiper modules={[Navigation, A11y, Keyboard]} onSwiper={init} spaceBetween={24} slidesPerView={1.1} breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }} className="!overflow-hidden">
            {items.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link href={`/projects/${p.slug}`} className={`group flex h-full flex-col overflow-hidden ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER} ${PROJECTS_FOCUS_RING}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`} sizes="33vw" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-semibold tracking-wide text-engineering uppercase">{p.industry}</p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{p.title}</h3>
                    <p className="mb-4 inline-flex items-center gap-1.5 text-xs text-[#94a3b8]">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {p.location}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                      View Case Study <ArrowRight className="h-4 w-4" />
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

export function CaseStudyFaq({ study }: { study: ProjectCaseStudy }) {
  const [open, setOpen] = useState(0);

  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="project-faq">
      <div className={`${PROJECTS_INNER} max-w-3xl`}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">FAQ</p>
        <h2 id="project-faq" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {study.faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.question} className={PROJECTS_CARD}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left ${PROJECTS_FOCUS_RING} rounded-[28px]`}
                >
                  <span className="font-semibold text-[#1a2b4a] dark:text-foreground">{faq.question}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-engineering transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="border-t border-[#e8edf2] px-5 py-4 dark:border-border">
                    <p className={PROJECTS_BODY_SM}>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CaseStudyDownloads({ study }: { study: ProjectCaseStudy }) {
  return (
    <section className={`${PROJECTS_BG_SURFACE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="download-center">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Resources</p>
        <h2 id="download-center" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Download Center
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {study.downloads.map((file) => (
            <a
              key={file.id}
              href={file.href}
              className={`group flex items-center justify-between gap-4 p-5 ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER} ${PROJECTS_FOCUS_RING}`}
              aria-label={`Download ${file.title}`}
            >
              <div>
                <p className="font-semibold text-[#1a2b4a] dark:text-foreground">{file.title}</p>
                <p className="mt-1 text-xs text-[#94a3b8]">
                  {file.fileType} · {file.size}
                </p>
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
  );
}

export function CaseStudyContactTeam({ study }: { study: ProjectCaseStudy }) {
  return (
    <section className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`} aria-labelledby="contact-project-team">
      <div className={PROJECTS_INNER}>
        <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Engage</p>
        <h2 id="contact-project-team" className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
          Contact Project Team
        </h2>
        <div className="mb-8 grid gap-5 md:grid-cols-3">
          {study.contacts.map((c) => (
            <article key={c.email} className={`p-5 ${PROJECTS_CARD}`}>
              <div className={`relative mb-4 h-16 w-16 overflow-hidden rounded-full ${PROJECTS_IMAGE_FRAME} !rounded-full`}>
                <Image src={c.photo} alt={c.name} fill className={`${CINEMATIC_IMAGE} object-top`} sizes="64px" />
              </div>
              <h3 className="font-bold text-[#1a2b4a] dark:text-foreground">{c.name}</h3>
              <p className="text-sm font-semibold text-engineering">{c.role}</p>
              <p className="mb-3 text-xs text-[#94a3b8]">{c.department}</p>
              <a href={`mailto:${c.email}`} className={`mb-1 flex items-center gap-2 text-sm text-engineering ${PROJECTS_FOCUS_RING} rounded`}>
                <Mail className="h-4 w-4" aria-hidden />
                {c.email}
              </a>
              <a href={`tel:${c.phone.replace(/\s/g, "")}`} className={`flex items-center gap-2 text-sm text-engineering ${PROJECTS_FOCUS_RING} rounded`}>
                <Phone className="h-4 w-4" aria-hidden />
                {c.phone}
              </a>
            </article>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={`btn-primary inline-flex items-center justify-center gap-2 ${PROJECTS_BTN_MOBILE} ${PROJECTS_FOCUS_RING}`}>
            Request Consultation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className={`btn-secondary inline-flex items-center justify-center ${PROJECTS_BTN_MOBILE} ${PROJECTS_FOCUS_RING}`}>
            Schedule Meeting
          </Link>
        </div>
      </div>
    </section>
  );
}
