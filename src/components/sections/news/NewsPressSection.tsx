"use client";

import Link from "next/link";
import { Download, ExternalLink, FileText, Share2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { newsPressReleases } from "@/data/news";
import {
  NEWS_BG_SURFACE,
  NEWS_CARD,
  NEWS_CARD_HOVER,
  NEWS_FOCUS_RING,
  NEWS_INNER,
  NEWS_SECTION_PAD,
} from "./constants";

export default function NewsPressSection() {
  const share = async (title: string, slug: string) => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      className={`relative overflow-hidden ${NEWS_BG_SURFACE} ${NEWS_SECTION_PAD}`}
      aria-label="Press releases"
    >
      <div className={NEWS_INNER}>
        <SectionHeading
          label="PRESS RELEASES"
          title="Official Company Announcements"
          description="Download or read official communications from HS Group corporate affairs."
          align="center"
        />

        <div className="mx-auto max-w-4xl space-y-4">
          {newsPressReleases.map((item) => (
            <article
              key={item.id}
              className={`flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 ${NEWS_CARD} ${NEWS_CARD_HOVER}`}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-engineering/20 bg-engineering/5 text-engineering">
                  <FileText className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1a2b4a] dark:text-foreground">{item.title}</h3>
                  <time className="mt-1 block text-xs text-[#94a3b8]">{item.date}</time>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <a
                  href={item.pdfUrl}
                  className={`btn-secondary inline-flex items-center gap-2 px-4 py-2.5 text-xs ${NEWS_FOCUS_RING}`}
                  aria-label={`Download PDF: ${item.title}`}
                >
                  <Download className="h-3.5 w-3.5" />
                  PDF
                </a>
                <Link
                  href={`/blog/${item.slug}`}
                  className={`inline-flex items-center gap-2 rounded-full border border-[#e8edf2] px-4 py-2.5 text-xs font-semibold text-[#1a2b4a] transition-colors hover:border-engineering hover:text-engineering dark:border-border dark:text-foreground ${NEWS_FOCUS_RING}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Read Online
                </Link>
                <button
                  type="button"
                  onClick={() => share(item.title, item.slug)}
                  className={`inline-flex items-center gap-2 rounded-full border border-[#e8edf2] px-4 py-2.5 text-xs font-semibold text-[#1a2b4a] transition-colors hover:border-engineering hover:text-engineering dark:border-border dark:text-foreground ${NEWS_FOCUS_RING}`}
                  aria-label={`Share: ${item.title}`}
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
