"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cable,
  ChevronRight,
  Cpu,
  Settings,
  Wrench,
  Zap,
} from "lucide-react";
import { gsap } from "gsap";
import { servicesHero } from "@/data/services-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  SERVICES_FOCUS_RING_LIGHT,
  SERVICES_HEADING_HERO,
  SERVICES_HERO_BREADCRUMB,
  SERVICES_HERO_BREADCRUMB_LIST,
  SERVICES_HERO_CONTENT,
  SERVICES_HERO_SHELL,
  SERVICES_INNER,
} from "./constants";

const trustChips = ["Power", "Telecom", "Solar", "Civil", "Automation", "IoT"];

const floatingIcons = [
  { Icon: Wrench, left: "62%", top: "28%", delay: 0 },
  { Icon: Zap, left: "78%", top: "42%", delay: 0.4 },
  { Icon: Cable, left: "68%", top: "58%", delay: 0.8 },
  { Icon: Settings, left: "84%", top: "68%", delay: 1.1 },
  { Icon: Cpu, left: "74%", top: "78%", delay: 1.4 },
];

function ScrollMouseIcon() {
  return (
    <div className="relative flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/50 pt-1.5">
      <span className="h-1.5 w-1 animate-[scroll-wheel_1.6s_ease-in-out_infinite] rounded-full bg-white/80" />
    </div>
  );
}

function FloatingParticles() {
  const particles = [
    { left: "12%", top: "22%", size: 3, delay: 0 },
    { left: "78%", top: "16%", size: 2, delay: 1.1 },
    { left: "54%", top: "44%", size: 2, delay: 0.5 },
    { left: "88%", top: "58%", size: 3, delay: 1.9 },
    { left: "28%", top: "52%", size: 2, delay: 1.4 },
    { left: "66%", top: "70%", size: 2, delay: 2.2 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-engineering/35 motion-safe:animate-[particle-float_6s_ease-in-out_infinite]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, animationDelay: `${p.delay}s` }}
        />
      ))}
    </div>
  );
}

export default function ServicesHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || reducedMotion) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.fromTo(imageRef.current, { scale: 1.12 }, { scale: 1, duration: 9, ease: "power1.out" });
      }
      if (sweepRef.current) {
        gsap.fromTo(
          sweepRef.current,
          { x: "-40%", opacity: 0 },
          { x: "120%", opacity: 0.45, duration: 2.8, ease: "power2.inOut", delay: 0.4 },
        );
      }

      gsap.from(content.querySelectorAll("[data-hero-reveal]"), {
        opacity: 0,
        y: 32,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.09,
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
      className={SERVICES_HERO_SHELL}
      aria-label="Engineering Services"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image src={servicesHero.image} alt="" fill priority className={CINEMATIC_IMAGE} sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/70 to-[#0a1628]/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/75 via-transparent to-[#0a1628]/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_90%,rgba(33,140,206,0.28),transparent_50%)]" />

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.055]"
        viewBox="0 0 1440 800"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M0 160H1440M0 320H1440M0 480H1440M0 640H1440" stroke="currentColor" strokeWidth="0.75" />
        <path d="M240 0V800M480 0V800M720 0V800M960 0V800M1200 0V800" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="240" cy="320" r="48" stroke="currentColor" strokeWidth="0.75" />
        <circle cx="960" cy="480" r="72" stroke="currentColor" strokeWidth="0.75" />
      </svg>

      {!reducedMotion && (
        <div
          ref={sweepRef}
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          aria-hidden
        />
      )}
      {!reducedMotion && <FloatingParticles />}

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

      <div className={`${SERVICES_HERO_CONTENT} ${SERVICES_INNER}`}>
        <div ref={contentRef} className="max-w-3xl text-left">
          <nav aria-label="Breadcrumb" data-hero-reveal className={SERVICES_HERO_BREADCRUMB}>
            <ol className={SERVICES_HERO_BREADCRUMB_LIST}>
              <li>
                <Link href="/" className={`transition-colors hover:text-white/90 ${SERVICES_FOCUS_RING_LIGHT}`}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="text-white/85" aria-current="page">
                Services
              </li>
            </ol>
          </nav>

          <span
            data-hero-reveal
            className="mb-4 block text-xs font-bold tracking-[0.24em] text-white/75 uppercase sm:text-[13px]"
          >
            {servicesHero.label}
          </span>
          <h1 data-hero-reveal className={SERVICES_HEADING_HERO}>
            {servicesHero.headline}
          </h1>
          <p
            data-hero-reveal
            className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-[17px] lg:text-lg"
          >
            {servicesHero.subtitle}
          </p>

          <div
            data-hero-reveal
            className="mt-8 flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Link
              href={servicesHero.primaryCta.href}
              className={`group inline-flex w-full items-center justify-center gap-2 rounded-full bg-engineering px-8 py-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(33,140,206,0.28)] transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-[#1a7ab8] hover:shadow-[0_14px_36px_rgba(33,140,206,0.38)] sm:w-auto ${SERVICES_FOCUS_RING_LIGHT}`}
            >
              {servicesHero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
            </Link>
            <Link
              href={servicesHero.secondaryCta.href}
              className={`group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-8 py-3.5 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] sm:w-auto ${SERVICES_FOCUS_RING_LIGHT}`}
            >
              {servicesHero.secondaryCta.label}
            </Link>
          </div>

          <div data-hero-reveal className="mt-6 flex flex-wrap gap-2">
            {trustChips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-white/75"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        ref={scrollRef}
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to explore"
        className={`absolute bottom-6 left-1/2 z-20 flex min-h-12 -translate-x-1/2 flex-col items-center justify-center gap-2 px-4 py-2 text-white/65 transition-colors hover:text-white sm:bottom-8 ${SERVICES_FOCUS_RING_LIGHT}`}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Scroll to Explore
        </span>
        <ScrollMouseIcon />
      </button>
    </section>
  );
}
