"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { NEWS_FOCUS_RING, NEWS_TOUCH_TARGET } from "../constants";

type Props = {
  readingMinutes: number;
};

export default function NewsDetailProgress({ readingMinutes }: Props) {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const article = document.getElementById("article-body");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const total = article.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
      setShowTop(window.scrollY > 600);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const remaining = Math.max(1, Math.ceil(readingMinutes * (1 - progress / 100)));

  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 z-[60] h-1 bg-[#e8edf2] dark:bg-border"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      >
        <div
          className="h-full bg-engineering transition-[width] duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {progress > 2 && progress < 98 && (
        <p className="pointer-events-none fixed top-2 right-4 z-[60] hidden rounded-full border border-[#e8edf2] bg-white/95 px-3 py-1 text-[11px] font-semibold text-[#5a6478] shadow-sm sm:block dark:border-border dark:bg-card dark:text-foreground-muted">
          ~{remaining} min left
        </p>
      )}

      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed right-4 bottom-6 z-50 inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-engineering shadow-[0_8px_24px_rgba(15,23,42,0.12)] transition-all hover:-translate-y-0.5 hover:border-engineering sm:right-6 dark:border-border dark:bg-card ${NEWS_TOUCH_TARGET} ${NEWS_FOCUS_RING}`}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
