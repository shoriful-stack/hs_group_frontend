"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AboutCollage from "@/components/ui/AboutCollage";
import type { AboutStatItem } from "@/types/home";

function SkylineWatermark() {
  return (
    <svg className="pointer-events-none absolute top-1/2 right-0 z-0 h-[340px] w-[280px] -translate-y-1/2 text-[#1a2b4a]/[0.06] dark:text-foreground/[0.04]" viewBox="0 0 280 340" fill="currentColor" aria-hidden>
      <rect x="20" y="140" width="44" height="200" rx="1" />
      <rect x="72" y="100" width="38" height="240" rx="1" />
      <rect x="118" y="160" width="34" height="180" rx="1" />
      <rect x="162" y="80" width="48" height="260" rx="1" />
      <rect x="218" y="120" width="40" height="220" rx="1" />
    </svg>
  );
}

type AboutSectionProps = {
  title?: string | null;
  paragraphs?: string[];
  images?: string[];
  stats?: AboutStatItem[];
};

export default function AboutSection({
  title,
  paragraphs = [],
  images = [],
  stats = [],
}: AboutSectionProps) {
  const heading = title?.trim() || "";
  const hasCopy = Boolean(heading) || paragraphs.length > 0;
  const hasStats = Array.isArray(stats) && stats.length > 0;
  const collageImages = Array.isArray(images) ? images.filter((src) => typeof src === "string" && src.trim()) : [];
  const hasCollage = collageImages.length > 0;

  if (!hasCopy && !hasStats && !hasCollage) return null;

  return (
    <section className="relative overflow-hidden bg-[#f0f7fa] py-[88px] sm:py-[100px] lg:py-[112px] dark:bg-surface">
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 items-center gap-14 ${hasCollage ? "lg:grid-cols-2 lg:gap-[72px]" : ""}`}>
          {hasCollage ? <AboutCollage images={collageImages} /> : null}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <SkylineWatermark />
            <div className="relative z-10 max-w-[540px]">
              <span className="section-label mb-4 block">About Us</span>
              {heading ? (
                <h2 className="mb-7 text-[clamp(28px,3.2vw,46px)] font-bold leading-[1.12] text-[#1a2b4a] dark:text-foreground">
                  {heading}
                </h2>
              ) : null}
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mb-5 text-base leading-[1.88] text-[#5f6b7d] last:mb-9 dark:text-foreground-muted">
                  {paragraph}
                </p>
              ))}
              {hasStats ? (
                <div className="mb-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.id}>
                      <p className="text-2xl font-bold tracking-tight text-[#1a2b4a] dark:text-foreground">{stat.value}</p>
                      <p className="mt-1 text-sm text-[#5f6b7d] dark:text-foreground-muted">{stat.title}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              <Link href="/about" className="btn-primary group">
                Know More About Us
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/10 transition-transform duration-[400ms] group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
