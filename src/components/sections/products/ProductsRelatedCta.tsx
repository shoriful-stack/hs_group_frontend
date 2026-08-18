"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SectionHeading from "@/components/ui/SectionHeading";
import { portfolioProjects } from "@/data/projects-page";
import { portfolioServices } from "@/data/services-page";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_BG_SURFACE,
  PRODUCTS_BG_WHITE,
  PRODUCTS_BODY_SM,
  PRODUCTS_CARD,
  PRODUCTS_CARD_HOVER,
  PRODUCTS_FOCUS_RING,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
  PRODUCTS_TOUCH_TARGET,
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
  const items = Array.isArray(portfolioServices) ? portfolioServices.slice(0, 6) : [];
  if (items.length === 0) return null;

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
