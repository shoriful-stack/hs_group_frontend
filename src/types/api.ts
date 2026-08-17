export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
};

export type ApiFailure = {
  success: false;
  message: string;
  data?: unknown;
};

export type ApiEnvelope<T> = ApiSuccess<T> | ApiFailure;

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue | QueryValue[]>;

export type NextFetchConfig = {
  revalidate?: number | false;
  tags?: string[];
};

export type ApiRequestOptions = {
  headers?: HeadersInit;
  query?: QueryParams;
  timeoutMs?: number;
  signal?: AbortSignal;
  /** Next.js fetch cache. Defaults to ISR on GET, no-store on mutations. */
  cache?: RequestCache;
  next?: NextFetchConfig;
  unwrap?: boolean;
};
