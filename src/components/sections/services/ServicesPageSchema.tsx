import { siteConfig } from "@/data/site";
import type { ServiceCardView } from "@/types/home";

export default function ServicesPageSchema({
  services = [],
}: {
  services?: ServiceCardView[];
}) {
  const items = Array.isArray(services) ? services : [];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `Services | ${siteConfig.name}`,
        description: `Engineering services from ${siteConfig.name} across power, telecom, renewable energy, civil, and smart infrastructure.`,
        url: "/services",
      },
      {
        "@type": "ItemList",
        itemListElement: items.map((service, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: service.title,
            description: service.description,
            provider: { "@type": "Organization", name: siteConfig.name },
            url: `/services/${service.slug}`,
          },
        })),
      },
      {
        "@type": "Organization",
        name: siteConfig.name,
        description: siteConfig.description,
        email: siteConfig.email,
        telephone: siteConfig.phone,
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
