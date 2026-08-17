"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Camera,
  ChevronRight,
  Newspaper,
  PenLine,
} from "lucide-react";
import { gsap } from "gsap";
import { newsHero } from "@/data/news";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  NEWS_BTN_MOBILE,
  NEWS_FOCUS_RING_LIGHT,
  NEWS_HEADING_HERO,
  NEWS_HERO_BREADCRUMB,
  NEWS_HERO_BREADCRUMB_LIST,
  NEWS_HERO_CONTENT,
  NEWS_HERO_SHELL,
  NEWS_INNER,
} from "./constants";

const floatingIcons = [
  { Icon: Newspaper, left: "62%", top: "28%", delay: 0 },
  { Icon: PenLine, left: "78%", top: "42%", delay: 0.4 },
  { Icon: BookOpen, left: "68%", top: "58%", delay: 0.8 },
  { Icon: Camera, left: "84%", top: "68%", delay: 1.1 },
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
    { left: "18%", top: "22%", size: 3, delay: 0 },
    { left: "72%", top: "18%", size: 2, delay: 1.2 },
    { left: "58%", top: "42%", size: 2, delay: 0.6 },
    { left: "84%", top: "55%", size: 3, delay: 2 },
    { left: "32%", top: "38%", size: 2, delay: 1.8 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-engineering/30 motion-safe:animate-[particle-float_6s_ease-in-out_infinite]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function NewsHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content || reducedMotion) return;

    const ctx = gsap.context(() => {
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
      className={NEWS_HERO_SHELL}
      aria-label="News and Media"
    >
      <div className="absolute inset-0">
        <Image
          src={newsHero.image}
          alt=""
          fill
          priority
          className={CINEMATIC_IMAGE}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/88 via-[#0a1628]/50 to-[#0a1628]/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(33,140,206,0.22),transparent_55%)]" />
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

      <div className={`${NEWS_HERO_CONTENT} ${NEWS_INNER}`}>
        <div ref={contentRef} className="max-w-3xl text-left">
          <nav aria-label="Breadcrumb" data-hero-reveal className={NEWS_HERO_BREADCRUMB}>
            <ol className={NEWS_HERO_BREADCRUMB_LIST}>
              <li>
                <Link href="/" className={`transition-colors hover:text-white/90 ${NEWS_FOCUS_RING_LIGHT}`}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="text-white/85" aria-current="page">
                News & Media
              </li>
            </ol>
          </nav>

          <span
            data-hero-reveal
            className="mb-4 block text-xs font-bold tracking-[0.24em] text-white/75 uppercase sm:text-[13px]"
          >
            {newsHero.label}
          </span>
          <h1 data-hero-reveal className={NEWS_HEADING_HERO}>
            {newsHero.headline}
          </h1>
          <p
            data-hero-reveal
            className="mt-4 max-w-xl text-base leading-relaxed text-white/85 sm:text-[17px] lg:text-lg"
          >
            {newsHero.subtitle}
          </p>
          <div
            data-hero-reveal
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a href={newsHero.primaryCta.href} className={`btn-primary group justify-center ${NEWS_BTN_MOBILE}`}>
              {newsHero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
            </a>
            <a
              href={newsHero.secondaryCta.href}
              className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-[400ms] hover:-translate-y-0.5 hover:bg-white hover:text-[#1a2b4a] ${NEWS_BTN_MOBILE} ${NEWS_FOCUS_RING_LIGHT}`}
            >
              {newsHero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <button
        ref={scrollRef}
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to explore"
        className={`absolute bottom-6 left-1/2 z-20 flex min-h-12 -translate-x-1/2 flex-col items-center justify-center gap-2 px-4 py-2 text-white/65 transition-colors hover:text-white sm:bottom-8 ${NEWS_FOCUS_RING_LIGHT}`}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Scroll to Explore
        </span>
        <ScrollMouseIcon />
      </button>
    </section>
  );
}
