/**
 * Runtime env accessors. Never hardcode hosts or ports.
 */

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  return stripTrailingSlash(requiredEnv("NEXT_PUBLIC_SITE_URL"));
}

export function getApiBaseUrl(): string {
  return stripTrailingSlash(requiredEnv("NEXT_PUBLIC_API_BASE_URL"));
}

export function getStorageUrl(): string {
  return stripTrailingSlash(requiredEnv("NEXT_PUBLIC_STORAGE_URL"));
}

export function getApiTimeoutMs(): number {
  const raw = process.env.NEXT_PUBLIC_API_TIMEOUT_MS?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : 15_000;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 15_000;
}

/** ISR window for Server Component GETs (seconds). */
export function getApiRevalidateSeconds(): number {
  const raw = process.env.API_REVALIDATE_SECONDS?.trim();
  const parsed = raw ? Number.parseInt(raw, 10) : 3600;
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 3600;
}

export function getApiOrigin(): string {
  return new URL(getApiBaseUrl()).origin;
}
