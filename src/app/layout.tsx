import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProvider from "@/providers/ThemeProvider";
import { SiteSettingsProvider } from "@/providers/SiteSettingsProvider";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import AnalyticsScripts from "@/components/analytics/AnalyticsScripts";
import AnalyticsProvider from "@/components/analytics/AnalyticsProvider";
import { siteConfig } from "@/data/site";
import { EMPTY_SITE_SETTINGS, getSiteSettings } from "@/services/homeService";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function metadataBaseUrl(): URL {
  try {
    return new URL(siteConfig.url);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSiteSettings();
    const name = settings.title || "HS Group";
    const title = settings.title ? `${settings.title} | ${siteConfig.tagline}` : name;
    const description = settings.description || undefined;
    const image = settings.logoHeader || settings.favicon || undefined;

    return {
      metadataBase: metadataBaseUrl(),
      title: {
        default: title,
        template: `%s | ${name}`,
      },
      description,
      keywords: settings.keywords?.length ? settings.keywords : undefined,
      authors: settings.title ? [{ name: settings.title }] : undefined,
      creator: settings.title || undefined,
      publisher: settings.title || undefined,
      alternates: { canonical: "/" },
      openGraph: {
        type: "website",
        locale: "en_US",
        url: siteConfig.url,
        siteName: name,
        title,
        description,
        ...(image ? { images: [{ url: image, alt: name }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(image ? { images: [image] } : {}),
      },
      robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
      },
      ...(settings.favicon
        ? { icons: { icon: settings.favicon, apple: settings.favicon } }
        : { icons: { icon: "/images/logo.png", apple: "/images/logo.png" } }),
    };
  } catch {
    return {
      metadataBase: metadataBaseUrl(),
      title: "HS Group",
    };
  }
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1729" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = EMPTY_SITE_SETTINGS;
  try {
    settings = { ...EMPTY_SITE_SETTINGS, ...(await getSiteSettings()) };
  } catch {
    settings = EMPTY_SITE_SETTINGS;
  }

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.title || "HS Group",
    url: siteConfig.url,
    ...(settings.logoHeader ? { logo: settings.logoHeader } : {}),
    ...(settings.description ? { description: settings.description } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.social?.length ? { sameAs: settings.social.map((item) => item.href) } : {}),
  };

  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <AnalyticsScripts />
        <div id="app-shell">
          <ThemeProvider>
            <SiteSettingsProvider settings={settings}>
              <SmoothScrollProvider>
                <AnalyticsProvider />
                {children}
              </SmoothScrollProvider>
            </SiteSettingsProvider>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
