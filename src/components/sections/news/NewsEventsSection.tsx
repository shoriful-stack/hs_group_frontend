"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { newsEvents } from "@/data/news";
import {
  CINEMATIC_IMAGE,
  NEWS_BG_WHITE,
  NEWS_CARD,
  NEWS_CARD_HOVER,
  NEWS_FOCUS_RING,
  NEWS_GRID_GAP,
  NEWS_INNER,
  NEWS_SECTION_PAD,
} from "./constants";

export default function NewsEventsSection() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const items = newsEvents.filter((e) => e.status === tab);

  return (
    <section
      className={`relative overflow-hidden ${NEWS_BG_WHITE} ${NEWS_SECTION_PAD}`}
      aria-label="Events and exhibitions"
    >
      <div className={NEWS_INNER}>
        <SectionHeading
          label="EVENTS & EXHIBITIONS"
          title="Where HS Group Connects With Industry"
          description="Join upcoming forums or revisit past exhibitions showcasing engineering excellence."
          align="center"
        />

        <div
          className="mb-8 flex justify-center gap-2"
          role="tablist"
          aria-label="Event status"
        >
          {(["upcoming", "past"] as const).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold capitalize transition-all duration-[400ms] ${NEWS_FOCUS_RING} ${
                tab === key
                  ? "bg-engineering text-white shadow-[0_4px_16px_rgba(33,140,206,0.35)]"
                  : "border border-[#e8edf2] bg-white text-[#5a6478] hover:border-engineering/40 dark:border-border dark:bg-card"
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 ${NEWS_GRID_GAP}`}>
          {items.map((event) => (
            <article
              key={event.id}
              className={`group overflow-hidden ${NEWS_CARD} ${NEWS_CARD_HOVER}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className={`${CINEMATIC_IMAGE} transition-transform duration-500 group-hover:scale-[1.04]`}
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="mb-3 text-lg font-bold text-[#1a2b4a] dark:text-foreground">
                  {event.title}
                </h3>
                <ul className="mb-5 space-y-2 text-sm text-[#5a6478] dark:text-foreground-muted">
                  <li className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-engineering" aria-hidden />
                    {event.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-engineering" aria-hidden />
                    {event.location}
                  </li>
                </ul>
                <Link
                  href={event.cta.href}
                  className={`inline-flex items-center gap-1.5 text-sm font-semibold text-engineering ${NEWS_FOCUS_RING}`}
                >
                  {event.cta.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
