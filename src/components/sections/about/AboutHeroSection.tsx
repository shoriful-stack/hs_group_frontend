"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Award, Building2, ChevronRight, Globe, Users } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { aboutHero } from "@/data/about";
import {
  ABOUT_BTN_MOBILE,
  ABOUT_FOCUS_RING_LIGHT,
  ABOUT_HEADING_HERO,
  ABOUT_HERO_BREADCRUMB,
  ABOUT_HERO_BREADCRUMB_LIST,
  ABOUT_HERO_CONTENT,
  ABOUT_HERO_SHELL,
  ABOUT_INNER,
} from "./constants";
import { useAboutReducedMotion } from "./useAboutReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const floatingIcons = [
  { Icon: Users, left: "62%", top: "28%", delay: 0 },
  { Icon: Globe, left: "78%", top: "42%", delay: 0.4 },
  { Icon: Building2, left: "68%", top: "58%", delay: 0.8 },
  { Icon: Award, left: "84%", top: "68%", delay: 1.1 },
];

function ScrollMouseIcon() {
  return (
    <div className="relative flex h-9 w-5 items-start justify-center rounded-full border-2 border-white/50 pt-1.5">
      <span className="h-1.5 w-1 animate-[scroll-wheel_1.6s_ease-in-out_infinite] rounded-full bg-white/80" />
    </div>
  );
}

function BlueprintLines() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-white/[0.04]"
      viewBox="0 0 1440 900"
      fill="none"
      aria-hidden
      preserveAspectRatio="xMidYMid slice"
    >
      <path d="M0 180H1440M0 360H1440M0 540H1440M0 720H1440" stroke="currentColor" strokeWidth="0.75" />
      <path d="M180 0V900M360 0V900M540 0V900M720 0V900M900 0V900M1080 0V900M1260 0V900" stroke="currentColor" strokeWidth="0.75" />
      <path d="M120 80L420 280M820 120L1120 380M200 620L520 820" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
      <circle cx="420" cy="280" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="1120" cy="380" r="3" fill="currentColor" opacity="0.5" />
    </svg>
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
          className="absolute rounded-full bg-engineering/30 animate-[particle-float_6s_ease-in-out_infinite]"
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

export default function AboutHeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const play = () => video.play().catch(() => {});
    video.addEventListener("canplaythrough", play);
    if (video.readyState >= 3) play();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    return () => {
      video.removeEventListener("canplaythrough", play);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const scroll = scrollRef.current;
    if (!section || !content || reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      const label = content.querySelector("[data-hero-label]");
      const lines = content.querySelectorAll("[data-hero-headline]");
      const masks = content.querySelectorAll("[data-hero-mask]");
      const subtitle = content.querySelector("[data-hero-subtitle]");
      const buttons = content.querySelector("[data-hero-buttons]");

      if (label) {
        tl.from(label, { opacity: 0, y: 24, letterSpacing: "0.32em" }, 0.15);
      }

      masks.forEach((mask, i) => {
        tl.from(
          mask,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          0.25 + i * 0.12
        );
      });

      lines.forEach((line, i) => {
        tl.from(line, { y: 28, opacity: 0 }, 0.3 + i * 0.1);
      });

      if (subtitle) {
        tl.from(subtitle, { opacity: 0, y: 24 }, 0.55);
      }

      if (buttons) {
        tl.from(buttons, { opacity: 0, y: 20 }, 0.68);
      }

      if (scroll) {
        tl.from(scroll, { opacity: 0, y: 12 }, 0.82);
        gsap.to(scroll, {
          y: 6,
          duration: 1.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

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

      gsap.to(videoWrapRef.current, {
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
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
      className={ABOUT_HERO_SHELL}
    >
      {/* Background video */}
      <div ref={videoWrapRef} className="absolute inset-0 origin-center">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={aboutHero.poster}
          controls={false}
          disablePictureInPicture
          aria-hidden
          className="h-full w-full object-cover brightness-[1.03] contrast-[1.05] saturate-[1.03]"
        >
          <source src={aboutHero.video} type="video/mp4" />
        </video>
      </div>

      {/* Layered overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-[#0a1628]/30 to-[#0a1628]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_85%,rgba(33,140,206,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(10,22,40,0.35)_100%)]" />

      <BlueprintLines />
      <FloatingParticles />

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

      {/* Content — vertical middle, left-aligned with navbar container */}
      <div className={`pointer-events-none ${ABOUT_HERO_CONTENT} ${ABOUT_INNER}`}>
        <div ref={contentRef} className="pointer-events-auto max-w-3xl text-left">
          <nav aria-label="Breadcrumb" className={ABOUT_HERO_BREADCRUMB}>
            <ol className={ABOUT_HERO_BREADCRUMB_LIST}>
              <li>
                <Link href="/" className={`transition-colors hover:text-white/90 ${ABOUT_FOCUS_RING_LIGHT}`}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="text-white/85" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>
          <span
            data-hero-label
            className="mb-4 block text-xs font-bold tracking-[0.24em] text-white/75 uppercase sm:text-[13px]"
          >
            {aboutHero.label}
          </span>

          <h1 className={ABOUT_HEADING_HERO}>
            {aboutHero.headline.map((line) => (
              <span key={line} data-hero-mask className="block overflow-hidden">
                <span data-hero-headline className="block">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-subtitle
            className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-[17px] lg:text-lg"
          >
            {aboutHero.subtitle}
          </p>

          <div data-hero-buttons className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={aboutHero.primaryCta.href} className={`btn-primary group ${ABOUT_BTN_MOBILE} justify-center`}>
              {aboutHero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
            </Link>
            <Link
              href={aboutHero.secondaryCta.href}
              className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/60 px-6 py-3 text-sm font-semibold text-white transition-all duration-[400ms] ease-out hover:-translate-y-0.5 hover:border-white hover:bg-white hover:text-brand-dark ${ABOUT_BTN_MOBILE} ${ABOUT_FOCUS_RING_LIGHT}`}
            >
              {aboutHero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator — bottom center */}
      <button
        ref={scrollRef}
        type="button"
        onClick={scrollToContent}
        aria-label="Scroll to explore"
        className={`absolute bottom-6 left-1/2 z-20 flex min-h-12 -translate-x-1/2 flex-col items-center justify-center gap-2 px-4 py-2 text-white/65 transition-colors hover:text-white sm:bottom-8 ${ABOUT_FOCUS_RING_LIGHT}`}
      >
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">
          Scroll to Explore
        </span>
        <ScrollMouseIcon />
      </button>
    </section>
  );
}
