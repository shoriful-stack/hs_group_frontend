"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Box,
  Cable,
  ChevronRight,
  Cpu,
  Package,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";
import { productsHero } from "@/data/products-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_FOCUS_RING_LIGHT,
  PRODUCTS_HEADING_HERO,
  PRODUCTS_HERO_BREADCRUMB,
  PRODUCTS_HERO_BREADCRUMB_LIST,
  PRODUCTS_HERO_CONTENT,
  PRODUCTS_HERO_SHELL,
  PRODUCTS_INNER,
} from "./constants";

const floatingIcons = [
  { Icon: Box, left: "62%", top: "28%", delay: 0 },
  { Icon: Zap, left: "78%", top: "42%", delay: 0.4 },
  { Icon: Cpu, left: "68%", top: "58%", delay: 0.8 },
  { Icon: Package, left: "84%", top: "68%", delay: 1.1 },
  { Icon: Cable, left: "74%", top: "78%", delay: 1.4 },
  { Icon: ShieldCheck, left: "58%", top: "72%", delay: 1.7 },
];

function ScrollMouseIcon() {
  return (
    <div className="relative flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/50 pt-1.5">
      <span className="h-1.5 w-1 animate-[scroll-wheel_1.6s_ease-in-out_infinite] rounded-full bg-white/80" />
    </div>
  );
}

export default function ProductsHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, { scale: 1.1 }, { scale: 1, duration: 8, ease: "power1.out" });
      }

      gsap.from(content.querySelectorAll("[data-hero-reveal]"), {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
      });

      if (iconsRef.current) {
        const icons = iconsRef.current.querySelectorAll("[data-float-icon]");

        gsap.from(icons, {
          opacity: 0,
          scale: 0.7,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.35,
        });

        icons.forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -14 : 12,
            x: i === 1 || i === 3 ? -8 : 6,
            duration: 2.8 + i * 0.45,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: floatingIcons[i]?.delay ?? 0,
          });

          gsap.to(el, {
            rotation: i % 2 === 0 ? 4 : -4,
            duration: 3.2 + i * 0.3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: floatingIcons[i]?.delay ?? 0,
          });
        });
      }

      if (scrollRef.current) {
        gsap.from(scrollRef.current, { opacity: 0, y: 12, duration: 0.6, delay: 0.8 });
        gsap.to(scrollRef.current, {
          y: 6,
          duration: 1.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToContent = () => {
    const next = sectionRef.current?.nextElementSibling;
    if (!next) return;
    next.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className={PRODUCTS_HERO_SHELL}
      aria-label="Engineering Products"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image src={productsHero.image} alt="" fill priority className={CINEMATIC_IMAGE} sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-[#0a1628]/55 to-[#0a1628]/35" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(33,140,206,0.22),transparent_55%)]" />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.05]"
        viewBox="0 0 1440 800"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0 160H1440M0 320H1440M0 480H1440M0 640H1440" stroke="currentColor" strokeWidth="0.75" />
        <path d="M240 0V800M480 0V800M720 0V800M960 0V800M1200 0V800" stroke="currentColor" strokeWidth="0.75" />
      </svg>

      <div
        ref={iconsRef}
        className="pointer-events-none absolute inset-0 z-[5] hidden lg:block"
        aria-hidden
      >
        {floatingIcons.map(({ Icon, left, top }, i) => (
          <div
            key={i}
            data-float-icon
            className="absolute flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-[2px]"
            style={{ left, top }}
          >
            <Icon className="h-6 w-6" strokeWidth={1.75} />
          </div>
        ))}
      </div>

      <div className={`${PRODUCTS_HERO_CONTENT} ${PRODUCTS_INNER}`}>
        <div ref={contentRef} className="max-w-3xl text-left">
          <nav aria-label="Breadcrumb" data-hero-reveal className={PRODUCTS_HERO_BREADCRUMB}>
            <ol className={PRODUCTS_HERO_BREADCRUMB_LIST}>
              <li>
                <Link href="/" className={`hover:text-white/90 ${PRODUCTS_FOCUS_RING_LIGHT} rounded`}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="text-white/85" aria-current="page">
                Products
              </li>
            </ol>
          </nav>

          <span
            data-hero-reveal
            className="mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.24em] text-engineering-light uppercase"
          >
            <span className="h-px w-8 bg-engineering-light/70" aria-hidden />
            {productsHero.label}
          </span>
          <h1 data-hero-reveal className={`mb-5 ${PRODUCTS_HEADING_HERO}`}>
            {productsHero.headline}
          </h1>
          <p data-hero-reveal className="mb-8 max-w-2xl text-base leading-[1.85] text-white/80 sm:text-lg">
            {productsHero.subtitle}
          </p>
          <div data-hero-reveal className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
            <Link
              href={productsHero.primaryCta.href}
              className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-engineering px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-[#1a7ab8] hover:shadow-[0_14px_36px_rgba(33,140,206,0.38)] sm:w-auto ${PRODUCTS_FOCUS_RING_LIGHT}`}
            >
              {productsHero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
            </Link>
            <Link
              href={productsHero.secondaryCta.href}
              className={`group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] sm:w-auto ${PRODUCTS_FOCUS_RING_LIGHT}`}
            >
              {productsHero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <button
        ref={scrollRef}
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to explore"
        className={`absolute bottom-6 left-1/2 z-20 flex min-h-12 -translate-x-1/2 flex-col items-center justify-center gap-2 px-4 py-2 text-white/65 transition-colors hover:text-white sm:bottom-8 ${PRODUCTS_FOCUS_RING_LIGHT}`}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Scroll to Explore
        </span>
        <ScrollMouseIcon />
      </button>
    </section>
  );
}
