"use client";

import { useState } from "react";

interface PartnerLogoCardProps {
  name?: string | null;
  category?: string | null;
  logo?: string | null;
  brandColor?: string;
}

export default function PartnerLogoCard({
  name,
  category,
  logo,
  brandColor = "#218cce",
}: PartnerLogoCardProps) {
  const [failed, setFailed] = useState(false);
  const safeName = typeof name === "string" ? name.trim() : "";
  const safeCategory = typeof category === "string" ? category.trim() : "";
  const safeLogo = typeof logo === "string" ? logo.trim() : "";
  const showLogo = Boolean(safeLogo) && !failed;

  if (!safeName) return null;

  const label = safeCategory ? `${safeName} — ${safeCategory}` : safeName;

  return (
    <div
      tabIndex={0}
      className="trust-logo-card group relative flex h-[96px] w-[140px] shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white px-6 py-5 shadow-[0_4px_20px_rgba(15,23,42,0.05)] transition-all duration-[400ms] ease-out hover:-translate-y-1 hover:scale-[1.04] hover:border-engineering hover:shadow-[0_12px_32px_rgba(33,140,206,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-engineering focus-visible:ring-offset-2 sm:h-[104px] sm:w-[160px] md:w-[175px] lg:w-[190px] xl:w-[200px] dark:border-border dark:bg-card"
      style={{ "--brand-color": brandColor } as React.CSSProperties}
      title={label}
      role="img"
      aria-label={label}
    >
      <div className="pointer-events-none absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100 group-hover:shadow-[inset_0_0_0_1px_rgba(33,140,206,0.2)]" />
      <div className="light-sweep pointer-events-none" aria-hidden />

      {showLogo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={safeLogo}
          alt={`${safeName} logo`}
          className="max-h-10 max-w-[120px] object-contain grayscale transition-all duration-[400ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.02] sm:max-h-11"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          className="text-center text-[11px] font-bold tracking-[0.12em] text-[#94a3b8] uppercase transition-colors duration-[400ms] ease-out group-hover:text-[var(--brand-color)] sm:text-xs"
        >
          {safeName}
        </span>
      )}
    </div>
  );
}
