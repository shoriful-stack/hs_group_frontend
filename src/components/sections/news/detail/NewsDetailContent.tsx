"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import type { ArticleDetail, ContentBlock } from "@/data/news-article-detail";
import {
  CINEMATIC_IMAGE,
  NEWS_BODY,
  NEWS_CARD,
  NEWS_IMAGE_FRAME,
} from "../constants";

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          id={block.id}
          className="scroll-mt-28 pt-4 text-2xl font-bold text-[#1a2b4a] sm:text-[28px] dark:text-foreground"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={block.id}
          className="scroll-mt-28 pt-2 text-xl font-bold text-[#1a2b4a] dark:text-foreground"
        >
          {block.text}
        </h3>
      );
    case "p":
      return <p className={NEWS_BODY}>{block.text}</p>;
    case "ul":
      return (
        <ul className="space-y-2.5 pl-1">
          {block.items.map((item) => (
            <li key={item} className={`flex gap-3 ${NEWS_BODY}`}>
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-engineering" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="rounded-[20px] border border-engineering/20 bg-engineering/[0.04] px-5 py-5 sm:px-6">
          <p className="mb-2 text-xs font-bold tracking-[0.16em] text-engineering uppercase">
            {block.title}
          </p>
          <p className={NEWS_BODY}>{block.text}</p>
        </aside>
      );
    case "image":
      return (
        <figure className="my-2">
          <div className={`relative aspect-[16/9] ${NEWS_IMAGE_FRAME}`}>
            <Image
              src={block.src}
              alt={block.alt}
              fill
              className={CINEMATIC_IMAGE}
              sizes="(max-width: 820px) 100vw, 820px"
              loading="lazy"
            />
          </div>
          <figcaption className="mt-3 text-sm leading-relaxed text-[#94a3b8]">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-[20px] border border-[#e8edf2] dark:border-border">
          <table className="w-full min-w-[320px] text-left text-sm">
            <thead className="bg-[#fafbfd] dark:bg-surface">
              <tr>
                {block.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 font-bold text-[#1a2b4a] dark:text-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("-")} className="border-t border-[#e8edf2] dark:border-border">
                  {row.map((cell) => (
                    <td key={cell} className="px-4 py-3 text-[#5a6478] dark:text-foreground-muted">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function NewsDetailPullQuote({
  quote,
}: {
  quote: ArticleDetail["pullQuote"];
}) {
  return (
    <blockquote className="relative my-10 border-l-[3px] border-engineering py-2 pl-6 sm:pl-8">
      <Quote className="mb-3 h-7 w-7 text-engineering/40" aria-hidden />
      <p className="mb-4 text-xl font-semibold leading-[1.5] text-[#1a2b4a] sm:text-2xl dark:text-foreground">
        “{quote.text}”
      </p>
      <footer className="text-sm text-[#5a6478] dark:text-foreground-muted">
        <cite className="not-italic font-semibold text-[#1a2b4a] dark:text-foreground">
          {quote.attribution}
        </cite>
        <span className="text-[#94a3b8]"> — {quote.role}</span>
      </footer>
    </blockquote>
  );
}

export default function NewsDetailContent({ article }: { article: ArticleDetail }) {
  const mid = Math.ceil(article.content.length / 2);

  return (
    <div id="article-body" className="mx-auto max-w-[820px] space-y-6 lg:mx-0">
      {article.content.slice(0, mid).map((block, i) => (
        <Block key={`${block.type}-${i}`} block={block} />
      ))}
      <NewsDetailPullQuote quote={article.pullQuote} />
      {article.content.slice(mid).map((block, i) => (
        <Block key={`${block.type}-b-${i}`} block={block} />
      ))}
    </div>
  );
}

export function NewsDetailHighlights({
  highlights,
}: {
  highlights: ArticleDetail["highlights"];
}) {
  return (
    <section className="mt-14" aria-labelledby="engineering-highlights">
      <h2
        id="engineering-highlights"
        className="mb-6 text-xl font-bold text-[#1a2b4a] sm:text-2xl dark:text-foreground"
      >
        Engineering Highlights
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.label}
            className={`${NEWS_CARD} px-5 py-4 transition-all duration-500 hover:-translate-y-1 hover:border-engineering`}
          >
            <p className="mb-1 text-[11px] font-bold tracking-[0.16em] text-engineering uppercase">
              {item.label}
            </p>
            <p className="text-sm font-semibold text-[#1a2b4a] dark:text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
