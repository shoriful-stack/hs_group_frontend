import { siteConfig } from "@/data/site";
import { careerJobs } from "@/data/careers-page";

export default function CareersPageSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Careers | ${siteConfig.name}`,
    description: `Career opportunities at ${siteConfig.name}.`,
    url: `${typeof process !== "undefined" ? "" : ""}/careers`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: careerJobs.map((job, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `/careers/${job.slug}`,
        name: job.title,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
