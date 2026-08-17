"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { PROJECTS_FOCUS_RING, PROJECTS_TOUCH_TARGET } from "../constants";

export default function CaseStudyProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.getElementById("case-study-body");
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      setShowTop(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 right-0 left-0 z-[60] h-1 bg-[#e8edf2] dark:bg-border"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Case study reading progress"
      >
        <div className="h-full bg-engineering transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>
      {showTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={`fixed right-4 bottom-6 z-50 inline-flex items-center justify-center rounded-full border border-[#e8edf2] bg-white text-engineering shadow-[0_8px_24px_rgba(15,23,42,0.12)] hover:-translate-y-0.5 hover:border-engineering sm:right-6 dark:border-border dark:bg-card ${PROJECTS_TOUCH_TARGET} ${PROJECTS_FOCUS_RING}`}
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
