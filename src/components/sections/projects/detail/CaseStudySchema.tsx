import { siteConfig } from "@/data/site";
import type { ProjectCaseStudy } from "@/data/project-case-study";

export default function CaseStudySchema({ study }: { study: ProjectCaseStudy }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Projects", item: "/projects" },
          {
            "@type": "ListItem",
            position: 3,
            name: study.title,
            item: `/projects/${study.slug}`,
          },
        ],
      },
      {
        "@type": "CaseStudy",
        name: study.title,
        description: study.description,
        image: study.image,
        about: study.industry,
        author: { "@type": "Organization", name: siteConfig.name },
        creator: { "@type": "Organization", name: siteConfig.name },
        datePublished: `${study.year}-01-01`,
        keywords: study.technologies.join(", "),
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
