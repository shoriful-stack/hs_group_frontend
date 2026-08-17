import { siteConfig } from "@/data/site";
import { portfolioProjects } from "@/data/projects-page";

export default function ProjectsPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Projects", item: "/projects" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `Projects | ${siteConfig.name}`,
        description: `Engineering project portfolio from ${siteConfig.name} across power, telecom, renewable energy, and infrastructure.`,
        url: "/projects",
      },
      {
        "@type": "ItemList",
        itemListElement: portfolioProjects.slice(0, 8).map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            image: project.image,
            url: `/projects/${project.slug}`,
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
