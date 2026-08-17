"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { NewsArticle } from "@/data/news";
import { projects, services } from "@/data/site";
import {
  CINEMATIC_IMAGE,
  NEWS_BG_SURFACE,
  NEWS_BG_WHITE,
  NEWS_CARD,
  NEWS_CARD_HOVER,
  NEWS_FOCUS_RING,
  NEWS_INNER,
  NEWS_SECTION_PAD,
  NEWS_TOUCH_TARGET,
} from "../constants";

import "swiper/css";

type ServiceItem = (typeof services)[number];
type ProjectItem = (typeof projects)[number];

function NavButtons({
  prevRef,
  nextRef,
  label,
}: {
  prevRef: React.RefObject<HTMLButtonElement | null>;
  nextRef: React.RefObject<HTMLButtonElement | null>;
  label: string;
}) {
  return (
    <div className="flex gap-2">
      <button
        ref={prevRef}
        type="button"
        aria-label={`Previous ${label}`}
        className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-[#1a2b4a] transition-all hover:border-engineering hover:text-engineering dark:border-border dark:bg-card dark:text-foreground ${NEWS_TOUCH_TARGET} ${NEWS_FOCUS_RING}`}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        ref={nextRef}
        type="button"
        aria-label={`Next ${label}`}
        className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-[#1a2b4a] transition-all hover:border-engineering hover:text-engineering dark:border-border dark:bg-card dark:text-foreground ${NEWS_TOUCH_TARGET} ${NEWS_FOCUS_RING}`}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function useSwiperNav() {
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

export function NewsDetailRelatedServices({ items }: { items: ServiceItem[] }) {
  const { prevRef, nextRef, mounted, init } = useSwiperNav();
  if (!items.length) return null;

  return (
    <section className={`${NEWS_BG_SURFACE} ${NEWS_SECTION_PAD}`} aria-labelledby="related-services">
      <div className={NEWS_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Related Services
            </p>
            <h2 id="related-services" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Explore Engineering Capabilities
            </h2>
          </div>
          <NavButtons prevRef={prevRef} nextRef={nextRef} label="services" />
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
              <SwiperSlide key={s.id} className="!h-auto">
                <Link
                  href="/services"
                  className={`group flex h-full flex-col overflow-hidden ${NEWS_CARD} ${NEWS_CARD_HOVER} ${NEWS_FOCUS_RING}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                      sizes="33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      {s.title}
                    </h3>
                    <p className="mb-4 flex-1 text-sm leading-[1.85] text-[#5a6478] dark:text-foreground-muted">
                      {s.description}
                    </p>
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

export function NewsDetailRelatedProjects({ items }: { items: ProjectItem[] }) {
  const { prevRef, nextRef, mounted, init } = useSwiperNav();
  if (!items.length) return null;

  return (
    <section className={`${NEWS_BG_WHITE} ${NEWS_SECTION_PAD}`} aria-labelledby="related-projects">
      <div className={NEWS_INNER}>
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Related Projects
            </p>
            <h2 id="related-projects" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Featured Engineering Programs
            </h2>
          </div>
          <NavButtons prevRef={prevRef} nextRef={nextRef} label="projects" />
        </div>
        {mounted && (
          <Swiper
            modules={[Navigation, A11y, Keyboard]}
            onSwiper={init}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
            className="!overflow-hidden"
          >
            {items.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link
                  href="/projects"
                  className={`group flex h-full flex-col overflow-hidden ${NEWS_CARD} ${NEWS_CARD_HOVER} ${NEWS_FOCUS_RING}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                      sizes="33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-semibold tracking-wide text-engineering uppercase">
                      {p.category}
                    </p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      {p.title}
                    </h3>
                    <p className="mb-2 inline-flex items-center gap-1.5 text-xs text-[#94a3b8]">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {p.location}
                    </p>
                    <p className="mb-4 text-xs text-[#5a6478] dark:text-foreground-muted">
                      Completion {p.year} · {p.status}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                      View project <ArrowRight className="h-4 w-4" />
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

export function NewsDetailRelatedArticles({ items }: { items: NewsArticle[] }) {
  if (!items.length) return null;

  return (
    <section className={`${NEWS_BG_SURFACE} ${NEWS_SECTION_PAD}`} aria-labelledby="related-articles">
      <div className={NEWS_INNER}>
        <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
          Related Articles
        </p>
        <h2
          id="related-articles"
          className="mb-8 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
        >
          Continue Reading
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((a) => (
            <Link
              key={a.id}
              href={`/blog/${a.slug}`}
              className={`group flex h-full flex-col overflow-hidden ${NEWS_CARD} ${NEWS_CARD_HOVER} ${NEWS_FOCUS_RING}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.title}
                  fill
                  className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-[#94a3b8]">
                  <span className="font-semibold tracking-wide text-engineering uppercase">
                    {a.category}
                  </span>
                  <span>·</span>
                  <time dateTime={a.date}>{a.dateLabel}</time>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" aria-hidden />
                    {a.readingTime}
                  </span>
                </div>
                <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {a.title}
                </h3>
                <p className="mb-4 line-clamp-2 flex-1 text-sm leading-[1.85] text-[#5a6478] dark:text-foreground-muted">
                  {a.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                  Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
