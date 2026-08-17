"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioProjects } from "@/data/projects-page";
import { portfolioServices } from "@/data/services-page";
import { productsCta } from "@/data/products-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_BG_SURFACE,
  PRODUCTS_BG_WHITE,
  PRODUCTS_BODY_SM,
  PRODUCTS_CARD,
  PRODUCTS_CARD_HOVER,
  PRODUCTS_FOCUS_RING,
  PRODUCTS_FOCUS_RING_LIGHT,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
  PRODUCTS_TOUCH_TARGET,
} from "./constants";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

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

export function ProductsRelatedProjectsSection() {
  const { prevRef, nextRef, mounted, init } = useNav();
  const items = portfolioProjects.slice(0, 6);

  return (
    <section className={`${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`} aria-labelledby="related-projects">
      <div className={PRODUCTS_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionHeading
              label="RELATED PROJECTS"
              title="Where These Products Perform"
              description="Selected engineering programs that demonstrate product applications in the field."
              align="left"
            />
          </div>
          <div className="flex gap-2">
            <button ref={prevRef} type="button" aria-label="Previous project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button ref={nextRef} type="button" aria-label="Next project" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mounted && (
          <Swiper modules={[Navigation, A11y, Keyboard]} onSwiper={init} spaceBetween={24} slidesPerView={1.1} breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }} className="!overflow-hidden">
            {items.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link href={`/projects/${p.slug}`} className={`group flex h-full flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER} ${PRODUCTS_FOCUS_RING}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={p.image} alt={p.title} fill className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`} sizes="33vw" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-semibold tracking-wide text-engineering uppercase">{p.industry}</p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{p.title}</h3>
                    <p className="mb-4 text-xs text-[#94a3b8]">{p.location}</p>
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

export function ProductsRelatedServicesSection() {
  const { prevRef, nextRef, mounted, init } = useNav();
  const items = portfolioServices.slice(0, 6);

  return (
    <section className={`${PRODUCTS_BG_SURFACE} ${PRODUCTS_SECTION_PAD}`} aria-labelledby="related-services">
      <div className={PRODUCTS_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionHeading
              label="RELATED SERVICES"
              title="Engineering Services That Complement Products"
              description="Pair product selection with HS Group delivery capability for end-to-end project success."
              align="left"
            />
          </div>
          <div className="flex gap-2">
            <button ref={prevRef} type="button" aria-label="Previous service" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button ref={nextRef} type="button" aria-label="Next service" className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mounted && (
          <Swiper modules={[Navigation, A11y, Keyboard]} onSwiper={init} spaceBetween={24} slidesPerView={1.1} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} className="!overflow-hidden">
            {items.map((s) => (
              <SwiperSlide key={s.id} className="!h-auto">
                <Link href={`/services/${s.slug}`} className={`group flex h-full flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER} ${PRODUCTS_FOCUS_RING}`}>
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image src={s.image} alt={s.title} fill className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`} sizes="33vw" loading="lazy" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{s.title}</h3>
                    <p className={`mb-4 line-clamp-2 flex-1 ${PRODUCTS_BODY_SM}`}>{s.description}</p>
                    <span className="text-sm font-semibold text-engineering">View Service →</span>
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

export function ProductsCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.from(content.querySelectorAll("[data-cta-reveal]"), {
        opacity: 0, y: 28, duration: 0.65, ease: "power2.out", stagger: 0.08,
        scrollTrigger: { trigger: content, start: "top 88%", toggleActions: "play none none none" },
      });
    }, section);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} aria-label="Products call to action" className={`${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`}>
      <div className={PRODUCTS_INNER}>
        <div className="relative overflow-hidden rounded-[32px] border border-[#e8edf2] shadow-[0_20px_56px_rgba(15,23,42,0.14)] dark:border-border">
          <div className="absolute inset-0">
            <Image src={productsCta.backgroundImage} alt="" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-[#0f1729]/82" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.04]" viewBox="0 0 1440 700" fill="none" aria-hidden preserveAspectRatio="xMidYMid slice">
            <path d="M0 140H1440M0 280H1440M0 420H1440M0 560H1440" stroke="currentColor" strokeWidth="0.75" />
            <path d="M240 0V700M480 0V700M720 0V700M960 0V700M1200 0V700" stroke="currentColor" strokeWidth="0.75" />
          </svg>
          <div ref={contentRef} className="relative z-10 px-6 py-16 text-center sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <span data-cta-reveal className="mb-5 inline-block text-xs font-bold tracking-[0.24em] text-engineering-light">
              {productsCta.label}
            </span>
            <h2 data-cta-reveal className="mx-auto max-w-[760px] text-[32px] font-bold leading-[1.12] text-white sm:text-[40px] lg:text-[48px]">
              {productsCta.headline}
            </h2>
            <p data-cta-reveal className="mx-auto mt-5 max-w-2xl text-base leading-[1.85] text-white/75 sm:text-lg">
              {productsCta.description}
            </p>
            <div data-cta-reveal className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
              {productsCta.actions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className={
                    action.primary
                      ? `group inline-flex w-full items-center justify-center gap-2 rounded-full bg-engineering px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-[#1a7ab8] hover:shadow-[0_14px_36px_rgba(33,140,206,0.38)] sm:w-auto ${PRODUCTS_FOCUS_RING_LIGHT}`
                      : `group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] sm:w-auto ${PRODUCTS_FOCUS_RING_LIGHT}`
                  }
                >
                  {action.label}
                  {action.primary && (
                    <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
