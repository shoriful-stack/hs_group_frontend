"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import ServiceCard from "@/components/ui/ServiceCard";
import { services, servicesSection } from "@/data/site";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(ScrollTrigger);

function BlueprintBackground() {
  return (
    <div
      data-blueprint
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute top-0 left-1/2 h-full w-[120%] max-w-none -translate-x-1/2 text-engineering/[0.035]"
        viewBox="0 0 1700 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="svc-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" stroke="currentColor" strokeWidth="0.75" />
          </pattern>
        </defs>
        <rect width="1700" height="900" fill="url(#svc-grid)" />
        <circle cx="280" cy="180" r="120" stroke="currentColor" strokeWidth="1" />
        <circle cx="280" cy="180" r="80" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
        <path
          d="M120 520h360M120 560h280M120 600h320M120 640h240"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <rect x="900" y="120" width="420" height="280" stroke="currentColor" strokeWidth="1" rx="4" />
        <path
          d="M900 280h420M1110 120v280M1020 200h180M1020 240h120"
          stroke="currentColor"
          strokeWidth="0.75"
        />
        <path
          d="M600 680c80-60 160-40 240-100s200-40 280 20 180 60 280 0"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  const { label, title, subtitle } = servicesSection;

  useEffect(() => setMounted(true), []);

  const initSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    if (
      swiper.params.navigation &&
      typeof swiper.params.navigation !== "boolean"
    ) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const blueprint = section.querySelector("[data-blueprint]");
      const cards = section.querySelectorAll(".service-card");

      gsap.set(headerRef.current, { opacity: 0, y: 40 });
      gsap.set(cards, { opacity: 0, y: 48 });

      gsap.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      if (blueprint) {
        gsap.to(blueprint, {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden bg-[#fafbfd] py-24 sm:py-28 lg:py-32 dark:bg-background"
    >
      <BlueprintBackground />

        <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div ref={headerRef} className="mb-16 max-w-4xl lg:mb-20">
          <span className="section-label mb-5 block">
            {label}
          </span>
          <h2 className="section-title mb-6 max-w-4xl text-[#1a2b4a] xl:text-[52px] dark:text-foreground">
            {title}
          </h2>
          <p className="max-w-3xl text-base leading-[1.9] text-[#5a6478] sm:text-[17px] dark:text-foreground-muted">
            {subtitle}
          </p>
        </div>

        <div ref={carouselRef} className="relative">
          <div className="mb-6 flex items-center justify-end gap-3">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous service"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#1a2b4a] shadow-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-engineering hover:text-engineering disabled:opacity-40 dark:border-border dark:bg-card dark:text-foreground"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next service"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#e2e8f0] bg-white text-[#1a2b4a] shadow-sm transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-engineering hover:text-engineering disabled:opacity-40 dark:border-border dark:bg-card dark:text-foreground"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {mounted && (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={20}
              slidesPerView={1}
              grabCursor
              speed={600}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={{
                clickable: true,
                el: ".service-swiper-pagination",
                bulletClass: "service-dot",
                bulletActiveClass: "service-dot-active",
              }}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 2.5, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 28 },
              }}
              onBeforeInit={initSwiper}
              onSwiper={initSwiper}
              className="service-swiper !overflow-visible"
            >
              {services.map((service, i) => (
                <SwiperSlide key={service.id} className="!h-auto">
                  <ServiceCard
                    number={String(i + 1).padStart(2, "0")}
                    id={service.id}
                    title={service.title}
                    description={service.description}
                    image={service.image}
                    featured={i === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="service-swiper-pagination mt-8 flex justify-center gap-2" />
        </div>
      </div>
    </section>
  );
}
