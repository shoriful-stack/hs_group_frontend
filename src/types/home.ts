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

export interface HomeStaticDataResponse {
  hero: HeroItem[];
  about_stats: AboutStats;
  features: FeatureItem[];
  partners: PartnerLogo[];
}

export type HomeStaticData = HomeStaticDataResponse;

export interface HeroSlideView {
  id: number;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  url?: string | null;
  video?: string;
  videoLabel?: string;
  heroContent?: {
    headline: string[];
    subtitle: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
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
