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
  category: string;
  logo?: string;
  brandColor?: string;
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
}
