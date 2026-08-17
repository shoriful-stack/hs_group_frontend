"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download, Headset, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { ProductDetail } from "@/data/product-detail";
import type { PortfolioProject } from "@/data/projects-page";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_BG_SURFACE,
  PRODUCTS_BLOCK_SPACING,
  PRODUCTS_BTN_MOBILE,
  PRODUCTS_CARD,
  PRODUCTS_CARD_HOVER,
  PRODUCTS_FOCUS_RING,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
  PRODUCTS_TOUCH_TARGET,
} from "../constants";

import "swiper/css";

export function ProductDetailProjectProof({ projects }: { projects: PortfolioProject[] }) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const init = useCallback((swiper: SwiperType) => {
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
  }, []);

  return (
    <section
      id="project-proof"
      className={`scroll-mt-28 ${PRODUCTS_BG_SURFACE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="project-proof-heading"
    >
      <div className={PRODUCTS_INNER}>
        <div
          className={`${PRODUCTS_BLOCK_SPACING} flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between`}
        >
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Project Proof
            </p>
            <h2
              id="project-proof-heading"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Proven in Real Projects
            </h2>
            <p className="mt-3 max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
              Case studies where this product category has been applied in the field.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              ref={prevRef}
              type="button"
              aria-label="Previous project"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              ref={nextRef}
              type="button"
              aria-label="Next project"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {mounted && (
          <Swiper
            modules={[Navigation, A11y, Keyboard]}
            onSwiper={init}
            spaceBetween={24}
            slidesPerView={1.05}
            breakpoints={{ 640: { slidesPerView: 1.4 }, 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
            className="!overflow-hidden"
          >
            {projects.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link
                  href={`/projects/${p.slug}`}
                  className={`group flex h-full flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER} ${PRODUCTS_FOCUS_RING}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                      sizes="(max-width: 768px) 90vw, 33vw"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-[#0f1729]/55 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                      Case Study
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="mb-1 text-xs font-semibold tracking-wide text-engineering uppercase">
                      {p.industry}
                    </p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      {p.title}
                    </h3>
                    <p className="mb-4 text-xs text-[#94a3b8]">{p.location}</p>
                    <span className="mt-auto text-sm font-semibold text-engineering">
                      View Case Study →
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

export function ProductDetailInquiryBar({ product }: { product: ProductDetail }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed || !visible) return null;

  return (
    <>
      <aside
        className="pointer-events-none fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 xl:block"
        aria-label="Persistent product inquiry"
      >
        <div
          className={`pointer-events-auto w-[260px] p-4 shadow-[0_16px_40px_rgba(15,23,42,0.16)] ${PRODUCTS_CARD}`}
        >
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-bold tracking-[0.18em] text-engineering uppercase">
                Inquiry
              </p>
              <p className="mt-1 line-clamp-2 text-sm font-bold text-[#1a2b4a] dark:text-foreground">
                {product.title}
              </p>
            </div>
            <button
              type="button"
              aria-label="Dismiss inquiry panel"
              onClick={() => setDismissed(true)}
              className={`rounded-full p-1 text-[#94a3b8] hover:text-engineering ${PRODUCTS_FOCUS_RING}`}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <Link
              href={`/contact?intent=rfq&product=${product.slug}`}
              className={`btn-primary flex w-full items-center justify-center gap-2 px-3 py-2.5 text-xs ${PRODUCTS_FOCUS_RING}`}
            >
              Request Quote
            </Link>
            <Link
              href={`/contact?intent=specialist&product=${product.slug}`}
              className={`btn-secondary flex w-full items-center justify-center gap-2 px-3 py-2.5 text-xs ${PRODUCTS_FOCUS_RING}`}
            >
              <Headset className="h-3.5 w-3.5" />
              Product Specialist
            </Link>
            <a
              href="#downloads"
              className={`btn-secondary flex w-full items-center justify-center gap-2 px-3 py-2.5 text-xs ${PRODUCTS_FOCUS_RING}`}
            >
              <Download className="h-3.5 w-3.5" />
              Datasheet
            </a>
          </div>
        </div>
      </aside>

      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e8edf2] bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md xl:hidden dark:border-border dark:bg-background/95"
        role="region"
        aria-label="Mobile product inquiry"
      >
        <div className="mx-auto flex max-w-lg gap-2">
          <Link
            href={`/contact?intent=rfq&product=${product.slug}`}
            className={`btn-primary flex flex-1 items-center justify-center gap-1 px-2 py-3 text-[11px] ${PRODUCTS_BTN_MOBILE} ${PRODUCTS_FOCUS_RING}`}
          >
            Request Quote
          </Link>
          <Link
            href={`/contact?intent=specialist&product=${product.slug}`}
            className={`btn-secondary flex flex-1 items-center justify-center gap-1 px-2 py-3 text-[11px] ${PRODUCTS_BTN_MOBILE} ${PRODUCTS_FOCUS_RING}`}
          >
            Specialist
          </Link>
          <a
            href="#downloads"
            className={`btn-secondary flex items-center justify-center px-3 py-3 ${PRODUCTS_FOCUS_RING}`}
            aria-label="Download datasheet"
          >
            <Download className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}
