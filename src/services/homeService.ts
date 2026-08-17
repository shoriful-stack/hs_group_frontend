import { cache } from "react";
import { apiClient } from "@/lib/apiClient";
import { toAbsoluteStorageUrl } from "@/lib/storage";
import type {
  AboutStats,
  FeatureCardView,
  FeatureItem,
  HeroItem,
  HeroSlideView,
  HomeStaticData,
  HomeStaticDataResponse,
  PartnerLogo,
  PartnerLogoView,
} from "@/types/home";

export const EMPTY_ABOUT_STATS: AboutStats = {
  title: null,
  content: null,
  image: null,
  images: [],
  stats: [],
};

export const EMPTY_HOME_STATIC_DATA: HomeStaticData = {
  hero: [],
  about_stats: EMPTY_ABOUT_STATS,
  features: [],
  partners: [],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function normalizeHero(items: unknown): HeroItem[] {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    if (!isRecord(item)) return [];
    const id = asNumber(item.id);
    if (!id) return [];

    return [
      {
        id,
        title: asString(item.title),
        content: asString(item.content),
        sub_title: asString(item.sub_title),
        sub_content: asString(item.sub_content),
        image: asString(item.image),
        url: asString(item.url),
        serial_no: asNumber(item.serial_no, 0),
      },
    ];
  });
}

function normalizeAboutStats(value: unknown): AboutStats {
  if (!isRecord(value)) return EMPTY_ABOUT_STATS;

  const stats = Array.isArray(value.stats)
    ? value.stats.flatMap((item) => {
        if (!isRecord(item)) return [];
        const id = asNumber(item.id);
        const title = asString(item.title);
        const statValue = asString(item.value);
        if (!id || !title || !statValue) return [];
        return [
          {
            id,
            title,
            value: statValue,
            serial_no: asNumber(item.serial_no, 0),
          },
        ];
      })
    : [];

  const images = Array.isArray(value.images)
    ? value.images.filter((image): image is string => typeof image === "string" && Boolean(image.trim()))
    : [];

  return {
    title: asString(value.title),
    content: asString(value.content),
    image: asString(value.image),
    images,
    stats,
  };
}

function normalizeFeatures(items: unknown): FeatureItem[] {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    if (!isRecord(item)) return [];
    const title = asString(item.title);
    if (!title) return [];
    return [
      {
        icon: asString(item.icon),
        title,
        short_description: asString(item.short_description),
      },
    ];
  });
}

function normalizePartners(items: unknown): PartnerLogo[] {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    if (!isRecord(item)) return [];
    const id = asNumber(item.id);
    const name = asString(item.name) ?? asString(item.title);
    if (!id || !name) return [];
    return [
      {
        id,
        name,
        logo: asString(item.logo) ?? asString(item.image),
        content: asString(item.content),
      },
    ];
  });
}

export function normalizeHomeStaticData(payload: unknown): HomeStaticData {
  if (!isRecord(payload)) return EMPTY_HOME_STATIC_DATA;

  return {
    hero: normalizeHero(payload.hero),
    about_stats: normalizeAboutStats(payload.about_stats),
    features: normalizeFeatures(payload.features),
    partners: normalizePartners(payload.partners),
  };
}

export function stripHtml(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<\/\s*p\s*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/\s+\n/g, "\n")
    .replace(/\n\s+/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function toParagraphs(value: string | null | undefined): string[] {
  return stripHtml(value)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitHeadline(title: string): string[] {
  const parts = title
    .split(/,(?=\s)/)
    .map((part) => part.trim())
    .filter(Boolean);
  return parts.length > 1 ? parts : [title];
}

export function mapHeroSlides(items: HeroItem[]): HeroSlideView[] {
  return items.flatMap((item, index) => {
    const image = toAbsoluteStorageUrl(item.image);
    if (!image) return [];

    const title = item.title ?? "";
    const slide: HeroSlideView = {
      id: item.id,
      title,
      subtitle: item.sub_title ?? undefined,
      description: item.content ?? undefined,
      image,
      url: item.url,
    };

    if (index === 0) {
      slide.heroContent = {
        headline: splitHeadline(title || "Engineering Excellence"),
        subtitle: stripHtml(item.sub_content || item.content || ""),
        primaryCta: {
          label: "Explore Our Journey",
          href: item.url || "/about",
        },
        secondaryCta: {
          label: "Contact Us",
          href: "/contact",
        },
      };
    }

    return [slide];
  });
}

export function mapAboutCollageImages(about: AboutStats): string[] {
  const raw = [...about.images];
  if (about.image && !raw.includes(about.image)) {
    raw.unshift(about.image);
  }
  return raw.map((path) => toAbsoluteStorageUrl(path)).filter(Boolean);
}

export function mapFeatureCards(items: FeatureItem[]): FeatureCardView[] {
  return items.map((item) => ({
    type: "text" as const,
    title: item.title,
    description: item.short_description ?? "",
  }));
}

export function mapPartnerLogos(items: PartnerLogo[]): PartnerLogoView[] {
  return items.map((item) => ({
    name: item.name,
    category: stripHtml(item.content) || "Strategic Partner",
    logo: toAbsoluteStorageUrl(item.logo) || undefined,
  }));
}

export const getHomeStaticData = cache(async (): Promise<HomeStaticData> => {
  try {
    const data = await apiClient.get<HomeStaticDataResponse>("home/static-data", {
      next: { tags: ["home-static"] },
    });
    return normalizeHomeStaticData(data);
  } catch {
    return EMPTY_HOME_STATIC_DATA;
  }
});
