"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/** Pushes virtual pageviews to GTM dataLayer on App Router navigation. */
export default function GtmRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GTM_ID) return;
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "page_view",
      page_path: pathname + (searchParams?.toString() ? `?${searchParams}` : ""),
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}
