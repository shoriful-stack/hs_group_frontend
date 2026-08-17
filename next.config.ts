import type { NextConfig } from "next";

type RemotePattern = {
  protocol: "http" | "https";
  hostname: string;
  port?: string;
  pathname: string;
};

function remotePatternFromUrl(value?: string): RemotePattern | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const protocol = url.protocol.replace(":", "");
    if (protocol !== "http" && protocol !== "https") return null;

    return {
      protocol,
      hostname: url.hostname,
      ...(url.port ? { port: url.port } : {}),
      pathname: "/**",
    };
  } catch {
    return null;
  }
}

function uniquePatterns(patterns: Array<RemotePattern | null>): RemotePattern[] {
  const seen = new Set<string>();
  const result: RemotePattern[] = [];

  for (const pattern of patterns) {
    if (!pattern) continue;
    const key = `${pattern.protocol}://${pattern.hostname}:${pattern.port ?? ""}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(pattern);
  }

  return result;
}

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: uniquePatterns([
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co", pathname: "/**" },
      remotePatternFromUrl(process.env.NEXT_PUBLIC_STORAGE_URL),
      remotePatternFromUrl(process.env.NEXT_PUBLIC_API_BASE_URL),
    ]),
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
