"use client";

import { Component, type ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { useSiteSettings } from "@/providers/SiteSettingsProvider";

interface CTASectionProps {
  id?: string;
  label?: string;
  headline?: string;
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  showPhone?: boolean;
}

class CtaBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

function asText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value.trim() : fallback;
}

function asHref(value: unknown, fallback = "/contact"): string {
  const href = asText(value);
  if (!href) return fallback;
  if (/^(https?:\/\/|mailto:|tel:|#|\/)/i.test(href)) return href;
  return `/${href.replace(/^\/+/, "")}`;
}

function telHref(phone: string): string {
  const value = phone.replace(/[^\d+]/g, "");
  return value ? `tel:${value}` : "";
}

function CTASectionInner({
  id,
  label = "Ready to Start?",
  headline = "Let's Build Your Next Infrastructure Project",
  description = "Whether you're planning a major infrastructure project, power solution, telecom network, renewable energy initiative, or digital transformation, HS Group is ready to help you turn your vision into reality.",
  primaryCta,
  secondaryCta,
  showPhone = true,
}: CTASectionProps) {
  const reduceMotion = useReducedMotion();
  const settings = useSiteSettings();
  const phone = asText(settings?.phone);
  const phoneHref = telHref(phone);
  const primary = {
    label: asText(primaryCta?.label, "Get in Touch") || "Get in Touch",
    href: asHref(primaryCta?.href),
  };
  const secondaryLabel = asText(secondaryCta?.label);
  const secondaryHref = secondaryCta ? asHref(secondaryCta.href) : "";
  const heading = asText(headline);
  const body = asText(description);
  const kicker = asText(label);

  return (
    <section id={asText(id) || undefined} className="section-padding relative overflow-hidden">
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
            {kicker ? <span className="section-label mb-4 inline-block">{kicker}</span> : null}
            {heading ? (
              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            ) : null}
            {body ? (
              <p className="mx-auto mt-6 max-w-3xl text-base leading-[1.85] text-foreground-muted sm:text-lg">
                {body}
              </p>
            ) : null}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href={primary.href} className="btn-primary group transition-transform duration-[400ms] hover:-translate-y-0.5">
                {primary.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
              </Link>
              {secondaryLabel && secondaryHref ? (
                <Link href={secondaryHref} className="btn-secondary group">
                  {secondaryLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
                </Link>
              ) : showPhone && phone && phoneHref ? (
                <a href={phoneHref} className="btn-secondary">
                  <Phone className="h-4 w-4 text-accent" />
                  {phone}
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CTASection(props: CTASectionProps) {
  return (
    <CtaBoundary>
      <CTASectionInner {...props} />
    </CtaBoundary>
  );
}
