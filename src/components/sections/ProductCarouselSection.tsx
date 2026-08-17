"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { products, productsSection } from "@/data/site";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function EngineeringLineGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M-40 620C120 520 280 680 440 560C600 440 720 240 920 300C1120 360 1240 520 1480 420"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M80 180C240 280 400 120 580 220C760 320 900 480 1100 380C1220 320 1320 260 1500 340"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M200 780H1240M320 780V520M720 780V420M1120 780V560"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M360 120L520 280L680 160L860 300L1040 180"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  );
}

export default function ProductCarouselSection() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const { label, title, subtitle } = productsSection;

  const goToSlide = useCallback((index: number) => {
    const clamped = Math.min(products.length - 1, Math.max(0, index));
    setActiveIndex(clamped);
    swiperRef.current?.slideTo(clamped, 500);
  }, []);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const initSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
  }, []);

  useEffect(() => {
    if (!mounted || isMobile) return;

    const el = carouselRef.current;
    if (!el) return;

    let locked = false;
    let timer: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      const swiper = swiperRef.current;
      if (!swiper) return;

      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 8) return;

      const down = delta > 0;
      const up = delta < 0;

      if (down && swiper.isEnd) return;
      if (up && swiper.isBeginning) return;

      e.preventDefault();
      e.stopPropagation();

      if (locked) return;
      locked = true;
      timer = setTimeout(() => {
        locked = false;
      }, 500);

      if (down) swiper.slideNext();
      else swiper.slidePrev();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(timer);
    };
  }, [mounted, isMobile]);

  return (
    <section className="relative w-full overflow-hidden bg-[#DFF6FA] lg:min-h-[1150px]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden text-[#218cce]/[0.04]" aria-hidden>
        <EngineeringLineGraphic className="absolute top-1/2 left-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 flex w-full flex-col">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="px-6 pt-16 pb-10 text-center sm:px-10 sm:pt-20 lg:px-16 lg:pt-24 lg:pb-12"
        >
          <span className="mb-5 block text-xs font-bold tracking-[0.22em] text-engineering sm:text-[13px]">
            {label}
          </span>
          <h2 className="mx-auto mb-6 max-w-4xl text-[28px] font-bold leading-[1.2] text-[#1a2b4a] sm:text-4xl lg:text-[44px]">
            {title}
          </h2>
          <p className="mx-auto max-w-3xl text-[15px] leading-[1.9] text-[#5a6478] sm:text-base">
            {subtitle}
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          className="product-carousel-wrapper relative w-full overflow-hidden"
          data-lenis-prevent
        >
          <button
            ref={prevRef}
            type="button"
            aria-label="Previous products"
            onClick={() => goToSlide(activeIndex - 1)}
            className="product-nav-prev absolute top-1/2 left-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-[#1a2b4a]/80 transition-colors hover:text-engineering sm:left-6 lg:left-10 xl:flex"
          >
            <ChevronLeft className="h-8 w-8 stroke-[1.5]" />
          </button>

          <button
            ref={nextRef}
            type="button"
            aria-label="Next products"
            onClick={() => goToSlide(activeIndex + 1)}
            className="product-nav-next absolute top-1/2 right-3 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center text-[#1a2b4a]/80 transition-colors hover:text-engineering sm:right-6 lg:right-10 xl:flex"
          >
            <ChevronRight className="h-8 w-8 stroke-[1.5]" />
          </button>

          {!mounted ? (
            <div className="flex gap-6 overflow-hidden px-6 sm:px-10 lg:px-16">
              {products.slice(0, 4).map((product, i) => (
                <ProductCard key={product.id} product={product} isActive={i === 0} priority={i < 2} />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Mousewheel]}
              direction="horizontal"
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={16}
              centeredSlides
              loop={false}
              grabCursor
              speed={700}
              watchOverflow
              watchSlidesProgress
              allowTouchMove
              mousewheel={{
                enabled: false,
                forceToAxis: true,
                releaseOnEdges: true,
                sensitivity: 1,
                thresholdDelta: 15,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              pagination={{
                clickable: true,
                el: ".product-carousel-pagination",
                bulletClass: "product-dot",
                bulletActiveClass: "product-dot-active",
              }}
              onBeforeInit={(swiper) => {
                if (typeof swiper.params.navigation !== "boolean") {
                  swiper.params.navigation!.prevEl = prevRef.current;
                  swiper.params.navigation!.nextEl = nextRef.current;
                }
              }}
              onSwiper={initSwiper}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 16, centeredSlides: true },
                768: { slidesPerView: 2, spaceBetween: 20, centeredSlides: false },
                1280: { slidesPerView: "auto", spaceBetween: 24, centeredSlides: false },
              }}
              className="product-swiper !overflow-visible !px-6 sm:!px-10 lg:!px-16"
            >
              {products.map((product, i) => (
                <SwiperSlide key={product.id} className="product-slide !w-[380px] max-w-[85vw] !h-auto">
                  <div className="flex justify-center lg:justify-start">
                    <ProductCard
                      product={product}
                      isActive={activeIndex === i}
                      priority={i < 4}
                      isMobile={isMobile}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {mounted && (
            <div className="product-carousel-pagination relative z-10 mt-8 flex justify-center gap-2 pb-2" />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="px-6 pt-10 pb-14 text-center sm:px-10 lg:pb-16"
        >
          <Link
            href="/products"
            className="group inline-flex items-center gap-4 rounded-2xl bg-engineering py-4 pr-4 pl-9 text-[15px] font-semibold text-white shadow-[0_12px_32px_rgba(33,140,206,0.35)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#1a7ab8] hover:shadow-[0_18px_40px_rgba(33,140,206,0.42)]"
          >
            View All Products
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
