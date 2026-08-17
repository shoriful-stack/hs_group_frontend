"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  LayoutGrid,
  List,
  Minus,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  getProductBrands,
  portfolioProducts,
  productFilterCategories,
  type PortfolioProduct,
  type ProductFilterCategory,
} from "@/data/products-page";
import { useAboutReducedMotion } from "@/components/sections/about/useAboutReducedMotion";
import {
  CINEMATIC_IMAGE,
  PRODUCTS_BG_WHITE,
  PRODUCTS_BODY_SM,
  PRODUCTS_CARD,
  PRODUCTS_CARD_HOVER,
  PRODUCTS_FOCUS_RING,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
} from "./constants";

type SortKey = "newest" | "popular" | "az";
type ViewMode = "grid" | "list";
const MAX_COMPARE = 4;
const PAGE_SIZES = [6, 9, 12, 24] as const;

function ProductCard({
  product,
  selected,
  onToggleCompare,
}: {
  product: PortfolioProduct;
  selected: boolean;
  onToggleCompare: (id: string) => void;
}) {
  return (
    <article
      id={product.id}
      className={`group relative flex h-full scroll-mt-28 flex-col overflow-hidden ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER}`}
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`${CINEMATIC_IMAGE} transition-transform duration-700 group-hover:scale-[1.06]`}
          sizes="(max-width: 768px) 100vw, 33vw"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729]/75 via-[#0f1729]/20 to-transparent" />
        <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-[#0f1729]/55 px-3 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
          {product.category}
        </span>
        <span className="absolute top-4 right-4 rounded-full border border-engineering/40 bg-engineering/20 px-3 py-1 text-[10px] font-semibold text-white">
          {product.certification}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{product.title}</h3>
        <p className={`mb-5 line-clamp-2 flex-1 ${PRODUCTS_BODY_SM}`}>{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className={`btn-primary inline-flex flex-1 items-center justify-center gap-1.5 px-3 py-2.5 text-xs ${PRODUCTS_FOCUS_RING}`}
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={() => onToggleCompare(product.id)}
            aria-pressed={selected}
            className={`rounded-full border px-3 py-2.5 text-[11px] font-bold transition-all ${PRODUCTS_FOCUS_RING} ${
              selected
                ? "border-engineering bg-engineering text-white"
                : "border-[#e8edf2] text-[#5a6478] hover:border-engineering hover:text-engineering dark:border-border"
            }`}
          >
            {selected ? "Selected" : "Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductListRow({
  product,
  selected,
  onToggleCompare,
}: {
  product: PortfolioProduct;
  selected: boolean;
  onToggleCompare: (id: string) => void;
}) {
  return (
    <article
      id={product.id}
      className={`group flex scroll-mt-28 flex-col overflow-hidden sm:flex-row ${PRODUCTS_CARD} ${PRODUCTS_CARD_HOVER}`}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:h-auto sm:w-[220px] lg:w-[260px]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`${CINEMATIC_IMAGE} transition-transform duration-700 group-hover:scale-[1.04]`}
          sizes="(max-width: 640px) 100vw, 260px"
          loading="lazy"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-5 sm:p-6">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-engineering/25 bg-engineering/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-engineering uppercase">
              {product.category}
            </span>
            <span className="text-[11px] font-semibold text-[#94a3b8]">{product.brand}</span>
          </div>
          <h3 className="mb-2 text-lg font-bold text-[#1a2b4a] dark:text-foreground">{product.title}</h3>
          <p className={`line-clamp-2 ${PRODUCTS_BODY_SM}`}>{product.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/products/${product.slug}`}
            className={`btn-primary inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs ${PRODUCTS_FOCUS_RING}`}
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={() => onToggleCompare(product.id)}
            aria-pressed={selected}
            className={`rounded-full border px-3 py-2.5 text-[11px] font-bold transition-all ${PRODUCTS_FOCUS_RING} ${
              selected
                ? "border-engineering bg-engineering text-white"
                : "border-[#e8edf2] text-[#5a6478] hover:border-engineering hover:text-engineering dark:border-border"
            }`}
          >
            {selected ? "Selected" : "Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}

function FilterPanel({
  category,
  brand,
  categoryOpen,
  brandOpen,
  categoryCounts,
  brandCounts,
  brandOptions,
  onCategory,
  onBrand,
  onToggleCategory,
  onToggleBrand,
}: {
  category: ProductFilterCategory;
  brand: string;
  categoryOpen: boolean;
  brandOpen: boolean;
  categoryCounts: Record<string, number>;
  brandCounts: Record<string, number>;
  brandOptions: string[];
  onCategory: (c: ProductFilterCategory) => void;
  onBrand: (b: string) => void;
  onToggleCategory: () => void;
  onToggleBrand: () => void;
}) {
  return (
    <div className={`overflow-hidden ${PRODUCTS_CARD}`}>
      {/* Categories */}
      <div className="border-b border-[#e8edf2] dark:border-border">
        <button
          type="button"
          onClick={onToggleCategory}
          aria-expanded={categoryOpen}
          className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left ${PRODUCTS_FOCUS_RING}`}
        >
          <span className="text-base font-bold text-[#1a2b4a] dark:text-foreground">Categories</span>
          {categoryOpen ? (
            <Minus className="h-4 w-4 text-[#5a6478]" aria-hidden />
          ) : (
            <Plus className="h-4 w-4 text-[#5a6478]" aria-hidden />
          )}
        </button>
        {categoryOpen && (
          <ul className="space-y-0.5 px-3 pb-4">
            {productFilterCategories.map((cat) => {
              const active = category === cat;
              const label = cat === "All" ? "All Products" : cat;
              return (
                <li key={cat}>
                  <button
                    type="button"
                    onClick={() => onCategory(cat)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-[12px] px-3.5 py-2.5 text-left text-sm transition-all duration-300 ${PRODUCTS_FOCUS_RING} ${
                      active
                        ? "bg-engineering/10 font-semibold text-engineering"
                        : "font-medium text-[#5a6478] hover:bg-[#fafbfd] hover:text-[#1a2b4a] dark:text-foreground-muted dark:hover:bg-surface dark:hover:text-foreground"
                    }`}
                  >
                    <span className="min-w-0 truncate">{label}</span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold tabular-nums ${
                        active
                          ? "bg-engineering text-white"
                          : "text-[#94a3b8]"
                      }`}
                    >
                      {categoryCounts[cat] ?? 0}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Brands */}
      <div>
        <button
          type="button"
          onClick={onToggleBrand}
          aria-expanded={brandOpen}
          className={`flex w-full items-center justify-between gap-3 px-5 py-4 text-left ${PRODUCTS_FOCUS_RING}`}
        >
          <span className="text-base font-bold text-[#1a2b4a] dark:text-foreground">Brands</span>
          {brandOpen ? (
            <Minus className="h-4 w-4 text-[#5a6478]" aria-hidden />
          ) : (
            <Plus className="h-4 w-4 text-[#5a6478]" aria-hidden />
          )}
        </button>
        {brandOpen && (
          <ul className="space-y-0.5 px-3 pb-4">
            {brandOptions.map((b) => {
              const active = brand === b;
              const label = b === "All" ? "All Brands" : b;
              return (
                <li key={b}>
                  <button
                    type="button"
                    onClick={() => onBrand(b)}
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-[12px] px-3.5 py-2.5 text-left text-sm transition-all duration-300 ${PRODUCTS_FOCUS_RING} ${
                      active
                        ? "bg-engineering/10 font-semibold text-engineering"
                        : "font-medium text-[#5a6478] hover:bg-[#fafbfd] hover:text-[#1a2b4a] dark:text-foreground-muted dark:hover:bg-surface dark:hover:text-foreground"
                    }`}
                  >
                    <span className="min-w-0 truncate">{label}</span>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold tabular-nums ${
                        active ? "bg-engineering text-white" : "text-[#94a3b8]"
                      }`}
                    >
                      {brandCounts[b] ?? 0}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function ProductsFilterGridSection() {
  const [category, setCategory] = useState<ProductFilterCategory>("All");
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState<SortKey>("newest");
  const [pageSize, setPageSize] = useState<(typeof PAGE_SIZES)[number]>(12);
  const [view, setView] = useState<ViewMode>("grid");
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useAboutReducedMotion();

  const brands = getProductBrands();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ProductFilterCategory>).detail;
      if (detail) setCategory(detail);
    };
    window.addEventListener("products-filter", handler as EventListener);
    return () => window.removeEventListener("products-filter", handler as EventListener);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    if (search) setQuery(search);
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: portfolioProducts.length };
    for (const cat of productFilterCategories) {
      if (cat === "All") continue;
      counts[cat] = portfolioProducts.filter((p) => p.category === cat).length;
    }
    return counts;
  }, []);

  const brandCounts = useMemo(() => {
    const counts: Record<string, number> = { All: portfolioProducts.length };
    for (const b of brands) {
      counts[b] = portfolioProducts.filter((p) => p.brand === b).length;
    }
    return counts;
  }, [brands]);

  const brandOptions = useMemo(() => ["All", ...brands], [brands]);

  const filtered = useMemo(() => {
    let list = [...portfolioProducts];
    if (category !== "All") list = list.filter((p) => p.category === category);
    if (brand !== "All") list = list.filter((p) => p.brand === brand);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) =>
        [p.title, p.description, p.category, p.brand, ...p.features, ...p.applications]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }

    list.sort((a, b) => {
      if (sort === "az") return a.title.localeCompare(b.title);
      if (sort === "newest") return b.popular - a.popular;
      return b.popular - a.popular;
    });
    return list;
  }, [category, query, brand, sort]);

  const visible = useMemo(() => filtered.slice(0, pageSize), [filtered, pageSize]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || reducedMotion) return;
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" },
    );
  }, [visible, view, reducedMotion]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_COMPARE) return [...prev.slice(1), id];
      return [...prev, id];
    });
  };

  const compareProducts = compareIds
    .map((id) => portfolioProducts.find((p) => p.id === id))
    .filter(Boolean) as PortfolioProduct[];

  const allSpecLabels = useMemo(() => {
    const labels = new Set<string>();
    compareProducts.forEach((p) => p.compareSpecs.forEach((s) => labels.add(s.label)));
    return Array.from(labels);
  }, [compareProducts]);

  const filterPanelProps = {
    category,
    brand,
    categoryOpen,
    brandOpen,
    categoryCounts,
    brandCounts,
    brandOptions,
    onCategory: (c: ProductFilterCategory) => {
      setCategory(c);
      setDrawerOpen(false);
    },
    onBrand: (b: string) => {
      setBrand(b);
      setDrawerOpen(false);
    },
    onToggleCategory: () => setCategoryOpen((v) => !v),
    onToggleBrand: () => setBrandOpen((v) => !v),
  };

  return (
    <section id="products-grid" className={`scroll-mt-24 ${PRODUCTS_BG_WHITE} ${PRODUCTS_SECTION_PAD}`} aria-label="Product catalogue">
      <div className={PRODUCTS_INNER}>
        <div className="mb-8 max-w-2xl lg:mb-10">
          <SectionHeading
            label="PRODUCT CATALOGUE"
            title="Engineering Product Portfolio"
            description="Filter by category and brand, search the catalogue, then switch between grid and list views."
            align="left"
          />
        </div>

        {/* Toolbar — same columns as sidebar + products so search aligns with product start */}
        <div
          className={`mb-6 flex flex-col gap-3 lg:mb-8 ${
            sidebarVisible
              ? "lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center lg:gap-10 xl:grid-cols-[280px_minmax(0,1fr)]"
              : "lg:flex-row lg:items-center lg:justify-between lg:gap-4"
          }`}
        >
          {/* Filter (+ mobile search). Desktop: sits above sidebar */}
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.matchMedia("(min-width: 1024px)").matches) {
                  setSidebarVisible((v) => !v);
                } else {
                  setDrawerOpen(true);
                }
              }}
              className={`inline-flex shrink-0 items-center gap-2 rounded-[12px] border border-[#e8edf2] bg-white px-3 py-2.5 text-sm font-semibold text-[#1a2b4a] transition-colors hover:border-engineering hover:text-engineering sm:px-4 dark:border-border dark:bg-card dark:text-foreground ${PRODUCTS_FOCUS_RING}`}
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden />
              Filter
            </button>

            <label className="relative min-w-0 flex-1 lg:hidden">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-full border border-[#e8edf2] bg-white py-2.5 pr-3 pl-9 text-sm text-[#1a2b4a] placeholder:text-[#94a3b8] transition-colors focus:border-engineering focus:outline-none focus:ring-2 focus:ring-engineering/20 dark:border-border dark:bg-card dark:text-foreground"
              />
            </label>
          </div>

          {/* Search + sort — desktop starts flush with product column */}
          <div className="flex min-w-0 flex-wrap items-center gap-3 sm:gap-4 lg:justify-between">
            <label className="relative hidden min-w-0 flex-1 lg:block lg:max-w-[280px]">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-full border border-[#e8edf2] bg-white py-2.5 pr-3 pl-9 text-sm text-[#1a2b4a] placeholder:text-[#94a3b8] transition-colors focus:border-engineering focus:outline-none focus:ring-2 focus:ring-engineering/20 dark:border-border dark:bg-card dark:text-foreground"
              />
            </label>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <label className="flex items-center gap-2 text-sm text-[#5a6478]">
                <span className="whitespace-nowrap font-medium">Sort By :</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-[10px] border border-[#e8edf2] bg-white px-3 py-2 text-sm font-semibold text-[#1a2b4a] focus:border-engineering focus:outline-none focus:ring-2 focus:ring-engineering/20 dark:border-border dark:bg-card dark:text-foreground"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="popular">Popular</option>
                  <option value="az">A–Z</option>
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm text-[#5a6478]">
                <span className="whitespace-nowrap font-medium">Show :</span>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value) as (typeof PAGE_SIZES)[number])}
                  className="rounded-[10px] border border-[#e8edf2] bg-white px-3 py-2 text-sm font-semibold text-[#1a2b4a] focus:border-engineering focus:outline-none focus:ring-2 focus:ring-engineering/20 dark:border-border dark:bg-card dark:text-foreground"
                >
                  {PAGE_SIZES.map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>

              <div className="flex items-center gap-1 border-l border-[#e8edf2] pl-3 dark:border-border" role="group" aria-label="View mode">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-pressed={view === "grid"}
                  aria-label="Grid view"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors ${PRODUCTS_FOCUS_RING} ${
                    view === "grid"
                      ? "bg-engineering/10 text-engineering"
                      : "text-[#94a3b8] hover:text-engineering"
                  }`}
                >
                  <LayoutGrid className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-pressed={view === "list"}
                  aria-label="List view"
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] transition-colors ${PRODUCTS_FOCUS_RING} ${
                    view === "list"
                      ? "bg-engineering/10 text-engineering"
                      : "text-[#94a3b8] hover:text-engineering"
                  }`}
                >
                  <List className="h-5 w-5" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`grid gap-8 lg:gap-10 ${
            sidebarVisible ? "lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)]" : ""
          }`}
        >
          {/* Desktop sticky sidebar */}
          {sidebarVisible && (
            <aside className="hidden min-w-0 lg:block" aria-label="Product filters">
              <div className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-1">
                <FilterPanel {...filterPanelProps} onCategory={setCategory} onBrand={setBrand} />
              </div>
            </aside>
          )}

          <div className="min-w-0">
            <p className="mb-5 text-sm text-[#94a3b8]" aria-live="polite">
              Showing {Math.min(visible.length, filtered.length)} of {filtered.length} product
              {filtered.length === 1 ? "" : "s"}
              {category !== "All" ? ` in ${category}` : ""}
              {brand !== "All" ? ` · ${brand}` : ""}
              {compareIds.length > 0 ? ` · ${compareIds.length}/${MAX_COMPARE} selected` : ""}
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-[28px] border border-[#e8edf2] bg-[#fafbfd] px-6 py-16 text-center dark:border-border dark:bg-surface">
                <p className="font-semibold text-[#1a2b4a] dark:text-foreground">No products match your filters.</p>
                <button
                  type="button"
                  onClick={() => {
                    setCategory("All");
                    setBrand("All");
                    setQuery("");
                  }}
                  className={`mt-4 text-sm font-semibold text-engineering ${PRODUCTS_FOCUS_RING}`}
                >
                  Clear filters
                </button>
              </div>
            ) : view === "grid" ? (
              <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
                {visible.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    selected={compareIds.includes(product.id)}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            ) : (
              <div ref={gridRef} className="flex flex-col gap-5">
                {visible.map((product) => (
                  <ProductListRow
                    key={product.id}
                    product={product}
                    selected={compareIds.includes(product.id)}
                    onToggleCompare={toggleCompare}
                  />
                ))}
              </div>
            )}

            {filtered.length > pageSize && (
              <p className="mt-6 text-center text-sm text-[#94a3b8]">
                Showing first {pageSize} results. Increase &quot;Show&quot; to see more.
              </p>
            )}

            {compareProducts.length >= 2 && (
              <div id="compare" className="mt-14 scroll-mt-28">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs font-bold tracking-[0.24em] text-engineering uppercase">Comparison</p>
                    <h2 className="text-2xl font-bold text-[#1a2b4a] dark:text-foreground">
                      Advanced Product Comparison
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCompareIds([])}
                    className={`inline-flex items-center gap-2 text-sm font-semibold text-[#5a6478] hover:text-engineering ${PRODUCTS_FOCUS_RING}`}
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                </div>
                <div className={`overflow-x-auto ${PRODUCTS_CARD}`}>
                  <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="bg-[#fafbfd] dark:bg-surface">
                      <tr>
                        <th className="px-5 py-4 font-bold text-[#1a2b4a] dark:text-foreground">Attribute</th>
                        {compareProducts.map((p) => (
                          <th key={p.id} className="px-5 py-4 font-bold text-[#1a2b4a] dark:text-foreground">
                            {p.title}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-[#e8edf2] dark:border-border">
                        <td className="px-5 py-3 font-semibold text-engineering">Category</td>
                        {compareProducts.map((p) => (
                          <td key={p.id} className="px-5 py-3 text-[#5a6478] dark:text-foreground-muted">{p.category}</td>
                        ))}
                      </tr>
                      <tr className="border-t border-[#e8edf2] dark:border-border">
                        <td className="px-5 py-3 font-semibold text-engineering">Brand</td>
                        {compareProducts.map((p) => (
                          <td key={p.id} className="px-5 py-3 text-[#5a6478] dark:text-foreground-muted">{p.brand}</td>
                        ))}
                      </tr>
                      {allSpecLabels.map((label) => (
                        <tr key={label} className="border-t border-[#e8edf2] dark:border-border">
                          <td className="px-5 py-3 font-semibold text-engineering">{label}</td>
                          {compareProducts.map((p) => (
                            <td key={p.id} className="px-5 py-3 text-[#5a6478] dark:text-foreground-muted">
                              {p.compareSpecs.find((s) => s.label === label)?.value ?? "—"}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact?intent=consultation" className={`btn-primary inline-flex items-center gap-2 ${PRODUCTS_FOCUS_RING}`}>
                    Request Product Consultation
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact?intent=rfq" className={`btn-secondary inline-flex items-center gap-2 ${PRODUCTS_FOCUS_RING}`}>
                    Request a Quotation (RFQ)
                  </Link>
                </div>
              </div>
            )}

            {compareIds.length === 1 && (
              <p className="mt-8 flex items-center gap-2 text-sm text-[#94a3b8]">
                <FileText className="h-4 w-4" aria-hidden />
                Select 1–3 more products to open the comparison table (max {MAX_COMPARE}).
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer — from left */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden" role="dialog" aria-modal="true" aria-label="Product filters">
          <button
            type="button"
            className="absolute inset-0 bg-[#0f1729]/50"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,340px)] flex-col bg-white shadow-[12px_0_40px_rgba(15,23,42,0.18)] dark:bg-card">
            <div className="flex items-center justify-between border-b border-[#e8edf2] px-5 py-4 dark:border-border">
              <div>
                <p className="text-[11px] font-bold tracking-[0.2em] text-engineering uppercase">Browse</p>
                <h2 className="text-lg font-bold text-[#1a2b4a] dark:text-foreground">Filters</h2>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8edf2] dark:border-border ${PRODUCTS_FOCUS_RING}`}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <FilterPanel {...filterPanelProps} />
            </div>
            <div className="border-t border-[#e8edf2] p-4 dark:border-border">
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className={`btn-primary inline-flex w-full items-center justify-center ${PRODUCTS_FOCUS_RING}`}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
