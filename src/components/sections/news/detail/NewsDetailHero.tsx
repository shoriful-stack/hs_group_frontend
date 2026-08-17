"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Camera,
  ChevronRight,
  Newspaper,
  PenLine,
} from "lucide-react";
import { gsap } from "gsap";
import type { ArticleDetail } from "@/data/news-article-detail";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  NEWS_FOCUS_RING_LIGHT,
  NEWS_HERO_BREADCRUMB,
  NEWS_HERO_BREADCRUMB_LIST,
  NEWS_HERO_CONTENT,
  NEWS_HERO_SHELL,
  NEWS_INNER,
} from "../constants";

type Props = { article: ArticleDetail };

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

export default function NewsDetailHero({ article }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useAboutReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { scale: 1.08 },
        { scale: 1, duration: 8, ease: "power1.out" },
      );
      gsap.from(section.querySelectorAll("[data-hero-reveal]"), {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.15,
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
      aria-label="Article hero"
      className={NEWS_HERO_SHELL}
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={article.image}
          alt=""
          fill
          priority
          className={CINEMATIC_IMAGE}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-[#0f1729]/72" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-[#0f1729]/50 to-[#218cce]/25" />

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
        <div className="max-w-3xl text-left">
          <nav aria-label="Breadcrumb" data-hero-reveal className={NEWS_HERO_BREADCRUMB}>
            <ol className={`${NEWS_HERO_BREADCRUMB_LIST} flex-wrap`}>
              <li>
                <Link href="/" className={`hover:text-white ${NEWS_FOCUS_RING_LIGHT} rounded`}>
                  Home
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link href="/blog" className={`hover:text-white ${NEWS_FOCUS_RING_LIGHT} rounded`}>
                  News & Media
                </Link>
              </li>
              <li aria-hidden className="text-white/40">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li className="max-w-[200px] truncate text-white/85 sm:max-w-xs" aria-current="page">
                {article.title}
              </li>
            </ol>
          </nav>

          <span
            data-hero-reveal
            className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-[0.18em] text-white uppercase"
          >
            {article.category}
          </span>
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
