"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Search, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { newsArticles, newsCategories, type NewsCategory } from "@/data/news";
import {
  CINEMATIC_IMAGE,
  NEWS_BG_WHITE,
  NEWS_CARD,
  NEWS_CARD_HOVER,
  NEWS_FOCUS_RING,
  NEWS_GRID_GAP,
  NEWS_INNER,
  NEWS_INPUT,
  NEWS_SECTION_PAD,
} from "./constants";

type SortKey = "newest" | "oldest" | "popular";

export default function NewsLatestSection() {
  const [category, setCategory] = useState<NewsCategory>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let items = newsArticles.filter((a) => !a.featured);

    if (category !== "All") {
      items = items.filter((a) => a.category === category);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      items = items.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      );
    }

    items = [...items].sort((a, b) => {
      if (sort === "popular") return b.popular - a.popular;
      if (sort === "oldest") return a.date.localeCompare(b.date);
      return b.date.localeCompare(a.date);
    });

    return items;
  }, [category, query, sort]);

  return (
    <section
      id="latest-news"
      className={`relative scroll-mt-[calc(var(--header-height)+1rem)] overflow-hidden ${NEWS_BG_WHITE} ${NEWS_SECTION_PAD}`}
      aria-label="Latest news"
    >
      <div className={NEWS_INNER}>
        <SectionHeading
          label="LATEST NEWS"
          title="Engineering Updates & Insights"
          description="Browse company news, project stories, press releases, CSR, awards, events, and media features."
          align="center"
        />

        <div className="mb-8 space-y-4">
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Filter by category"
          >
            {newsCategories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold tracking-wide transition-all duration-[400ms] sm:text-sm ${NEWS_FOCUS_RING} ${
                    active
                      ? "bg-engineering text-white shadow-[0_4px_16px_rgba(33,140,206,0.35)]"
                      : "border border-[#e8edf2] bg-white text-[#5a6478] hover:border-engineering/40 hover:text-engineering dark:border-border dark:bg-card"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full sm:max-w-md">
              <span className="sr-only">Search news</span>
              <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-[#94a3b8]" aria-hidden />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles…"
                className={`${NEWS_INPUT} pl-11`}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-[#5a6478] dark:text-foreground-muted">
              <span className="shrink-0 text-xs font-semibold tracking-wide uppercase">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className={`${NEWS_INPUT} w-full sm:w-auto`}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
              </select>
            </label>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-[#5a6478] dark:text-foreground-muted" role="status">
            No articles match your filters.
          </p>
        ) : (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${NEWS_GRID_GAP}`} role="list">
            {filtered.map((article) => (
              <article
                key={article.id}
                role="listitem"
                className={`group flex h-full flex-col overflow-hidden ${NEWS_CARD} ${NEWS_CARD_HOVER}`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="rounded-full border border-engineering/20 bg-engineering/5 px-2.5 py-1 font-semibold tracking-wide text-engineering uppercase">
                      {article.category}
                    </span>
                    <time dateTime={article.date} className="text-[#94a3b8]">
                      {article.dateLabel}
                    </time>
                    <span className="inline-flex items-center gap-1 text-[#94a3b8]">
                      <Clock className="h-3 w-3" aria-hidden />
                      {article.readingTime}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold leading-snug text-[#1a2b4a] dark:text-foreground">
                    <Link
                      href={`/blog/${article.slug}`}
                      className={`transition-colors hover:text-engineering ${NEWS_FOCUS_RING}`}
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-[1.85] text-[#5a6478] dark:text-foreground-muted">
                    {article.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#e8edf2] pt-4 dark:border-border">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#94a3b8]">
                      <User className="h-3.5 w-3.5" aria-hidden />
                      {article.author}
                    </span>
                    <Link
                      href={`/blog/${article.slug}`}
                      className={`inline-flex items-center gap-1 text-sm font-semibold text-engineering ${NEWS_FOCUS_RING}`}
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 transition-transform duration-[400ms] group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
