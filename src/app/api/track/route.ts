import { NextResponse } from "next/server";

type TrackBody = {
  event: string;
  page_path?: string;
  page_title?: string;
  [key: string]: unknown;
};

/**
 * Server-side event endpoint for GTM / Stape.io measurement.
 * Forward browser events from forms (contact, careers apply) without exposing secrets.
 *
 * Optional env:
 * - GTM_SERVER_PREVIEW_HEADER (Stape/sGTM preview header value)
 * - NEXT_PUBLIC_GTM_SERVER_URL
 */
export async function POST(request: Request) {
  let body: TrackBody;
  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.event || typeof body.event !== "string") {
    return NextResponse.json({ ok: false, error: "event required" }, { status: 400 });
  }

  const serverUrl = process.env.NEXT_PUBLIC_GTM_SERVER_URL?.replace(/\/$/, "");
  const preview = process.env.GTM_SERVER_PREVIEW_HEADER?.trim();

  const payload = {
    ...body,
    client_ts: new Date().toISOString(),
    user_agent: request.headers.get("user-agent") ?? undefined,
  };

  if (serverUrl) {
    try {
      await fetch(`${serverUrl}/data`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(preview ? { "x-gtm-server-preview": preview } : {}),
        },
        body: JSON.stringify(payload),
        cache: "no-store",
      });
    } catch {
      // Do not fail the user flow if tracking is down
    }
  }

  return NextResponse.json({ ok: true });
}
