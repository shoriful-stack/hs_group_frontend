/** Fire a browser/server tracking event via /api/track (Stape / sGTM friendly). */
export async function trackEvent(
  event: string,
  payload: Record<string, unknown> = {}
): Promise<void> {
  try {
    if (typeof window !== "undefined") {
      const w = window as Window & { dataLayer?: Record<string, unknown>[] };
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ event, ...payload });
    }

    await fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event,
        page_path: typeof window !== "undefined" ? window.location.pathname : undefined,
        page_title: typeof document !== "undefined" ? document.title : undefined,
        ...payload,
      }),
      keepalive: true,
    });
  } catch {
    // Tracking must never break UX
  }
}
