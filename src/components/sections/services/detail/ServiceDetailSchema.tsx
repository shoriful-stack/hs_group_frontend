import { siteConfig } from "@/data/site";
import type { ServiceDetail } from "@/data/service-detail";

export default function ServiceDetailSchema({ service }: { service: ServiceDetail }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `/services/${service.slug}`,
          },
        ],
      },
      {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          email: siteConfig.email,
          telephone: siteConfig.phone,
        },
        areaServed: "Bangladesh",
        serviceType: service.category,
        url: `/services/${service.slug}`,
        image: service.image,
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
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
