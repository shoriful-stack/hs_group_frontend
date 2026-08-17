import { siteConfig } from "@/data/site";

export default function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact Us",
            item: "/contact",
          },
        ],
      },
      {
        "@type": "ContactPage",
        name: `Contact ${siteConfig.name}`,
        description: `Get in touch with ${siteConfig.name} for engineering consultations, quotes, and technical support.`,
        url: "/contact",
      },
      {
        "@type": "Organization",
        name: siteConfig.name,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: siteConfig.address,
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: siteConfig.phone,
            contactType: "customer service",
            email: siteConfig.email,
            availableLanguage: ["English", "Bengali"],
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
