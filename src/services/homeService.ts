import { cache } from "react";
import { apiClient } from "@/lib/apiClient";
import { toAbsoluteStorageUrl } from "@/lib/storage";
import type {
  AboutStats,
  ContactInfo,
  FeatureCardView,
  FeatureItem,
  GeneralSettings,
  HeroItem,
  HeroSlideView,
  HomeStaticData,
  HomeStaticDataResponse,
  LayoutDataResponse,
  LayoutNavigation,
  NavLinkItem,
  PartnerLogo,
  PartnerLogoView,
  SiteSettingsView,
  SocialLink,
} from "@/types/home";

export const EMPTY_ABOUT_STATS: AboutStats = {
  title: null,
  content: null,
  image: null,
  images: [],
  stats: [],
};

export const EMPTY_GENERAL_SETTINGS: GeneralSettings = {
  title: null,
  favicon: null,
  logo_header: null,
  logo_footer: null,
  description: null,
  keywords: null,
};

export const EMPTY_CONTACT_INFO: ContactInfo = {
  address: null,
  primary_phone: null,
  secondary_phone: null,
  primary_email: null,
  secondary_email: null,
  whatsapp_number: null,
};

export const EMPTY_HOME_STATIC_DATA: HomeStaticData = {
  hero: [],
  about_stats: EMPTY_ABOUT_STATS,
  features: [],
  partners: [],
  general_settings: EMPTY_GENERAL_SETTINGS,
  contact_us: EMPTY_CONTACT_INFO,
  social_links: [],
};

export const EMPTY_SITE_SETTINGS: SiteSettingsView = {
  title: "",
  description: "",
  keywords: [],
  favicon: null,
  logoHeader: null,
  logoFooter: null,
  phone: "",
  email: "",
  address: "",
  social: [],
  latestProducts: [],
  productCategories: [],
  serviceCategories: [],
};

const EMPTY_NAVIGATION: LayoutNavigation = {
  latest_products: [],
  product_categories: [],
  service_categories: [],
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
        video: asString(item.video),
        serial_no: asNumber(item.serial_no, 0),
      },
    ];
  }).sort((a, b) => a.serial_no - b.serial_no);
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

  let imageList: unknown = value.images;
  if (typeof imageList === "string" && imageList.trim()) {
    try {
      imageList = JSON.parse(imageList);
    } catch {
      imageList = [];
    }
  }

  const images = Array.isArray(imageList)
    ? imageList.filter((image): image is string => typeof image === "string" && Boolean(image.trim()))
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
        image: asString(item.image),
      },
    ];
  });
}

function normalizePartners(items: unknown): PartnerLogo[] {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item, index) => {
    if (!isRecord(item)) return [];
    const name = asString(item.name) ?? asString(item.title);
    if (!name) return [];
    return [
      {
        id: asNumber(item.id) || index + 1,
        name,
        logo: asString(item.logo) ?? asString(item.image),
        content: asString(item.content),
      },
    ];
  });
}

function normalizeGeneralSettings(value: unknown): GeneralSettings {
  if (!isRecord(value)) return EMPTY_GENERAL_SETTINGS;

  return {
    id: asNumber(value.id) || undefined,
    title: asString(value.title),
    favicon: asString(value.favicon),
    logo_header: asString(value.logo_header),
    logo_footer: asString(value.logo_footer),
    description: asString(value.description),
    keywords: asString(value.keywords),
  };
}

function normalizeContactInfo(value: unknown): ContactInfo {
  const record = Array.isArray(value)
    ? value.find((item): item is Record<string, unknown> => isRecord(item))
    : isRecord(value)
      ? value
      : null;

  if (!record) return EMPTY_CONTACT_INFO;

  return {
    id: asNumber(record.id) || undefined,
    address: asString(record.address),
    primary_phone: asString(record.primary_phone),
    secondary_phone: asString(record.secondary_phone),
    primary_email: asString(record.primary_email),
    secondary_email: asString(record.secondary_email),
    whatsapp_number: asString(record.whatsapp_number),
  };
}

function normalizeSocialLinks(items: unknown): SocialLink[] {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    if (!isRecord(item)) return [];
    const id = asNumber(item.id);
    const link = asString(item.link);
    if (!id || !link) return [];
    return [{ id, icon: asString(item.icon), link }];
  });
}

export function normalizeHomeStaticData(payload: unknown): HomeStaticData {
  if (!isRecord(payload)) return EMPTY_HOME_STATIC_DATA;

  return {
    hero: normalizeHero(payload.hero),
    about_stats: normalizeAboutStats(payload.about_stats),
    features: normalizeFeatures(payload.features),
    partners: normalizePartners(payload.partners),
    general_settings: normalizeGeneralSettings(payload.general_settings),
    contact_us: normalizeContactInfo(payload.contact_us),
    social_links: normalizeSocialLinks(payload.social_links),
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

function toHref(value: string | null | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) return undefined;
  if (/^(https?:\/\/|mailto:|tel:|#|\/)/i.test(trimmed)) return trimmed;
  return `/${trimmed}`;
}

export function mapHeroSlides(items: HeroItem[]): HeroSlideView[] {
  return [...items]
    .sort((a, b) => a.serial_no - b.serial_no)
    .flatMap((item) => {
      const image = toAbsoluteStorageUrl(item.image);
      const video = toAbsoluteStorageUrl(item.video);
      if (!image && !video) return [];

      return [
        {
          id: item.id,
          title: stripHtml(item.title),
          subtitle: stripHtml(item.sub_title) || undefined,
          description: stripHtml(item.sub_content) || undefined,
          ...(video ? { video } : { image }),
          url: toHref(item.url),
        },
      ];
    });
}

export function mapAboutCollageImages(about?: AboutStats | null): string[] {
  try {
    if (!about) return [];

    const gallery = Array.isArray(about.images) ? about.images : [];
    const raw = gallery.length > 0 ? gallery : [about.image];
    const seen = new Set<string>();
    const urls: string[] = [];

    for (const path of raw) {
      if (typeof path !== "string") continue;
      const url = toAbsoluteStorageUrl(path);
      if (!url || seen.has(url)) continue;
      seen.add(url);
      urls.push(url);
      if (urls.length >= 4) break;
    }

    return urls;
  } catch {
    return [];
  }
}

export function mapFeatureCards(items: FeatureItem[]): FeatureCardView[] {
  return items.flatMap((item) => {
    const cards: FeatureCardView[] = [
      {
        type: "text",
        title: item.title,
        description: item.short_description ?? "",
      },
    ];
    const image = toAbsoluteStorageUrl(item.image);
    if (image) {
      cards.push({
        type: "image",
        image,
        alt: item.title,
      });
    }
    return cards;
  });
}

export function mapPartnerLogos(items?: PartnerLogo[] | null): PartnerLogoView[] {
  try {
    if (!Array.isArray(items)) return [];

    const seen = new Set<string>();
    const logos: PartnerLogoView[] = [];

    for (const item of items) {
      const name = item?.name?.trim();
      if (!name || seen.has(name)) continue;
      seen.add(name);

      const logo = toAbsoluteStorageUrl(item.logo) || undefined;
      const category = stripHtml(item.content) || undefined;

      logos.push({
        name,
        ...(logo ? { logo } : {}),
        ...(category ? { category } : {}),
      });
    }

    return logos;
  } catch {
    return [];
  }
}

function parseKeywords(value: string | null): string[] {
  if (!value) return [];
  return value
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function socialMeta(icon: string | null, link: string): { label: string; icon: string } {
  const hay = `${icon ?? ""} ${link}`.toLowerCase();
  if (hay.includes("linkedin")) return { label: "LinkedIn", icon: "linkedin" };
  if (hay.includes("facebook")) return { label: "Facebook", icon: "facebook" };
  if (hay.includes("youtube") || hay.includes("youtu.be")) return { label: "YouTube", icon: "youtube" };
  if (hay.includes("instagram")) return { label: "Instagram", icon: "instagram" };
  if (hay.includes("twitter") || hay.includes("x.com")) return { label: "Twitter", icon: "twitter" };
  return { label: stripHtml(icon) || "Social", icon: "link" };
}

function safeMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  try {
    return toAbsoluteStorageUrl(path) || null;
  } catch {
    return null;
  }
}

function normalizeNavLinks(
  items: unknown,
  nameKey: "title" | "name",
  toHref: (slug: string) => string
): NavLinkItem[] {
  if (!Array.isArray(items)) return [];

  return items.flatMap((item) => {
    if (!isRecord(item)) return [];
    const id = asNumber(item.id);
    const slug = asString(item.slug);
    const name = asString(item[nameKey]) ?? asString(item.name) ?? asString(item.title);
    if (!id || !slug || !name) return [];
    return [{ id, name: stripHtml(name), slug, href: toHref(slug) }];
  });
}

function normalizeNavigation(value: unknown): Pick<
  SiteSettingsView,
  "latestProducts" | "productCategories" | "serviceCategories"
> {
  const nav = isRecord(value) ? value : EMPTY_NAVIGATION;

  return {
    latestProducts: normalizeNavLinks(nav.latest_products, "title", (slug) => `/products/${slug}`),
    productCategories: normalizeNavLinks(
      nav.product_categories,
      "name",
      (slug) => `/products?category=${encodeURIComponent(slug)}`
    ),
    serviceCategories: normalizeNavLinks(
      nav.service_categories,
      "name",
      (slug) => `/services?category=${encodeURIComponent(slug)}`
    ),
  };
}

export function mapSiteSettings(
  data: HomeStaticData | LayoutDataResponse | null | undefined
): SiteSettingsView {
  try {
    if (!data) return EMPTY_SITE_SETTINGS;

    const settings = data.general_settings ?? EMPTY_GENERAL_SETTINGS;
    const contact = data.contact_us ?? EMPTY_CONTACT_INFO;
    const logoHeader = safeMediaUrl(settings.logo_header);
    const logoFooter = safeMediaUrl(settings.logo_footer) || logoHeader;
    const navigation = normalizeNavigation("navigation" in data ? data.navigation : null);

    return {
      title: stripHtml(settings.title),
      description: stripHtml(settings.description),
      keywords: parseKeywords(settings.keywords),
      favicon: safeMediaUrl(settings.favicon),
      logoHeader,
      logoFooter,
      phone: contact.primary_phone || "",
      email: contact.primary_email || contact.secondary_email || "",
      address: stripHtml(contact.address),
      social: Array.isArray(data.social_links)
        ? data.social_links.flatMap((item) => {
            if (!isRecord(item)) return [];
            const href = asString(item.link);
            if (!href) return [];
            const meta = socialMeta(asString(item.icon), href);
            return [{ label: meta.label, href, icon: meta.icon }];
          })
        : [],
      ...navigation,
    };
  } catch {
    return EMPTY_SITE_SETTINGS;
  }
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

export async function getPartnerLogos(): Promise<PartnerLogoView[]> {
  try {
    const data = await getHomeStaticData();
    return mapPartnerLogos(data?.partners);
  } catch {
    return [];
  }
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsView> => {
  try {
    const data = await apiClient.get<LayoutDataResponse>("layout", {
      next: { tags: ["layout"] },
    });
    return mapSiteSettings(data);
  } catch {
    return EMPTY_SITE_SETTINGS;
  }
});
