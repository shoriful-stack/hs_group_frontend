"use client";

import Image from "next/image";
import Link from "next/link";

const SUBTITLE_CLAMP = 140;

interface ServiceCardProps {
  number: string;
  slug: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  className?: string;
}

export default function ServiceCard({
  number,
  slug,
  title,
  description,
  image,
  category,
  className = "",
}: ServiceCardProps) {
  const href = `/services/${slug}`;
  const isLong = description.length > SUBTITLE_CLAMP;

  return (
    <Link href={href} className="block h-full">
      <article
        className={`service-card group relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-[28px] border border-[#e2e8f0] bg-white shadow-[0_8px_32px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-engineering hover:shadow-[0_24px_56px_rgba(33,140,206,0.12)] dark:border-border dark:bg-card ${className}`}
      >
        <div className="relative h-[240px] overflow-hidden sm:h-[260px]">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.08]"
              sizes="(max-width: 640px) 100vw, 380px"
            />
          ) : (
            <div className="absolute inset-0 bg-[#0a1628]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/65 via-[#0a1628]/15 to-transparent transition-all duration-500 group-hover:from-[#0a1628]/75 group-hover:via-[#0a1628]/25" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="light-sweep group-hover:opacity-100" />
          </div>

          {category ? (
            <span className="absolute top-5 left-1/2 min-w-60 -translate-x-1/2 rounded-full border border-white/25 bg-white/10 px-5 py-1.5 text-center text-[10px] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-md">
              {category}
            </span>
          ) : null}

          <div className="absolute bottom-5 left-5">
            <span className="text-sm font-bold tracking-[0.2em] text-white/90">
              {number}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="mb-3 text-xl font-bold leading-snug text-[#1a2b4a] sm:text-[22px] dark:text-foreground">
            {title}
          </h3>
          {description ? (
            <p className="mb-6 flex-1 text-sm leading-[1.8] text-[#5a6478] transition-transform duration-500 ease-out group-hover:-translate-y-1 dark:text-foreground-muted">
              <span className={isLong ? "line-clamp-3" : undefined}>
                {description}
              </span>
              {isLong ? (
                <span className="font-semibold text-engineering"> Read more</span>
              ) : null}
            </p>
          ) : (
            <div className="mb-6 flex-1" />
          )}
        </div>
      </article>
    </Link>
  );
}
