"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { CINEMATIC_IMAGE } from "@/components/sections/about/constants";

const GAP = 20;
const RADIUS = 36;
const LEFT_W = 0.575;
const RIGHT_W = 0.425;
const MAX_TILES = 4;

type CollageTileProps = {
  src: string;
  alt: string;
  sizes: string;
};

function isUsableSrc(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeImages(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const tiles: string[] = [];

  for (const item of value) {
    if (!isUsableSrc(item)) continue;
    const src = item.trim();
    if (seen.has(src)) continue;
    seen.add(src);
    tiles.push(src);
    if (tiles.length >= MAX_TILES) break;
  }

  return tiles;
}

function CollageTile({ src, alt, sizes }: CollageTileProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return null;

  return (
    <div
      className="group relative h-full w-full overflow-hidden shadow-[0_8px_28px_rgba(15,23,42,0.08)]"
      style={{ borderRadius: RADIUS }}
      data-collage-tile
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className={`${CINEMATIC_IMAGE} object-center transition-transform duration-700 ease-out group-hover:scale-[1.05]`}
          sizes={sizes}
          onError={() => setFailed(true)}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/12 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default function AboutCollage({ images }: { images?: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tiles = normalizeImages(images);
  const left = tiles.slice(0, 2);
  const right = tiles.slice(2, 4);
  const showBadge = left.length > 0 && right.length > 0;

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || tiles.length === 0) return;

    try {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const ctx = gsap.context(() => {
        gsap.from(wrap, { opacity: 0, scale: 0.97, duration: 0.7, ease: "power2.out" });

        const nodes = wrap.querySelectorAll("[data-collage-tile]");
        if (nodes.length === 0) return;

        gsap.to(nodes, {
          y: (i) => (i % 2 === 0 ? -6 : 6),
          duration: 3.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.4,
        });
      }, wrap);

      return () => ctx.revert();
    } catch {
      return;
    }
  }, [tiles.length]);

  if (tiles.length === 0) return null;

  return (
    <div ref={wrapRef} className="mx-auto w-full max-w-[610px] lg:mx-0">
      <div className="relative w-full drop-shadow-[0_24px_48px_rgba(15,23,42,0.1)]">
        <div className="flex" style={{ gap: GAP }}>
          {left.length > 0 ? (
            <div
              className="flex flex-col"
              style={{ width: right.length > 0 ? `${LEFT_W * 100}%` : "100%", gap: GAP }}
            >
              {left.map((src, index) => (
                <div key={src} className="h-[200px] sm:h-[230px] lg:h-[260px]">
                  <CollageTile src={src} alt={`About HS Group ${index + 1}`} sizes="350px" />
                </div>
              ))}
            </div>
          ) : null}
          {right.length > 0 ? (
            <div
              className="flex flex-col justify-center pt-5 sm:pt-6 lg:pt-7"
              style={{ width: `${RIGHT_W * 100}%`, gap: GAP }}
            >
              {right.map((src, index) => (
                <div key={src} className="h-[165px] sm:h-[190px] lg:h-[210px]">
                  <CollageTile src={src} alt={`About HS Group ${index + 3}`} sizes="260px" />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {showBadge ? (
          <div
            className="absolute z-10 flex h-[72px] w-[72px] items-center justify-center bg-white p-2 shadow-[0_12px_40px_rgba(33,140,206,0.28)] ring-4 ring-engineering/15 sm:h-[80px] sm:w-[80px] sm:p-2.5 lg:h-[88px] lg:w-[88px] lg:shadow-[0_16px_48px_rgba(33,140,206,0.35)]"
            style={{ borderRadius: 18, top: "50%", left: `${LEFT_W * 100}%`, transform: "translate(-50%, -50%)" }}
          >
            <Image
              src="/images/about-logo-icon.png"
              alt="HS Group"
              width={64}
              height={64}
              className="h-full w-full object-contain"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
