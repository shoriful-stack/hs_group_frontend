"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, A11y, Keyboard, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutTimeline, journeySection } from "@/data/about";
import {
  ABOUT_BG_SURFACE,
  ABOUT_BODY_SM,
  ABOUT_CARD,
  ABOUT_CARD_HOVER,
  ABOUT_FOCUS_RING,
  ABOUT_INNER,
  ABOUT_NAV_BTN,
  ABOUT_SECTION_PAD,
  ABOUT_TOUCH_TARGET,
  CINEMATIC_IMAGE,
} from "./constants";

import "swiper/css";
import "swiper/css/pagination";

const YEAR_START = 2010;
const YEAR_END = 2025;
const ALL_YEARS = Array.from(
  { length: YEAR_END - YEAR_START + 1 },
  (_, i) => String(YEAR_START + i),
);

type JourneyCard = {
  year: string;
  title: string;
  description: string;
  image: string;
  keyAchievement: string;
  country: string;
  industry: string;
  isMilestone: boolean;
};

function buildJourneyCards(): JourneyCard[] {
  return ALL_YEARS.map((year) => {
    const exact = aboutTimeline.find((m) => m.year === year);
    if (exact) {
      return {
        year: exact.year,
        title: exact.title,
        description: exact.description,
        image: exact.image,
        keyAchievement: exact.keyAchievement,
        country: exact.country,
        industry: exact.industry,
        isMilestone: true,
      };
    }

    const prev = [...aboutTimeline]
      .reverse()
      .find((m) => Number(m.year) < Number(year));
    const next = aboutTimeline.find((m) => Number(m.year) > Number(year));
    const source = prev ?? next ?? aboutTimeline[0];

    return {
      year,
      title: `Continued Growth · ${year}`,
      description: prev
        ? `Building on the momentum of ${prev.title}, HS Group advanced capabilities, delivery systems, and engineering excellence through ${year}.`
        : `HS Group continued strengthening engineering delivery and operational capability through ${year}.`,
      image: source.image,
      keyAchievement: prev
        ? `Sustained progress after ${prev.year} milestone`
        : "Steady capability development",
      country: source.country,
      industry: source.industry,
      isMilestone: false,
    };
  });
}

export default function AboutTimelineSection() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const yearRailRef = useRef<HTMLDivElement>(null);
  const yearBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const journeyCards = useMemo(() => buildJourneyCards(), []);
  const activeYear = journeyCards[activeIndex]?.year ?? "2010";
  const activeYearPos =
    ALL_YEARS.length > 1
      ? (Number(activeYear) - YEAR_START) / (YEAR_END - YEAR_START)
      : 1;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const idx = ALL_YEARS.indexOf(activeYear);
    const btn = yearBtnRefs.current[idx];
    const rail = yearRailRef.current;
    if (!btn || !rail) return;
    const target = btn.offsetLeft - rail.clientWidth / 2 + btn.offsetWidth / 2;
    rail.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [activeYear]);

  const init = (swiper: SwiperType) => {
    swiperRef.current = swiper;
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

  const goToYear = (index: number) => {
    swiperRef.current?.slideTo(index);
  };

  return (
    <section
      id="our-journey"
      className={`relative overflow-hidden ${ABOUT_BG_SURFACE} ${ABOUT_SECTION_PAD}`}
      aria-label="Our Journey timeline"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(33,140,206,0.07),transparent_55%)]"
        aria-hidden
      />

      <div className={`relative z-10 ${ABOUT_INNER}`}>
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between lg:mb-12">
          <div className="max-w-2xl min-w-0 flex-1 [&_>div]:mb-0">
            <SectionHeading
              label={journeySection.label}
              title={journeySection.title}
              description={journeySection.subtitle}
              align="left"
            />
          </div>
          <div className="flex shrink-0 gap-2.5 self-start sm:self-end">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous year"
              className={ABOUT_NAV_BTN}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next year"
              className={ABOUT_NAV_BTN}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Year rail — equal circles, line through exact middle */}
        <div className="mb-8 rounded-[24px] border border-[#e8edf2] bg-white/90 px-3 py-4 shadow-[0_8px_28px_rgba(15,23,42,0.04)] sm:mb-10 sm:px-5 sm:py-5 dark:border-border dark:bg-card/80">
          <div
            ref={yearRailRef}
            className="overflow-x-auto overflow-y-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div
              className="relative mx-auto min-w-[720px] px-1 pt-1 sm:min-w-0"
              role="tablist"
              aria-label="Journey years 2010 to 2025"
            >
              {/* Line centered on 16px circle track (top-1 + 8px) */}
              <div
                className="pointer-events-none absolute top-[calc(0.25rem+8px)] right-2 left-2 h-0.5 -translate-y-1/2 rounded-full bg-[#e8edf2] dark:bg-border"
                aria-hidden
              >
                <div
                  className="absolute top-0 left-0 h-full rounded-full bg-engineering transition-all duration-500 ease-out"
                  style={{ width: `${activeYearPos * 100}%` }}
                />
              </div>

              <div className="relative flex justify-between">
                {journeyCards.map((card, yearIdx) => {
                  const active = yearIdx === activeIndex;

                  return (
                    <button
                      key={card.year}
                      ref={(el) => {
                        yearBtnRefs.current[yearIdx] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => goToYear(yearIdx)}
                      className={`group flex w-9 flex-col items-center gap-2.5 sm:w-auto sm:min-w-0 sm:flex-1 ${ABOUT_FOCUS_RING} ${ABOUT_TOUCH_TARGET}`}
                    >
                      {/* Fixed 16×16 track keeps all dots same visual size, no scale clip */}
                      <span className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center">
                        <span
                          className={`block h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 ${
                            active
                              ? "border-engineering bg-engineering ring-4 ring-engineering/20"
                              : card.isMilestone
                                ? "border-engineering bg-white group-hover:bg-engineering/15 dark:bg-card"
                                : "border-[#c5d0db] bg-white group-hover:border-engineering/50 dark:border-border dark:bg-card"
                          }`}
                          aria-hidden
                        />
                      </span>
                      <span
                        className={`text-[9px] font-bold tracking-[0.04em] tabular-nums sm:text-[10px] lg:text-[11px] ${
                          active
                            ? "text-engineering"
                            : card.isMilestone
                              ? "text-[#1a2b4a] group-hover:text-engineering dark:text-foreground"
                              : "text-[#94a3b8] group-hover:text-engineering"
                        }`}
                      >
                        {card.year}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {mounted && (
          <div>
            <Swiper
              modules={[Autoplay, Navigation, A11y, Keyboard, Pagination]}
              onSwiper={init}
              onSlideChange={(s) => setActiveIndex(s.activeIndex)}
              spaceBetween={20}
              slidesPerView={1}
              watchSlidesProgress
              autoplay={{ delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }}
              keyboard={{ enabled: true }}
              pagination={{
                clickable: true,
                el: ".journey-pagination",
              }}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="journey-swiper !overflow-hidden"
            >
              {journeyCards.map((card, index) => {
                const isActive = index === activeIndex;
                return (
                  <SwiperSlide key={card.year} className="!h-auto">
                    <article
                      className={`group/card flex h-full flex-col overflow-hidden ${ABOUT_CARD} ${ABOUT_CARD_HOVER} ${
                        isActive
                          ? "border-engineering/40 shadow-[0_16px_40px_rgba(33,140,206,0.12)]"
                          : ""
                      }`}
                    >
                      <div className="relative aspect-[16/11] w-full shrink-0 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className={`${CINEMATIC_IMAGE} transition-transform duration-700 group-hover/card:scale-[1.05]`}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/55 via-[#0a1628]/10 to-transparent" />

                        <span className="absolute top-3.5 left-3.5 rounded-full bg-engineering px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-white shadow-[0_6px_18px_rgba(33,140,206,0.4)]">
                          {card.year}
                        </span>

                        <span className="absolute right-3.5 bottom-3.5 max-w-[60%] truncate rounded-full border border-white/25 bg-[#0a1628]/45 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/90 backdrop-blur-[2px]">
                          {card.industry}
                        </span>
                      </div>

                      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
                        <div
                          className="absolute top-0 left-0 h-full w-[3px] bg-engineering/0 transition-colors duration-500 group-hover/card:bg-engineering"
                          aria-hidden
                        />

                        {!card.isMilestone && (
                          <span className="mb-2 inline-flex w-fit rounded-full border border-engineering/20 bg-engineering/5 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.14em] text-engineering uppercase">
                            Continuity
                          </span>
                        )}

                        <h3 className="mb-2 text-lg font-bold leading-snug text-[#1a2b4a] dark:text-foreground">
                          {card.title}
                        </h3>
                        <p className={`mb-5 line-clamp-3 ${ABOUT_BODY_SM}`}>
                          {card.description}
                        </p>

                        <div className="mt-auto rounded-[16px] border border-[#e8edf2] bg-[#fafbfd] p-3.5 dark:border-border dark:bg-surface/60">
                          <p className="mb-1 text-[10px] font-bold tracking-[0.16em] text-engineering uppercase">
                            Key Achievement
                          </p>
                          <p className="mb-2.5 line-clamp-2 text-sm font-semibold leading-snug text-[#1a2b4a] dark:text-foreground">
                            {card.keyAchievement}
                          </p>
                          <p className="inline-flex items-center gap-1.5 text-xs text-[#5a6478] dark:text-foreground-muted">
                            <MapPin className="h-3.5 w-3.5 shrink-0 text-engineering" aria-hidden />
                            <span className="line-clamp-1">{card.country}</span>
                          </p>
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div
              className="journey-pagination mt-7 flex justify-center gap-2.5 sm:mt-8"
              aria-label="Journey pagination"
            />
          </div>
        )}
      </div>

      <style jsx global>{`
        .journey-pagination {
          position: static !important;
          bottom: auto !important;
          padding-left: 0 !important;
          text-align: center !important;
          width: 100% !important;
        }
        .journey-pagination .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          margin: 0 !important;
          background: #c5d0db;
          opacity: 1;
          transition: width 0.3s ease, background 0.3s ease;
        }
        .journey-pagination .swiper-pagination-bullet-active {
          width: 24px;
          border-radius: 999px;
          background: #218cce;
        }
        .journey-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
}
