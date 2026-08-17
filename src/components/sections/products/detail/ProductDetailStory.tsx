"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Award,
  Building2,
  Check,
  Expand,
  Factory,
  FileText,
  Gauge,
  Globe2,
  Headphones,
  Leaf,
  Maximize2,
  Monitor,
  Package,
  Rocket,
  ShieldCheck,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ProductDetail } from "@/data/product-detail";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_BG_SURFACE,
  PRODUCTS_BG_WHITE,
  PRODUCTS_BLOCK_SPACING,
  PRODUCTS_BODY,
  PRODUCTS_BODY_SM,
  PRODUCTS_CARD,
  PRODUCTS_CARD_GAP,
  PRODUCTS_CARD_HOVER,
  PRODUCTS_FOCUS_RING,
  PRODUCTS_GRID_GAP,
  PRODUCTS_ICON_BOX,
  PRODUCTS_ICON_STROKE,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
} from "../constants";

const featureIcons: Record<string, LucideIcon> = {
  Gauge, Leaf, ShieldCheck, Wrench, Expand, Factory, Monitor, Rocket,
};

const appIcons: LucideIcon[] = [
  Factory, Building2, Gauge, ShieldCheck, Globe2, Headphones, Package, Monitor, Rocket,
];

const quickInfoIcons: Record<string, LucideIcon> = {
  "Model Number": Package,
  "Product Category": FileText,
  Brand: Award,
  "Country of Origin": Globe2,
  Warranty: ShieldCheck,
  Availability: Package,
  Support: Headphones,
};

export function ProductDetailOverview({ product }: { product: ProductDetail }) {
  return (
    <section
      id="overview"
      className={`scroll-mt-28 ${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="product-overview"
    >
      <div className={PRODUCTS_INNER}>
        <div className={`grid lg:grid-cols-[1.15fr_0.85fr] ${PRODUCTS_GRID_GAP}`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Product Overview
            </p>
            <h2
              id="product-overview"
              className="mb-5 text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Engineering Product Profile
            </h2>
            <p className="mb-5 text-lg font-medium leading-[1.75] text-[#1a2b4a] dark:text-foreground">
              {product.overview}
            </p>
            <p className={`mb-8 ${PRODUCTS_BODY}`}>{product.businessValue}</p>

            <div>
              <h3 className="mb-4 text-sm font-bold tracking-[0.14em] text-engineering uppercase">
                Engineering Advantages
              </h3>
              <ul className="space-y-3">
                {product.engineeringAdvantages.map((a) => (
                  <li
                    key={a}
                    className="flex gap-3 text-sm leading-relaxed text-[#5a6478] dark:text-foreground-muted"
                  >
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-engineering/10 text-engineering">
                      <Check className="h-3 w-3" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className={`${PRODUCTS_CARD} h-fit overflow-hidden`} aria-label="Quick facts">
            <div className="border-b border-[#e8edf2] bg-[#fafbfd] px-5 py-5 sm:px-6 dark:border-border dark:bg-surface">
              <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
                At a Glance
              </p>
              <h3 className="mt-1 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                Quick Information
              </h3>
            </div>
            <dl>
              {product.quickInfo.map((item, i) => {
                const Icon = quickInfoIcons[item.label] ?? Package;
                const last = i === product.quickInfo.length - 1;
                return (
                  <div
                    key={item.label}
                    className={`group flex gap-3 px-5 py-4 transition-colors duration-300 hover:bg-engineering/[0.03] sm:px-6 ${
                      last ? "" : "border-b border-[#e8edf2] dark:border-border"
                    }`}
                  >
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-400 group-hover:scale-105">
                      <Icon className="h-4 w-4" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <dt className="text-[10px] font-bold tracking-[0.16em] text-[#94a3b8] uppercase">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm leading-snug font-semibold text-[#1a2b4a] dark:text-foreground">
                        {item.value}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function ProductDetailGalleryFeatures({ product }: { product: ProductDetail }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const item = product.gallery[active] ?? product.gallery[0];
  const features = product.keyFeatures.slice(0, 6);

  return (
    <section
      id="gallery"
      className={`scroll-mt-28 ${PRODUCTS_BG_SURFACE} ${PRODUCTS_SECTION_PAD}`}
      aria-label="Product gallery and key features"
    >
      <div className={PRODUCTS_INNER}>
        <div className={`grid items-start lg:grid-cols-2 ${PRODUCTS_GRID_GAP}`}>
          {/* Gallery — col-6 */}
          <div className="min-w-0">
            <div className={`${PRODUCTS_BLOCK_SPACING}`}>
              <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
                Gallery
              </p>
              <h2 id="product-gallery" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
                Product Imagery
              </h2>
              <p className={`mt-3 ${PRODUCTS_BODY_SM}`}>
                High-resolution views for technical evaluation.
              </p>
            </div>

            <div className={`overflow-hidden ${PRODUCTS_CARD}`}>
              <div className="group relative aspect-[4/3]">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className={`${CINEMATIC_IMAGE} transition-transform duration-700 group-hover:scale-[1.03]`}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729]/55 via-transparent to-transparent" />
                <div className="absolute right-3 bottom-3 left-3 flex items-end justify-between gap-2 sm:right-4 sm:bottom-4 sm:left-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.18em] text-white/70 uppercase">
                      {product.category}
                    </p>
                    <p className="mt-1 truncate text-sm font-semibold text-white">{item.alt}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLightbox(true)}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/25 bg-[#0f1729]/65 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[#0f1729]/85 ${PRODUCTS_FOCUS_RING}`}
                    aria-label="Open fullscreen"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                    Fullscreen
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5 overflow-x-auto border-t border-[#e8edf2] bg-[#fafbfd] p-3 dark:border-border dark:bg-surface">
                {product.gallery.map((g, i) => (
                  <button
                    key={g.src + i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    aria-label={`View image ${i + 1}`}
                    className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-[12px] border-2 transition-all ${PRODUCTS_FOCUS_RING} ${
                      active === i
                        ? "border-engineering shadow-[0_8px_20px_rgba(33,140,206,0.22)]"
                        : "border-transparent opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image src={g.src} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Key Features — col-6 */}
          <div id="features" className="min-w-0 scroll-mt-28">
            <div className={`${PRODUCTS_BLOCK_SPACING}`}>
              <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
                Capabilities
              </p>
              <h2 id="key-features" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
                Key Features & Benefits
              </h2>
              <p className={`mt-3 ${PRODUCTS_BODY_SM}`}>
                Engineering attributes for reliability and long-term value.
              </p>
            </div>

            <div className={`grid sm:grid-cols-2 ${PRODUCTS_CARD_GAP}`}>
              {features.map((f, i) => {
                const Icon = featureIcons[f.icon] ?? ShieldCheck;
                return (
                  <article
                    key={f.title}
                    className={`group flex h-full flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER}`}
                  >
                    <div className="h-1 w-full bg-engineering" aria-hidden />
                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <div className={PRODUCTS_ICON_BOX}>
                          <Icon strokeWidth={PRODUCTS_ICON_STROKE} className="h-5 w-5" aria-hidden />
                        </div>
                        <span className="text-[11px] font-bold tracking-[0.18em] text-engineering/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mb-1.5 font-bold text-[#1a2b4a] dark:text-foreground">
                        {f.title}
                      </h3>
                      <p className={`text-xs leading-[1.75] text-[#5a6478] dark:text-foreground-muted`}>
                        {f.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Product image lightbox"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-[#0a1628]/92 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            className={`absolute top-6 right-6 rounded-full bg-white/10 p-2 text-white ${PRODUCTS_FOCUS_RING}`}
            aria-label="Close lightbox"
            onClick={() => setLightbox(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[70vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={item.src} alt={item.alt} fill className="object-contain" sizes="100vw" />
          </div>
        </div>
      )}
    </section>
  );
}



export function ProductDetailApplications({ product }: { product: ProductDetail }) {
  const apps = product.businessApplications.slice(0, 6);

  return (
    <section
      id="applications"
      className={`scroll-mt-28 ${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="business-applications"
    >
      <div className={PRODUCTS_INNER}>
        <div className={`${PRODUCTS_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Applications
            </p>
            <h2
              id="business-applications"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Where It Performs
            </h2>
          </div>
          <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
            Sector contexts where this product creates operational and infrastructure value.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${PRODUCTS_CARD_GAP}`}>
          {apps.map((app, i) => {
            const Icon = appIcons[i % appIcons.length];
            return (
              <article
                key={app.title}
                className={`group flex gap-4 p-5 sm:p-6 ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER}`}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_0_24px_rgba(33,140,206,0.25)]">
                  <Icon className="h-5 w-5" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="mb-1.5 block text-[11px] font-bold tracking-[0.16em] text-engineering uppercase">
                    Application {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-1.5 font-bold text-[#1a2b4a] dark:text-foreground">
                    {app.title}
                  </h3>
                  <p className={PRODUCTS_BODY_SM}>{app.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
