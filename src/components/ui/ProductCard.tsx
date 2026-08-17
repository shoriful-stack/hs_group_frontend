"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ProductItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
}

interface ProductCardProps {
  product: ProductItem;
  isActive?: boolean;
  priority?: boolean;
  isMobile?: boolean;
}

export default function ProductCard({
  product,
  isActive = false,
  priority = false,
  isMobile = false,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isExpanded = isHovered || (isMobile && isTapped);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      const y = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      setTilt({
        x: Math.max(-3, Math.min(3, x)),
        y: Math.max(-3, Math.min(3, y)),
      });
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  const handleTap = useCallback(() => {
    if (isMobile) setIsTapped((prev) => !prev);
  }, [isMobile]);

  const transform = isExpanded
    ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-10px)`
    : "translateY(0)";

  return (
    <div
      ref={cardRef}
      className={`group relative mx-auto h-[560px] w-[380px] max-w-[85vw] shrink-0 overflow-hidden rounded-[30px] border border-white/20 transition-[transform,opacity,box-shadow,border-color] duration-500 ease-out ${
        isActive ? "scale-100 opacity-100" : "scale-[0.95] opacity-80"
      } ${
        isExpanded
          ? "z-10 border-engineering shadow-[0_32px_64px_rgba(15,23,42,0.22)]"
          : "shadow-[0_12px_40px_rgba(15,23,42,0.12)]"
      }`}
      style={{ transform }}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      onKeyDown={(e) => {
        if (isMobile && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleTap();
        }
      }}
      role={isMobile ? "button" : undefined}
      tabIndex={isMobile ? 0 : undefined}
      aria-label={product.title}
    >
      <Image
        src={product.image}
        alt={product.title}
        fill
        priority={priority}
        className={`object-cover object-center transition-transform duration-500 ease-out ${
          isExpanded ? "scale-[1.08]" : "scale-100"
        }`}
        style={{ objectPosition: product.imagePosition ?? "center center" }}
        sizes="380px"
      />

      <div
        className={`light-sweep ${isExpanded ? "opacity-100" : ""}`}
        aria-hidden
      />

      {/* Bottom-only gradient — keep image bright by default */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-all duration-500 ease-out ${
          isExpanded ? "h-[68%]" : "h-[34%]"
        }`}
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 z-10 p-7 sm:p-8">
        <h3 className="text-xl font-bold leading-snug text-white sm:text-[22px]">
          {product.title}
        </h3>

        <div
          className={`overflow-hidden transition-all duration-500 ease-out ${
            isExpanded ? "mt-4 max-h-48 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="mb-5 text-sm leading-relaxed text-white/90">
            {product.description}
          </p>
          <Link
            href={`/products#${product.id}`}
            className={`group/link inline-flex items-center gap-2 text-sm font-semibold text-engineering-light transition-all duration-500 ease-out ${
              isExpanded ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            View More
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-engineering text-white transition-transform duration-[400ms] group-hover/link:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
