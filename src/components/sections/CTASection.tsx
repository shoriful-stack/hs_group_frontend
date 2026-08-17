"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";

interface CTASectionProps {
  label?: string;
  headline?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showPhone?: boolean;
}

export default function CTASection({
  label = "Ready to Start?",
  headline = "Let's Build Your Next Infrastructure Project",
  description = "Partner with HS Group for world-class engineering, telecom, power, and infrastructure solutions delivered with precision.",
  primaryCta = { label: "Get in Touch", href: "/contact" },
  secondaryCta,
  showPhone = true,
}: CTASectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container-wide relative px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-[32px] border border-border"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-engineering/30 via-card to-accent/18" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-engineering/25 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-accent/18 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl" />
          <svg className="pointer-events-none absolute inset-0 text-engineering/[0.06]" viewBox="0 0 900 420" fill="none" aria-hidden>
            <path d="M40 280C180 200 280 340 420 260C560 180 680 120 860 180" stroke="currentColor" strokeWidth="1.5" />
            <path d="M120 80h220M120 110h160" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="relative px-8 py-16 text-center sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <span className="section-label mb-4 inline-block">{label}</span>
            <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">{headline}</h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-[1.85] text-foreground-muted sm:text-lg">{description}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={primaryCta.href} className="btn-primary group transition-transform duration-[400ms] hover:-translate-y-0.5">
                {primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
              {secondaryCta ? (
                <Link href={secondaryCta.href} className="btn-secondary group">
                  {secondaryCta.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
                </Link>
              ) : showPhone ? (
                <a href={`tel:${siteConfig.phone}`} className="btn-secondary">
                  <Phone className="h-4 w-4 text-accent" />
                  {siteConfig.phone}
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
