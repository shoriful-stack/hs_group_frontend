import { siteConfig } from "@/data/site";
import { newsArticles } from "@/data/news";

export default function NewsPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "News & Media", item: "/blog" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `News & Media | ${siteConfig.name}`,
        description: `Latest engineering news, press releases, project updates, and media from ${siteConfig.name}.`,
        url: "/blog",
      },
      {
        "@type": "ItemList",
        itemListElement: newsArticles.slice(0, 6).map((article, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "NewsArticle",
            headline: article.title,
            datePublished: article.date,
            author: { "@type": "Organization", name: article.author },
            image: article.image,
            url: `/blog/${article.slug}`,
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
