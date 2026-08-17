"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import type { CareerJob } from "@/data/careers-page";
import { CAREERS_FOCUS_RING } from "../constants";

type Props = {
  prev: CareerJob | null;
  next: CareerJob | null;
};

export default function CareerDetailPrevNext({ prev, next }: Props) {
  if (!prev && !next) return null;

  return (
    <>
      <div className="h-24" aria-hidden />
      <nav
        className="pointer-events-none fixed inset-x-0 bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 flex justify-center px-4 sm:bottom-8"
        aria-label="Previous and next roles"
      >
        <div className="pointer-events-auto flex w-full max-w-md items-center justify-between gap-3 rounded-full border border-[#e8edf2] bg-white px-3 py-2.5 shadow-[0_12px_40px_rgba(15,23,42,0.12)] sm:gap-4 sm:px-4 dark:border-border dark:bg-card">
          {prev ? (
            <Link
              href={`/careers/${prev.slug}`}
              className={`group inline-flex min-w-0 flex-1 items-center gap-2.5 text-[#1a2b4a] transition-colors hover:text-engineering dark:text-foreground ${CAREERS_FOCUS_RING}`}
              aria-label={`Previous role: ${prev.title}`}
            >
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9e1ea] transition-colors group-hover:border-engineering dark:border-border">
                <ChevronLeft className="h-4 w-4" aria-hidden />
              </span>
              <span className="truncate text-sm font-medium">Previous</span>
            </Link>
          ) : (
            <span className="inline-flex min-w-0 flex-1 items-center gap-2.5 text-[#c5ccd6]" aria-hidden>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8edf2] dark:border-border">
                <ChevronLeft className="h-4 w-4" />
              </span>
              <span className="text-sm font-medium">Previous</span>
            </span>
          )}

          <Link
            href="/careers#open-roles"
            className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#1a2b4a] transition-colors hover:bg-engineering/5 hover:text-engineering dark:text-foreground ${CAREERS_FOCUS_RING}`}
            aria-label="View all open roles"
          >
            <LayoutGrid className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </Link>

          {next ? (
            <Link
              href={`/careers/${next.slug}`}
              className={`group inline-flex min-w-0 flex-1 items-center justify-end gap-2.5 text-[#1a2b4a] transition-colors hover:text-engineering dark:text-foreground ${CAREERS_FOCUS_RING}`}
              aria-label={`Next role: ${next.title}`}
            >
              <span className="truncate text-sm font-medium">Next</span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d9e1ea] transition-colors group-hover:border-engineering dark:border-border">
                <ChevronRight className="h-4 w-4" aria-hidden />
              </span>
            </Link>
          ) : (
            <span className="inline-flex min-w-0 flex-1 items-center justify-end gap-2.5 text-[#c5ccd6]" aria-hidden>
              <span className="text-sm font-medium">Next</span>
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#e8edf2] dark:border-border">
                <ChevronRight className="h-4 w-4" />
              </span>
            </span>
          )}
        </div>
      </nav>
    </>
  );
}
