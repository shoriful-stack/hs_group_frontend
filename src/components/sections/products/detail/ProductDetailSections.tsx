"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Printer,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProductDetail } from "@/data/product-detail";
import type { PortfolioProduct } from "@/data/products-page";
import CTASection from "@/components/sections/CTASection";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_BG_SURFACE,
  PRODUCTS_BG_WHITE,
  PRODUCTS_BLOCK_SPACING,
  PRODUCTS_BODY_SM,
  PRODUCTS_CARD,
  PRODUCTS_CARD_GAP,
  PRODUCTS_CARD_HOVER,
  PRODUCTS_FOCUS_RING,
  PRODUCTS_FOCUS_RING_LIGHT,
  PRODUCTS_ICON_STROKE,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
  PRODUCTS_TOUCH_TARGET,
} from "../constants";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);


function useCarouselNav() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const init = (swiper: SwiperType) => {
    if (prevRef.current && nextRef.current && swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };
  return { prevRef, nextRef, mounted, init };
}

export function ProductDetailSpecs({
  product,
  embedded = false,
}: {
  product: ProductDetail;
  embedded?: boolean;
}) {
  const [open, setOpen] = useState(0);

  const inner = (
    <>
      <div className={`${PRODUCTS_BLOCK_SPACING} flex flex-wrap items-end justify-between gap-4`}>
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
            Specifications
          </p>
          <h2 id="technical-specs" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Technical Specifications
          </h2>
          <p className={`mt-3 max-w-xl ${PRODUCTS_BODY_SM}`}>
            Electrical, mechanical, environmental, and performance data for engineering evaluation.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className={`btn-secondary inline-flex items-center gap-2 print:hidden ${PRODUCTS_FOCUS_RING}`}
        >
          <Printer className="h-4 w-4" aria-hidden />
          Print Specs
        </button>
      </div>
      <div className={`overflow-hidden ${PRODUCTS_CARD}`}>
        {product.specGroups.map((group, i) => {
          const isOpen = open === i;
          return (
            <div
              key={group.group}
              className={i === 0 ? "" : "border-t border-[#e8edf2] dark:border-border"}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-engineering/[0.03] sm:px-6 ${PRODUCTS_FOCUS_RING}`}
              >
                <span className="font-bold text-[#1a2b4a] dark:text-foreground">{group.group}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-engineering transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="overflow-x-auto border-t border-[#e8edf2] bg-[#fafbfd] dark:border-border dark:bg-surface">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <tbody>
                      {group.rows.map((row, ri) => (
                        <tr
                          key={row.label + row.value}
                          className={ri === 0 ? "" : "border-t border-[#e8edf2] dark:border-border"}
                        >
                          <th className="w-[40%] px-5 py-3.5 font-semibold text-engineering sm:px-6">
                            {row.label}
                          </th>
                          <td className="px-5 py-3.5 text-[#5a6478] dark:text-foreground-muted sm:px-6">
                            {row.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id="specs" className="scroll-mt-28 print:bg-white" aria-labelledby="technical-specs">
        {inner}
      </div>
    );
  }

  return (
    <section
      id="specs"
      className={`scroll-mt-28 print:bg-white ${PRODUCTS_BG_SURFACE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="technical-specs"
    >
      <div className={PRODUCTS_INNER}>{inner}</div>
    </section>
  );
}

export function ProductDetailVariants({
  product,
  embedded = false,
}: {
  product: ProductDetail;
  embedded?: boolean;
}) {
  const inner = (
    <>
      <div className={`${PRODUCTS_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Variants</p>
          <h2 id="product-variants" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Product Variants
          </h2>
        </div>
        <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
          Compare capacity, voltage, and application focus across model options.
        </p>
      </div>
      <div className={`grid md:grid-cols-3 ${PRODUCTS_CARD_GAP}`}>
        {product.variants.map((v, i) => (
          <article
            key={v.id}
            className={`group flex h-full flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER}`}
          >
            <div className="h-1 w-full bg-engineering" aria-hidden />
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold tracking-[0.18em] text-engineering/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full border border-engineering/20 bg-engineering/5 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-engineering uppercase">
                  Model
                </span>
              </div>
              <h3 className="mb-5 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{v.name}</h3>
              <dl className="mb-6 flex-1 space-y-0 text-sm">
                {[
                  ["Capacity", v.capacity],
                  ["Voltage", v.voltage],
                  ["Dimensions", v.dimensions],
                  ["Applications", v.applications],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between gap-3 border-b border-[#e8edf2] py-3 first:pt-0 last:border-0 dark:border-border"
                  >
                    <dt className="text-[#94a3b8]">{label}</dt>
                    <dd className="max-w-[60%] text-right font-semibold text-[#1a2b4a] dark:text-foreground">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href={v.href}
                className={`btn-secondary inline-flex items-center justify-center gap-2 ${PRODUCTS_FOCUS_RING}`}
              >
                View Variant
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id="variants" className="scroll-mt-28" aria-labelledby="product-variants">
        {inner}
      </div>
    );
  }

  return (
    <section
      id="variants"
      className={`scroll-mt-28 ${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="product-variants"
    >
      <div className={PRODUCTS_INNER}>{inner}</div>
    </section>
  );
}

export function ProductDetailDownloads({
  product,
  embedded = false,
}: {
  product: ProductDetail;
  embedded?: boolean;
}) {
  const inner = (
    <>
      <div className={`${PRODUCTS_BLOCK_SPACING} flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between`}>
        <div>
          <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
            Engineering Resources
          </p>
          <h2 id="download-center" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
            Downloads & Documents
          </h2>
        </div>
        <p className="max-w-md text-sm leading-[1.75] text-[#5a6478] dark:text-foreground-muted">
          Datasheet, CAD, BIM, manuals, and compliance documents for engineering evaluation.
        </p>
      </div>
      <div className={`overflow-hidden ${PRODUCTS_CARD}`}>
        <ul>
          {product.downloads.map((file, i) => (
            <li
              key={file.id}
              id={file.href.replace("#", "")}
              className={`flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6 ${
                i === 0 ? "" : "border-t border-[#e8edf2] dark:border-border"
              }`}
            >
              <div className="flex min-w-0 items-start gap-4">
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering">
                  <Download className="h-5 w-5" strokeWidth={PRODUCTS_ICON_STROKE} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="font-bold text-[#1a2b4a] dark:text-foreground">{file.title}</p>
                  <p className="mt-1 text-xs font-medium text-[#94a3b8]">
                    {file.fileType} · {file.size}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:pl-4">
                <a
                  href={file.href}
                  className={`btn-secondary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs ${PRODUCTS_FOCUS_RING}`}
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden />
                  Preview
                </a>
                <a
                  href={file.href}
                  className={`btn-primary inline-flex items-center gap-1.5 px-4 py-2.5 text-xs ${PRODUCTS_FOCUS_RING}`}
                  aria-label={`Download ${file.title}`}
                >
                  <Download className="h-3.5 w-3.5" aria-hidden />
                  Download
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id="downloads" className="scroll-mt-28" aria-labelledby="download-center">
        {inner}
      </div>
    );
  }

  return (
    <section
      id="downloads"
      className={`scroll-mt-28 ${PRODUCTS_BG_SURFACE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="download-center"
    >
      <div className={PRODUCTS_INNER}>{inner}</div>
    </section>
  );
}

export function ProductDetailFaq({ product }: { product: ProductDetail }) {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className={`scroll-mt-28 ${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`} aria-labelledby="product-faq">
      <div className={PRODUCTS_INNER}>
        <div className="mx-auto max-w-3xl">
          <div className={`${PRODUCTS_BLOCK_SPACING} text-center`}>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">FAQ</p>
            <h2 id="product-faq" className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground">
              Frequently Asked Questions
            </h2>
            <p className={`mx-auto mt-3 max-w-lg ${PRODUCTS_BODY_SM}`}>
              Common technical and commercial questions for enterprise evaluation.
            </p>
          </div>
          <div className="space-y-3">
            {product.faqs.map((faq, i) => {
              const isOpen = open === i;
              return (
                <div key={faq.question} className={`overflow-hidden ${PRODUCTS_CARD}`}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={`flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-engineering/[0.03] sm:px-6 ${PRODUCTS_FOCUS_RING}`}
                  >
                    <span className="font-semibold text-[#1a2b4a] dark:text-foreground">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-engineering transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="border-t border-[#e8edf2] bg-[#fafbfd] px-5 py-4 sm:px-6 dark:border-border dark:bg-surface">
                      <p className={PRODUCTS_BODY_SM}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductDetailRelated({ products }: { products: PortfolioProduct[] }) {
  const prodNav = useCarouselNav();

  return (
    <section
      id="related-products"
      className={`scroll-mt-28 ${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`}
      aria-labelledby="related-products-heading"
    >
      <div className={PRODUCTS_INNER}>
        <div className={`${PRODUCTS_BLOCK_SPACING} flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between`}>
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.24em] text-engineering uppercase">
              Related Products
            </p>
            <h2
              id="related-products-heading"
              className="text-2xl font-bold text-[#1a2b4a] sm:text-3xl dark:text-foreground"
            >
              Continue Exploring
            </h2>
            <p className={`mt-3 max-w-md ${PRODUCTS_BODY_SM}`}>
              Complementary engineering products from the HS portfolio.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              ref={prodNav.prevRef}
              type="button"
              aria-label="Previous product"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              ref={prodNav.nextRef}
              type="button"
              aria-label="Next product"
              className={`inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white dark:border-border dark:bg-card ${PRODUCTS_TOUCH_TARGET} ${PRODUCTS_FOCUS_RING}`}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        {prodNav.mounted && (
          <Swiper
            modules={[Navigation, A11y, Keyboard]}
            onSwiper={prodNav.init}
            spaceBetween={24}
            slidesPerView={1.1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1280: { slidesPerView: 3 } }}
            className="!overflow-hidden"
          >
            {products.map((p) => (
              <SwiperSlide key={p.id} className="!h-auto">
                <Link
                  href={`/products/${p.slug}`}
                  className={`group flex h-full flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER} ${PRODUCTS_FOCUS_RING}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                      sizes="33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <p className="mb-1 text-[10px] font-bold tracking-wide text-engineering uppercase">
                      {p.category}
                    </p>
                    <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                      {p.title}
                    </h3>
                    <p className={`mb-4 line-clamp-2 flex-1 ${PRODUCTS_BODY_SM}`}>{p.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-engineering">
                      View Product
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

export function ProductDetailCTA(_props: { product: ProductDetail }) {
  return <CTASection id="cta" />;
}

export function ProductDetailSidebar({ product }: { product: ProductDetail }) {
  const links = [
    { href: "#overview", label: "Overview" },
    { href: "#gallery", label: "Gallery" },
    { href: "#features", label: "Features" },
    { href: "#applications", label: "Applications" },
    { href: "#specs", label: "Specifications" },
    { href: "#downloads", label: "Downloads" },
    { href: "#faq", label: "FAQ" },
    { href: "#cta", label: "Request Quote" },
  ];

  return (
    <aside className={`overflow-hidden ${PRODUCTS_CARD}`} aria-label="Quick navigation">
      <div className="border-b border-[#e8edf2] bg-[#fafbfd] px-5 py-5 dark:border-border dark:bg-surface">
        <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">
          On This Page
        </p>
        <p className="mt-1 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
          Quick Navigation
        </p>
      </div>
      <nav className="space-y-0.5 p-3">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className={`block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#5a6478] transition-colors hover:bg-engineering/5 hover:text-engineering ${PRODUCTS_FOCUS_RING}`}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="space-y-2 border-t border-[#e8edf2] p-4 dark:border-border">
        <Link
          href={`/contact?intent=rfq&product=${product.slug}`}
          className={`btn-primary flex w-full items-center justify-center gap-2 text-sm ${PRODUCTS_FOCUS_RING}`}
        >
          Quick Inquiry
        </Link>
        <a
          href="#downloads"
          className={`btn-secondary flex w-full items-center justify-center gap-2 text-sm ${PRODUCTS_FOCUS_RING}`}
        >
          <Download className="h-4 w-4" />
          Datasheet
        </a>
      </div>
    </aside>
  );
}
