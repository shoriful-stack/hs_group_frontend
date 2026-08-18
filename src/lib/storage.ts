import { getApiOrigin, getStorageUrl } from "@/lib/env";

const ABSOLUTE_URL = /^(?:[a-z][a-z\d+\-.]*:)?\/\//i;

function isAbsoluteUrl(value: string): boolean {
  return ABSOLUTE_URL.test(value) || value.startsWith("data:") || value.startsWith("blob:");
}

/**
 * Convert a Laravel relative storage path into an absolute URL.
 * Passes through already-absolute, data:, and blob: URLs.
 */
export function toAbsoluteStorageUrl(
  path: string | null | undefined,
  fallback = ""
): string {
  try {
    if (!path) return fallback;

    const trimmed = path.trim();
    if (!trimmed) return fallback;
    if (isAbsoluteUrl(trimmed)) return trimmed;

    const origin = getApiOrigin();
    const storageBase = getStorageUrl();
    const withoutLeadingSlashes = trimmed.replace(/^\/+/, "");

    if (withoutLeadingSlashes.startsWith("storage/")) {
      return `${origin}/${withoutLeadingSlashes}`;
    }

    if (trimmed.startsWith("/storage/")) {
      return `${origin}${trimmed}`;
    }

    return `${storageBase}/${withoutLeadingSlashes}`;
  } catch {
    return fallback;
  }
}

/** Map a list of Laravel paths to absolute URLs, dropping empty values. */
export function toAbsoluteStorageUrls(
  paths: Array<string | null | undefined>
): string[] {
  return paths.map((path) => toAbsoluteStorageUrl(path)).filter(Boolean);
}

export function isRemoteImageUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  return /^https?:\/\//i.test(value.trim());
}
