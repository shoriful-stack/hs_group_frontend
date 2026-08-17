"use client";

import { useEffect, useMemo, useState } from "react";
import type { ContentBlock } from "@/data/news-article-detail";
import { NEWS_FOCUS_RING } from "../constants";

type Props = { content: ContentBlock[]; forceShow?: boolean };

export default function NewsDetailToc({ content, forceShow }: Props) {
  const headings = useMemo(
    () =>
      content.filter(
        (b): b is Extract<ContentBlock, { type: "h2" | "h3" }> =>
          b.type === "h2" || b.type === "h3",
      ),
    [content],
  );

  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 1] },
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <nav
      className={forceShow ? "block" : "hidden xl:block"}
      aria-label="Table of contents"
    >
      <p className="mb-4 text-[10px] font-bold tracking-[0.2em] text-[#94a3b8] uppercase">
        On this page
      </p>
      <ul className="space-y-1 border-l border-[#e8edf2] dark:border-border">
        {headings.map((h) => {
          const isActive = active === h.id;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className={`block border-l-2 py-1.5 text-sm transition-colors ${NEWS_FOCUS_RING} ${
                  h.type === "h3" ? "pl-5" : "pl-3"
                } ${
                  isActive
                    ? "-ml-px border-engineering font-semibold text-engineering"
                    : "border-transparent text-[#5a6478] hover:text-engineering dark:text-foreground-muted"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
