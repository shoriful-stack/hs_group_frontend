import { siteConfig } from "@/data/site";
import type { ServiceDetailData } from "@/types/home";

export default function ServiceDetailSchema({ service }: { service: ServiceDetailData }) {
  const faqs = Array.isArray(service.faqs) ? service.faqs : [];

  const graph: Record<string, unknown>[] = [
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
      description: service.seoDescription || service.description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        email: siteConfig.email,
        telephone: siteConfig.phone,
      },
      areaServed: "Bangladesh",
      ...(service.category ? { serviceType: service.category } : {}),
      url: `/services/${service.slug}`,
      ...(service.image ? { image: service.image } : {}),
    },
  ];

  if (faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  graph.push({
    "@type": "Organization",
    name: siteConfig.name,
    description: siteConfig.description,
    email: siteConfig.email,
    telephone: siteConfig.phone,
  });

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
