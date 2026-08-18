"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import type { HeroSlideView } from "@/types/home";

import "swiper/css";
import "swiper/css/effect-fade";

const OVERLAY =
  "absolute inset-0 bg-gradient-to-t from-[#0a1628]/85 via-[#0a1628]/30 to-transparent";

function goToSlide(swiper: SwiperType | null, index: number, loop: boolean) {
  if (!swiper) return;
  if (loop) swiper.slideToLoop(index);
  else swiper.slideTo(index);
}

function SlideBackground({
  slide,
  priority,
}: {
  slide: HeroSlideView;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !slide.video) return;

    const playVideo = () => {
      video.play().catch(() => {});
    };

    video.load();
    video.addEventListener("canplaythrough", playVideo);
    if (video.readyState >= 3) playVideo();

    return () => video.removeEventListener("canplaythrough", playVideo);
  }, [slide]);

  if (slide.video) {
    return (
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ width: "100%", height: "100%" }}
      >
        <source src={slide.video} type="video/mp4" />
      </video>
    );
  }

  if (!slide.image) return null;

  return (
    <Image
      src={slide.image}
      alt={slide.title}
      fill
      priority={priority}
      className="object-cover"
      sizes="100vw"
    />
  );
}

function HeroSlideContent({ slide }: { slide: HeroSlideView }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-start pb-24 pl-4 sm:pb-32 sm:pl-8 lg:pb-36 lg:pl-12">
      <div className="pointer-events-auto max-w-3xl">
        {slide.title ? (
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[34px] font-bold leading-[1.1] tracking-tight text-white sm:text-[40px] md:text-[44px] lg:text-[56px]"
          >
            {slide.title}
          </motion.h2>
        ) : null}

        {slide.subtitle ? (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-lg font-medium leading-snug tracking-tight text-white/85 sm:text-xl lg:text-[22px]"
          >
            {slide.subtitle}
          </motion.p>
        ) : null}

        {slide.description ? (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-base leading-[1.8] text-white/75 sm:text-[17px] lg:text-lg"
          >
            {slide.description}
          </motion.p>
        ) : null}

        {slide.url ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            <Link href={slide.url} className="btn-primary group">
              Explore Our Journey
              <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
            </Link>
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}

export default function HeroSlider({ slides }: { slides: HeroSlideView[] }) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const total = slides.length;
  const firstSlide = slides[0];

  useEffect(() => setMounted(true), []);

  if (total === 0) {
    return <section className="relative h-screen min-h-[520px] w-full bg-[#0a1628]" aria-label="Hero" />;
  }

  return (
    <section className="relative h-screen min-h-[520px] w-full overflow-hidden">
      {/* SSR-safe static first slide */}
      {!mounted && firstSlide && (
        <div className="absolute inset-0">
          {firstSlide.video ? (
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={firstSlide.video} type="video/mp4" />
            </video>
          ) : firstSlide.image ? (
            <Image
              src={firstSlide.image}
              alt={firstSlide.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          ) : null}
          <div className={OVERLAY} />
          <HeroSlideContent slide={firstSlide} />
        </div>
      )}

      {mounted && (
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={total > 1}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="hero-swiper h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id} className="!h-full">
              <div className="relative h-full min-h-[520px] w-full">
                <SlideBackground slide={slide} priority={index === 0} />
                <div className={OVERLAY} />
                {activeIndex === index && <HeroSlideContent slide={slide} />}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="absolute bottom-8 left-4 z-20 flex items-end gap-6 sm:left-8 lg:left-12">
        <div className="flex items-baseline gap-2 font-semibold text-white" suppressHydrationWarning>
          <span className="text-4xl leading-none sm:text-5xl">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-lg text-white/50">/</span>
          <span className="text-lg text-white/50">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {mounted && (
          <div className="mb-2 hidden items-center gap-2 sm:flex">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(swiperRef.current, i, total > 1)}
                className="group relative h-1 w-10 overflow-hidden rounded-full bg-white/30 sm:w-14"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={`absolute inset-y-0 left-0 rounded-full bg-white transition-all duration-500 ${
                    i === activeIndex ? "w-full" : "w-0"
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {mounted && (
        <div className="absolute right-4 bottom-8 z-20 hidden gap-3 md:flex lg:right-12">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(swiperRef.current, i, total > 1)}
              className={`relative h-16 w-24 overflow-hidden rounded-lg border-2 transition-all lg:h-20 lg:w-32 ${
                i === activeIndex
                  ? "border-white opacity-100"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              {slide.image ? (
                <Image src={slide.image} alt="" fill className="object-cover" sizes="128px" />
              ) : (
                <span className="absolute inset-0 bg-[#0a1628]" />
              )}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
