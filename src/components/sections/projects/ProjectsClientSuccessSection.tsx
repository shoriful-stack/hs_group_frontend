"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y, Keyboard, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SectionHeading from "@/components/ui/SectionHeading";
import LogoMarquee from "@/components/ui/LogoMarquee";
import { projectTestimonials } from "@/data/projects-page";
import { trustNetworkLogos } from "@/data/site";
import {
  PROJECTS_BG_WHITE,
  PROJECTS_BLOCK_SPACING,
  PROJECTS_CARD,
  PROJECTS_CARD_HOVER,
  PROJECTS_FOCUS_RING,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
  PROJECTS_TOUCH_TARGET,
} from "./constants";

import "swiper/css";
import "swiper/css/pagination";

export default function ProjectsClientSuccessSection() {
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

  return (
    <section
      className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`}
      aria-label="Client success"
    >
      <div className={PROJECTS_INNER}>
        {/* Header */}
        <div
          className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6 ${PROJECTS_BLOCK_SPACING}`}
        >
          <div className="min-w-0 flex-1 [&_>div]:mb-0">
            <SectionHeading
              label="CLIENT SUCCESS"
              title="Trusted by Industry Leaders"
              description="Outcomes and partnerships that reflect long-term engineering reliability."
              align="left"
            />
          </div>
          <div className="flex shrink-0 gap-2.5 self-start sm:self-end">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous testimonial"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-[#1a2b4a] transition-all duration-[400ms] hover:border-engineering hover:text-engineering dark:border-border dark:bg-card dark:text-foreground ${PROJECTS_TOUCH_TARGET} ${PROJECTS_FOCUS_RING}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next testimonial"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-[#1a2b4a] transition-all duration-[400ms] hover:border-engineering hover:text-engineering dark:border-border dark:bg-card dark:text-foreground ${PROJECTS_TOUCH_TARGET} ${PROJECTS_FOCUS_RING}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        {mounted && (
          <div className={PROJECTS_BLOCK_SPACING}>
            <Swiper
              modules={[Autoplay, Navigation, A11y, Keyboard, Pagination]}
              onSwiper={init}
              spaceBetween={20}
              slidesPerView={1}
              loop={projectTestimonials.length > 1}
              autoplay={{ delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              keyboard={{ enabled: true }}
              pagination={{
                clickable: true,
                el: ".client-success-pagination",
              }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 24 },
                768: { slidesPerView: 2, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 32 },
              }}
              className="client-success-swiper !overflow-hidden"
            >
              {projectTestimonials.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto">
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden p-5 sm:p-6 lg:p-7 ${PROJECTS_CARD} ${PROJECTS_CARD_HOVER}`}
                  >
                    <div
                      className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-engineering"
                      aria-hidden
                    />

                    <Quote
                      className="mb-4 h-6 w-6 text-engineering/35 transition-colors duration-[400ms] group-hover:text-engineering/55 sm:mb-5 sm:h-7 sm:w-7"
                      strokeWidth={1.5}
                      aria-hidden
                    />

                    <blockquote className="mb-6 flex-1 sm:mb-8">
                      <p className="text-[15px] leading-[1.8] text-[#1a2b4a] sm:text-base dark:text-foreground">
                        “{item.quote}”
                      </p>
                    </blockquote>

                    <footer className="mt-auto flex items-center gap-3 border-t border-[#e8edf2] pt-4 sm:gap-3.5 sm:pt-5 dark:border-border">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#e8edf2] sm:h-12 sm:w-12 dark:border-border">
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="48px"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-[#1a2b4a] dark:text-foreground">
                          {item.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-[#5a6478] dark:text-foreground-muted">
                          {item.role}
                        </p>
                      </div>
                    </footer>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              className="client-success-pagination mt-6 flex justify-center gap-2.5 sm:mt-8"
              aria-label="Testimonial pagination"
            />
          </div>
        )}

        {/* Logos */}
        <div className="flex flex-col gap-3 sm:gap-4">
          <LogoMarquee
            items={trustNetworkLogos}
            direction="rtl"
            ariaLabel="Client and partner logos marquee row one"
          />
          <LogoMarquee
            items={trustNetworkLogos}
            direction="ltr"
            ariaLabel="Client and partner logos marquee row two"
          />
        </div>
      </div>

      <style jsx global>{`
        .client-success-pagination {
          position: static !important;
          bottom: auto !important;
          padding-left: 0 !important;
          text-align: center !important;
          width: 100% !important;
        }
        .client-success-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 !important;
          background: #c5d0db;
          opacity: 1;
          transition: width 0.3s ease, background 0.3s ease;
        }
        .client-success-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 999px;
          background: #218cce;
        }
      `}</style>
    </section>
  );
}
