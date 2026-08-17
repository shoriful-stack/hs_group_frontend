"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ServiceIcon } from "@/components/ui/ServiceIcons";

interface ServiceCardProps {
  number: string;
  id: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
  className?: string;
}

export default function ServiceCard({
  number,
  id,
  title,
  description,
  image,
  featured = false,
  className = "",
}: ServiceCardProps) {
  return (
    <article
      className={`service-card group relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_24px_56px_rgba(33,140,206,0.12)] dark:border-border dark:bg-card ${
        featured
          ? "ring-1 ring-engineering/20 shadow-[0_16px_48px_rgba(33,140,206,0.1)]"
          : ""
      } ${className}`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "h-[260px] sm:h-[280px]" : "h-[220px] sm:h-[240px]"
        }`}
      >
        <Image
          src={image}
          alt={title}
          fill
          priority={featured}
          className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.08]"
          sizes={
            featured
              ? "(max-width: 640px) 100vw, 420px"
              : "(max-width: 640px) 100vw, 380px"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/65 via-[#0a1628]/15 to-transparent transition-all duration-500 group-hover:from-[#0a1628]/75 group-hover:via-[#0a1628]/25" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="light-sweep group-hover:opacity-100" />
        </div>

        {featured && (
          <span className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-md">
            Featured
          </span>
        )}

        <div className="absolute bottom-5 left-5">
          <span className="text-sm font-bold tracking-[0.2em] text-white/90">{number}</span>
        </div>

        <div
          className={`absolute top-5 right-5 flex items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-105 group-hover:border-engineering/40 group-hover:shadow-[0_0_20px_rgba(33,140,206,0.35)] ${
            featured ? "h-14 w-14" : "h-12 w-12"
          }`}
        >
          <ServiceIcon id={id} className={featured ? "h-6 w-6" : "h-5 w-5"} />
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${featured ? "p-7 sm:p-8" : "p-6 sm:p-7"}`}>
        <h3
          className={`mb-3 font-bold leading-snug text-[#1a2b4a] dark:text-foreground ${
            featured ? "text-xl sm:text-2xl" : "text-xl sm:text-[22px]"
          }`}
        >
          {title}
        </h3>
        <p className="mb-6 flex-1 text-sm leading-[1.8] text-[#5a6478] transition-transform duration-500 ease-out group-hover:-translate-y-1 dark:text-foreground-muted">
          {description}
        </p>
        <Link
          href={`/services#${id}`}
          className="group/link inline-flex items-center gap-2 text-sm font-semibold text-engineering transition-all duration-500 ease-out"
        >
          Learn More
          <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover/link:translate-x-2" />
        </Link>
      </div>
    </article>
  );
}
