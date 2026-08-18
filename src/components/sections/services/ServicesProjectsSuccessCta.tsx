"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Download, MapPin, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SectionHeading from "@/components/ui/SectionHeading";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { portfolioProjects } from "@/data/projects-page";
import { serviceDownloads, serviceTestimonials } from "@/data/services-page";
import type { PartnerLogoView } from "@/types/home";
import {
  CINEMATIC_IMAGE,
  SERVICES_BG_SURFACE,
  SERVICES_BG_WHITE,
  SERVICES_CARD,
  SERVICES_CARD_HOVER,
  SERVICES_FOCUS_RING,
  SERVICES_INNER,
  SERVICES_SECTION_PAD,
  SERVICES_TOUCH_TARGET,
} from "./constants";

import "swiper/css";

function useNav() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const init = (swiper: SwiperType) => {
    if (prevRef.current && nextRef.current && swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };
  return { prevRef, nextRef, mounted, init };
}

export function ServicesRelatedProjectsSection() {
  const { prevRef, nextRef, mounted, init } = useNav();
  const items = portfolioProjects.slice(0, 6);

  return (
    <section className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="related-projects">
      <div className={SERVICES_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionHeading
              label="RELATED PROJECTS"
              title="Proven Delivery Across Programs"
              description="Selected engineering projects that demonstrate HS Group capability in the field."
              align="left"
            />
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
            {items.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link href={`/projects/${p.slug}`} className={`group flex h-full flex-col overflow-hidden ${SERVICES_CARD} ${SERVICES_CARD_HOVER} ${SERVICES_FOCUS_RING}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`} sizes="33vw" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-semibold tracking-wide text-engineering uppercase">{p.industry}</p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{p.title}</h3>
                    <p className="mb-2 inline-flex items-center gap-1.5 text-xs text-[#94a3b8]">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {p.location}
                    </p>
                    <p className="mb-4 text-xs text-[#5a6478] dark:text-foreground-muted">Completion {p.completion}</p>
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

export function ServicesClientSuccessSection({
  logos = [],
}: {
  logos?: PartnerLogoView[] | null;
}) {
  const { prevRef, nextRef, mounted, init } = useNav();
  const testimonials = Array.isArray(serviceTestimonials) ? serviceTestimonials : [];
  const logoItems = Array.isArray(logos) ? logos : [];
  if (testimonials.length === 0 && logoItems.length === 0) return null;

  return (
    <section className={`${SERVICES_BG_SURFACE} ${SERVICES_SECTION_PAD}`} aria-label="Client success">
      <div className={SERVICES_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionHeading
              label="CLIENT SUCCESS"
              title="Trusted by Industry Leaders"
              description="Partnership outcomes that reflect long-term engineering reliability."
              align="left"
            />
          </div>
          <div className="flex gap-2">
            <button ref={prevRef} type="button" aria-label="Previous testimonial" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button ref={nextRef} type="button" aria-label="Next testimonial" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${SERVICES_TOUCH_TARGET} ${SERVICES_FOCUS_RING}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {mounted && testimonials.length > 0 ? (
          <Swiper modules={[Autoplay, Navigation, A11y, Keyboard]} onSwiper={init} spaceBetween={24} slidesPerView={1} autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }} className="mb-12 !overflow-hidden">
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <article className={`grid overflow-hidden lg:grid-cols-2 ${SERVICES_CARD}`}>
                  <div className="relative min-h-[220px] lg:min-h-[340px]">
                    <Image src={item.image} alt="" fill className={CINEMATIC_IMAGE} sizes="50vw" loading="lazy" />
                  </div>
                  <div className="flex flex-col justify-center p-6 sm:p-10">
                    <Quote className="mb-4 h-8 w-8 text-engineering/40" aria-hidden />
                    <p className="mb-6 text-lg font-medium leading-[1.7] text-[#1a2b4a] dark:text-foreground">“{item.quote}”</p>
                    <p className="font-bold text-[#1a2b4a] dark:text-foreground">{item.name}</p>
                    <p className="text-sm text-[#94a3b8]">{item.role}</p>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}

        {logoItems.length > 0 ? (
        <div className="space-y-4">
          <LogoMarquee items={logoItems} direction="rtl" ariaLabel="Client logos row one" />
          <LogoMarquee items={logoItems} direction="ltr" ariaLabel="Client logos row two" />
        </div>
        ) : null}
      </div>
    </section>
  );
}

export function ServicesDownloadsSection() {
  const files = Array.isArray(serviceDownloads) ? serviceDownloads : [];
  if (files.length === 0) return null;

  return (
    <section id="downloads" className={`scroll-mt-24 ${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`} aria-labelledby="download-center">
      <div className={SERVICES_INNER}>
        <div className="mb-8 max-w-2xl">
          <SectionHeading
            label="DOWNLOAD CENTER"
            title="Capability Documents"
            description="Download service brochures, capability statements, and technical materials."
            align="left"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {files.map((file) => (
            <a
              key={file.id}
              href={file.href}
              className={`group flex flex-col justify-between gap-4 p-5 ${SERVICES_CARD} ${SERVICES_CARD_HOVER} ${SERVICES_FOCUS_RING}`}
              aria-label={`Download ${file.title}`}
            >
              <div>
                <p className="font-semibold text-[#1a2b4a] dark:text-foreground">{file.title}</p>
                <p className="mt-1 text-xs text-[#94a3b8]">{file.fileType} · {file.size}</p>
              </div>
              <span className="btn-secondary inline-flex w-fit items-center gap-2 px-3 py-2 text-xs">
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
