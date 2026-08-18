"use client";

import PartnerLogoCard from "@/components/ui/PartnerLogoCard";
import type { PartnerLogoView } from "@/types/home";

interface LogoMarqueeProps {
  items?: PartnerLogoView[] | null;
  direction?: "ltr" | "rtl";
  duration?: number;
  ariaLabel: string;
}

export default function LogoMarquee({
  items,
  direction = "ltr",
  duration = 22,
  ariaLabel,
}: LogoMarqueeProps) {
  const safe = Array.isArray(items)
    ? items.filter((item) => item && typeof item.name === "string" && item.name.trim())
    : [];

  if (safe.length === 0) return null;

  const track = [...safe, ...safe];

  return (
    <div
      className="trust-marquee group/marquee relative overflow-hidden"
      aria-label={ariaLabel}
      role="region"
    >
      <div
        className={`trust-marquee-track flex w-max gap-4 sm:gap-5 ${
          direction === "ltr" ? "trust-marquee-ltr" : "trust-marquee-rtl"
        } motion-reduce:animate-none`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((item, i) => (
          <PartnerLogoCard
            key={`${item.name}-${i}`}
            name={item.name}
            category={item.category}
            logo={item.logo}
            brandColor={item.brandColor}
          />
        ))}
      </div>
    </div>
  );
}
