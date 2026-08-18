import { cache } from "react";
import { apiClient } from "@/lib/apiClient";
import { toAbsoluteStorageUrl } from "@/lib/storage";
import { stripHtml, toParagraphs } from "@/services/homeService";
import type {
  ServiceCardView,
  ServiceCategoryView,
  ServiceDetailData,
  ServiceEquipmentGroupView,
  ServiceFaqView,
  ServiceFactView,
  ServiceProcessStepView,
  ServiceTextCardView,
} from "@/types/home";

const HOME_SERVICES_LIMIT = 12;
const PAGE_SERVICES_LIMIT = 100;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

function asId(value: unknown, fallback: string): string {
  if (typeof value === "number" && Number.isFinite(value) && value > 0) {
    return String(value);
  }
  if (typeof value === "string" && value.trim()) return value.trim();
  return fallback;
}

function asCategory(value: unknown): { name: string; slug: string } {
  if (!isRecord(value)) return { name: "", slug: "" };
  return {
    name: stripHtml(asString(value.name)),
    slug: asString(value.slug) ?? "",
  };
}

function asList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (isRecord(payload) && Array.isArray(payload.data)) return payload.data;
  return [];
}

export function mapHomeServices(payload: unknown): ServiceCardView[] {
  const rows = asList(payload);
  if (rows.length === 0) return [];

  const seen = new Set<string>();
  const items: ServiceCardView[] = [];

  for (const item of rows) {
    try {
      if (!isRecord(item)) continue;

      const slug = asString(item.slug);
      const title = stripHtml(asString(item.title));
      if (!slug || !title || seen.has(slug)) continue;
      seen.add(slug);

      let image = "";
      try {
        image = toAbsoluteStorageUrl(asString(item.image));
      } catch {
        image = "";
      }

      const category = asCategory(item.category);

      items.push({
        id: asId(item.id, slug),
        slug,
        title,
        description: stripHtml(asString(item.subtitle) ?? asString(item.description)),
        image,
        category: category.name,
        categorySlug: category.slug,
      });
    } catch {
      continue;
    }
  }

  return items;
}

export function mapServiceCategories(payload: unknown): ServiceCategoryView[] {
  const rows = asList(payload);
  if (rows.length === 0) return [];

  const seen = new Set<string>();
  const items: ServiceCategoryView[] = [];

  for (const item of rows) {
    try {
      if (!isRecord(item)) continue;
      const slug = asString(item.slug);
      const name = stripHtml(asString(item.name) ?? asString(item.title));
      if (!slug || !name || seen.has(slug)) continue;
      seen.add(slug);
      items.push({
        id: asId(item.id, slug),
        name,
        slug,
      });
    } catch {
      continue;
    }
  }

  return items;
}

async function fetchServices(limit: number): Promise<ServiceCardView[]> {
  try {
    const data = await apiClient.get<unknown>("services", {
      query: { limit, page: 1 },
      next: { tags: ["services"] },
    });
    return mapHomeServices(data);
  } catch {
    return [];
  }
}

export const getHomeServices = cache(async (): Promise<ServiceCardView[]> => {
  return fetchServices(HOME_SERVICES_LIMIT);
});

export const getServicesList = cache(async (): Promise<ServiceCardView[]> => {
  return fetchServices(PAGE_SERVICES_LIMIT);
});

export const getServiceCategories = cache(async (): Promise<ServiceCategoryView[]> => {
  try {
    const data = await apiClient.get<unknown>("service-categories", {
      next: { tags: ["service-categories"] },
    });
    return mapServiceCategories(data);
  } catch {
    return [];
  }
});

export const getServicesPageData = cache(async (): Promise<{
  services: ServiceCardView[];
  categories: ServiceCategoryView[];
}> => {
  try {
    const [services, categories] = await Promise.all([
      getServicesList(),
      getServiceCategories(),
    ]);
    return {
      services: Array.isArray(services) ? services : [],
      categories: Array.isArray(categories) ? categories : [],
    };
  } catch {
    return { services: [], categories: [] };
  }
});

function mediaUrl(value: unknown): string {
  try {
    return toAbsoluteStorageUrl(asString(value));
  } catch {
    return "";
  }
}

function mapTextCards(value: unknown): ServiceTextCardView[] {
  if (!Array.isArray(value)) return [];
  const items: ServiceTextCardView[] = [];
  for (const item of value) {
    try {
      if (!isRecord(item)) continue;
      const title = stripHtml(asString(item.title));
      if (!title) continue;
      items.push({
        title,
        description: stripHtml(asString(item.description)),
        icon: asString(item.icon) ?? "",
      });
    } catch {
      continue;
    }
  }
  return items;
}

function mapFacts(value: unknown): ServiceFactView[] {
  if (!Array.isArray(value)) return [];
  const items: ServiceFactView[] = [];
  for (const item of value) {
    try {
      if (!isRecord(item)) continue;
      const label = stripHtml(asString(item.title) ?? asString(item.label));
      const factValue = stripHtml(asString(item.value));
      if (!label || !factValue) continue;
      items.push({ label, value: factValue });
    } catch {
      continue;
    }
  }
  return items;
}

function mapProcess(value: unknown): ServiceProcessStepView[] {
  if (!Array.isArray(value)) return [];
  const items: ServiceProcessStepView[] = [];
  value.forEach((item, index) => {
    try {
      if (!isRecord(item)) return;
      const title = stripHtml(asString(item.title));
      if (!title) return;
      const serial =
        typeof item.serial_no === "number" && Number.isFinite(item.serial_no)
          ? item.serial_no
          : index + 1;
      items.push({
        step: String(serial).padStart(2, "0"),
        title,
        description: stripHtml(asString(item.description)),
      });
    } catch {
      /* skip */
    }
  });
  return items;
}

function mapFaqs(value: unknown): ServiceFaqView[] {
  if (!Array.isArray(value)) return [];
  const items: ServiceFaqView[] = [];
  for (const item of value) {
    try {
      if (!isRecord(item)) continue;
      const question = stripHtml(asString(item.question));
      const answer = stripHtml(asString(item.answer));
      if (!question || !answer) continue;
      items.push({ question, answer });
    } catch {
      continue;
    }
  }
  return items;
}

function mapEquipmentGroups(value: unknown): ServiceEquipmentGroupView[] {
  if (!Array.isArray(value)) return [];

  const groups = new Map<string, ServiceEquipmentGroupView["items"]>();
  for (const item of value) {
    try {
      if (!isRecord(item)) continue;
      const name = stripHtml(asString(item.name));
      if (!name) continue;
      const category = isRecord(item.category)
        ? stripHtml(asString(item.category.name)) || "Equipment"
        : "Equipment";
      const list = groups.get(category) ?? [];
      list.push({ name });
      groups.set(category, list);
    } catch {
      continue;
    }
  }

  return Array.from(groups.entries()).map(([category, items]) => ({ category, items }));
}

export function mapServiceDetail(payload: unknown): ServiceDetailData | null {
  try {
    if (!isRecord(payload)) return null;
    const slug = asString(payload.slug);
    const title = stripHtml(asString(payload.title));
    if (!slug || !title) return null;

    const category = asCategory(payload.category);
    const subtitle = stripHtml(asString(payload.subtitle));
    const paragraphs = toParagraphs(asString(payload.description));
    const processRaw = Array.isArray(payload.process_steps)
      ? payload.process_steps
      : payload.processSteps;

    const seoTitle = stripHtml(asString(payload.seo_title)) || title;
    const seoDescription =
      stripHtml(asString(payload.seo_description)) || subtitle || paragraphs[0] || "";

    return {
      id: asId(payload.id, slug),
      slug,
      title,
      description: subtitle,
      overview: paragraphs[0] ?? "",
      businessValue: paragraphs.slice(1).join(" "),
      image: mediaUrl(payload.image),
      category: category.name,
      categorySlug: category.slug,
      seoTitle,
      seoDescription,
      quickFacts: mapFacts(payload.highlights),
      keyBenefits: mapTextCards(payload.benefits),
      challenges: [],
      solution: [],
      process: mapProcess(processRaw),
      scope: mapTextCards(payload.scopes),
      capabilities: mapTextCards(payload.capabilities),
      equipmentGroups: mapEquipmentGroups(payload.equipments),
      faqs: mapFaqs(payload.ctas),
    };
  } catch {
    return null;
  }
}

export const getServiceDetail = cache(async (slug: string): Promise<ServiceDetailData | null> => {
  const safeSlug = slug?.trim();
  if (!safeSlug) return null;
  try {
    const data = await apiClient.get<unknown>(`service/${encodeURIComponent(safeSlug)}`, {
      next: { tags: ["services", `service-${safeSlug}`] },
    });
    return mapServiceDetail(data);
  } catch {
    return null;
  }
});

export const getRelatedServices = cache(async (
  slug: string,
  categorySlug?: string,
  limit = 4,
): Promise<ServiceCardView[]> => {
  try {
    const list = await getServicesList();
    const others = list.filter((item) => item.slug && item.slug !== slug);
    const same = categorySlug
      ? others.filter((item) => item.categorySlug === categorySlug)
      : [];
    const rest = others.filter((item) => item.categorySlug !== categorySlug);
    return [...same, ...rest].slice(0, limit);
  } catch {
    return [];
  }
});

export const getServiceDetailPageData = cache(async (slug: string) => {
  try {
    const service = await getServiceDetail(slug);
    if (!service) return { service: null, related: [] as ServiceCardView[] };
    const related = await getRelatedServices(service.slug, service.categorySlug, 4);
    return { service, related: Array.isArray(related) ? related : [] };
  } catch {
    return { service: null, related: [] as ServiceCardView[] };
  }
});

export const getServiceSlugs = cache(async (): Promise<string[]> => {
  try {
    const list = await getServicesList();
    return list.map((item) => item.slug).filter(Boolean);
  } catch {
    return [];
  }
});
