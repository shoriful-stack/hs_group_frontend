"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { CINEMATIC_IMAGE } from "@/components/sections/about/constants";

const GAP = 20;
const RADIUS = 36;
const LEFT_W = 0.575;
const RIGHT_W = 0.425;

const collageImages = {
  topLeft: {
    src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&q=85&auto=format&fit=crop",
    alt: "Power grid and transmission infrastructure",
    position: "object-center",
  },
  bottomLeft: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=85&auto=format&fit=crop",
    alt: "Civil construction and engineering site",
    position: "object-center",
  },
  topRight: {
    src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=85&auto=format&fit=crop",
    alt: "Solar energy and renewable infrastructure",
    position: "object-center",
  },
  bottomRight: {
    src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=85&auto=format&fit=crop",
    alt: "Industrial engineering control room",
    position: "object-center",
  },
};

function CollageTile({
  src,
  alt,
  sizes,
  position,
}: {
  src: string;
  alt: string;
  sizes: string;
  position: string;
}) {
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
          className={`${CINEMATIC_IMAGE} ${position} transition-transform duration-700 ease-out group-hover:scale-[1.05]`}
          sizes={sizes}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1628]/12 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default function AboutCollage({ images = [] }: { images?: string[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(wrap, { opacity: 0, scale: 0.97, duration: 0.7, ease: "power2.out" });

      gsap.to(wrap.querySelectorAll("[data-collage-tile]"), {
        y: (i) => (i % 2 === 0 ? -6 : 6),
        duration: 3.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.4,
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="mx-auto w-full max-w-[610px] lg:mx-0">
      <div className="relative w-full drop-shadow-[0_24px_48px_rgba(15,23,42,0.1)]">
        <div className="flex" style={{ gap: GAP }}>
          <div className="flex flex-col" style={{ width: `${LEFT_W * 100}%`, gap: GAP }}>
            <div className="h-[200px] sm:h-[230px] lg:h-[260px]">
              <CollageTile
                {...collageImages.topLeft}
                src={images[0] ?? collageImages.topLeft.src}
                sizes="350px"
                position={collageImages.topLeft.position}
              />
            </div>
            <div className="h-[200px] sm:h-[230px] lg:h-[260px]">
              <CollageTile
                {...collageImages.bottomLeft}
                src={images[1] ?? collageImages.bottomLeft.src}
                sizes="350px"
                position={collageImages.bottomLeft.position}
              />
            </div>
          </div>
          <div
            className="flex flex-col justify-center pt-5 sm:pt-6 lg:pt-7"
            style={{ width: `${RIGHT_W * 100}%`, gap: GAP }}
          >
            <div className="h-[165px] sm:h-[190px] lg:h-[210px]">
              <CollageTile
                {...collageImages.topRight}
                src={images[2] ?? collageImages.topRight.src}
                sizes="260px"
                position={collageImages.topRight.position}
              />
            </div>
            <div className="h-[165px] sm:h-[190px] lg:h-[210px]">
              <CollageTile
                {...collageImages.bottomRight}
                src={images[3] ?? collageImages.bottomRight.src}
                sizes="260px"
                position={collageImages.bottomRight.position}
              />
            </div>
          </div>
        </div>
        <div
          className="absolute z-10 flex h-[72px] w-[72px] items-center justify-center bg-white p-2 shadow-[0_12px_40px_rgba(33,140,206,0.28)] ring-4 ring-engineering/15 sm:h-[80px] sm:w-[80px] sm:p-2.5 lg:h-[88px] lg:w-[88px] lg:shadow-[0_16px_48px_rgba(33,140,206,0.35)]"
          style={{ borderRadius: 18, top: "50%", left: `${LEFT_W * 100}%`, transform: "translate(-50%, -50%)" }}
        >
          <Image src="/images/about-logo-icon.png" alt="HS Group" width={64} height={64} className="h-full w-full object-contain" />
        </div>
      </div>
    </div>
  );
}
