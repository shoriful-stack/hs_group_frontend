import { getApiBaseUrl, getApiRevalidateSeconds, getApiTimeoutMs } from "@/lib/env";
import type { ApiEnvelope, ApiRequestOptions, QueryParams } from "@/types/api";

export class ApiClientError extends Error {
  readonly status: number;
  readonly payload: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.payload = payload;
  }
}

function buildQuery(params?: QueryParams): string {
  if (!params) return "";

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === "") continue;
    const values = Array.isArray(value) ? value : [value];
    for (const item of values) {
      if (item == null || item === "") continue;
      search.append(key, String(item));
    }
  }

  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

function resolveUrl(path: string, query?: QueryParams): string {
  const base = getApiBaseUrl();
  const normalized = path.replace(/^\/+/, "");
  return `${base}/${normalized}${buildQuery(query)}`;
}

function mergeHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers({
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  });

  if (extra) {
    new Headers(extra).forEach((value, key) => {
      headers.set(key, value);
    });
  }

  return headers;
}

function withTimeout(timeoutMs: number, external?: AbortSignal): {
  signal: AbortSignal;
  cleanup: () => void;
} {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const onAbort = () => controller.abort();
  external?.addEventListener("abort", onAbort);

  return {
    signal: controller.signal,
    cleanup: () => {
      clearTimeout(timer);
      external?.removeEventListener("abort", onAbort);
    },
  };
}

async function parseBody(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

function isEnvelope<T>(value: unknown): value is ApiEnvelope<T> {
  return typeof value === "object" && value !== null && "success" in value;
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  options: ApiRequestOptions = {}
): Promise<T> {
  const isMutation = method !== "GET" && method !== "HEAD";
  const timeoutMs = options.timeoutMs ?? getApiTimeoutMs();
  const { signal, cleanup } = withTimeout(timeoutMs, options.signal);
  const headers = mergeHeaders(options.headers);

  if (body !== undefined && !(body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const init: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
    method,
    headers,
    signal,
    cache: options.cache ?? (isMutation ? "no-store" : "force-cache"),
  };

  if (!isMutation) {
    init.next = {
      revalidate: options.next?.revalidate ?? getApiRevalidateSeconds(),
      tags: options.next?.tags,
    };
  }

  if (body !== undefined) {
    init.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  let response: Response;
  try {
    response = await fetch(resolveUrl(path, options.query), init);
  } catch (error) {
    cleanup();
    if (error instanceof Error && error.name === "AbortError") {
      throw new ApiClientError("Request timed out", 408);
    }
    throw new ApiClientError(
      error instanceof Error ? error.message : "Network request failed",
      0
    );
  }
  cleanup();

  const payload = await parseBody(response);

  if (!response.ok) {
    const message =
      isEnvelope(payload) && payload.message
        ? payload.message
        : `Request failed with status ${response.status}`;
    throw new ApiClientError(message, response.status, payload);
  }

  const unwrap = options.unwrap ?? true;
  if (unwrap && isEnvelope<T>(payload)) {
    if (!payload.success) {
      throw new ApiClientError(payload.message || "API request failed", response.status, payload);
    }
    return payload.data;
  }

  return payload as T;
}

export const apiClient = {
  get<T>(path: string, options?: ApiRequestOptions) {
    return request<T>("GET", path, undefined, options);
  },
  post<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>("POST", path, body, { ...options, cache: "no-store" });
  },
  put<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>("PUT", path, body, { ...options, cache: "no-store" });
  },
  patch<T>(path: string, body?: unknown, options?: ApiRequestOptions) {
    return request<T>("PATCH", path, body, { ...options, cache: "no-store" });
  },
  delete<T>(path: string, options?: ApiRequestOptions) {
    return request<T>("DELETE", path, undefined, { ...options, cache: "no-store" });
  },
};

export type { ApiRequestOptions };
