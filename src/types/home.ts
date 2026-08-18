export interface HeroItem {
  id: number;
  title: string | null;
  content: string | null;
  sub_title: string | null;
  sub_content: string | null;
  image: string | null;
  url: string | null;
  video: string | null;
  serial_no: number;
}

export interface AboutStatItem {
  id: number;
  title: string;
  value: string;
  serial_no: number;
}

export interface AboutStats {
  title: string | null;
  content: string | null;
  image: string | null;
  images: string[];
  stats: AboutStatItem[];
}

export interface FeatureItem {
  icon: string | null;
  title: string;
  short_description: string | null;
  image: string | null;
}

export interface PartnerLogo {
  id: number;
  name: string;
  logo: string | null;
  content: string | null;
}

export interface GeneralSettings {
  id?: number;
  title: string | null;
  favicon: string | null;
  logo_header: string | null;
  logo_footer: string | null;
  description: string | null;
  keywords: string | null;
}

export interface ContactInfo {
  id?: number;
  address: string | null;
  primary_phone: string | null;
  secondary_phone: string | null;
  primary_email: string | null;
  secondary_email: string | null;
  whatsapp_number: string | null;
}

export interface SocialLink {
  id: number;
  icon: string | null;
  link: string | null;
}

export interface HomeStaticDataResponse {
  hero: HeroItem[];
  about_stats: AboutStats;
  features: FeatureItem[];
  partners: PartnerLogo[];
  general_settings: GeneralSettings;
  contact_us: ContactInfo;
  social_links: SocialLink[];
}

export type HomeStaticData = HomeStaticDataResponse;

export interface NavLinkItem {
  id: number;
  name: string;
  slug: string;
  href: string;
}

export interface LayoutNavigation {
  latest_products: Array<{ id: number; title: string; slug: string }>;
  product_categories: Array<{ id: number; name: string; slug: string }>;
  service_categories: Array<{ id: number; name: string; slug: string }>;
}

export interface LayoutDataResponse {
  general_settings: GeneralSettings | null;
  contact_us: ContactInfo | null;
  social_links: SocialLink[];
  navigation: LayoutNavigation;
}

export interface HeroSlideView {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  url?: string | null;
  video?: string;
}

export type FeatureCardView =
  | { type: "text"; title: string; description: string }
  | { type: "image"; image: string; alt: string };

export interface PartnerLogoView {
  name: string;
  category?: string;
  logo?: string;
  brandColor?: string;
}

export interface ServiceCardView {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  category: string;
  categorySlug: string;
}

export interface ServiceCategoryView {
  id: string;
  name: string;
  slug: string;
}

export interface ServiceFactView {
  label: string;
  value: string;
}

export interface ServiceTextCardView {
  title: string;
  description: string;
  icon: string;
}

export interface ServiceProcessStepView {
  step: string;
  title: string;
  description: string;
}

export interface ServiceSolutionBlockView {
  title: string;
  text: string;
}

export interface ServiceFaqView {
  question: string;
  answer: string;
}

export interface ServiceEquipmentItemView {
  name: string;
}

export interface ServiceEquipmentGroupView {
  category: string;
  items: ServiceEquipmentItemView[];
}

export interface ServiceDetailData {
  id: string;
  slug: string;
  title: string;
  description: string;
  overview: string;
  businessValue: string;
  image: string;
  category: string;
  categorySlug: string;
  seoTitle: string;
  seoDescription: string;
  quickFacts: ServiceFactView[];
  keyBenefits: ServiceTextCardView[];
  challenges: ServiceTextCardView[];
  solution: ServiceSolutionBlockView[];
  process: ServiceProcessStepView[];
  scope: ServiceTextCardView[];
  capabilities: ServiceTextCardView[];
  equipmentGroups: ServiceEquipmentGroupView[];
  faqs: ServiceFaqView[];
}

export interface SocialLinkView {
  label: string;
  href: string;
  icon: string;
}

export interface SiteSettingsView {
  title: string;
  description: string;
  keywords: string[];
  favicon: string | null;
  logoHeader: string | null;
  logoFooter: string | null;
  phone: string;
  email: string;
  address: string;
  social: SocialLinkView[];
  latestProducts: NavLinkItem[];
  productCategories: NavLinkItem[];
  serviceCategories: NavLinkItem[];
}
