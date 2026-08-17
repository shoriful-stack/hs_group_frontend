import { siteConfig } from "@/data/site";
import type { ArticleDetail } from "@/data/news-article-detail";

type Props = { article: ArticleDetail };

export default function NewsDetailSchema({ article }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "News & Media", item: "/blog" },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `/blog/${article.slug}`,
          },
        ],
      },
      {
        "@type": "NewsArticle",
        headline: article.title,
        description: article.excerpt,
        image: [article.image],
        datePublished: article.date,
        dateModified: article.updatedDate,
        wordCount: article.wordCount,
        articleSection: article.category,
        keywords: article.tags.join(", "),
        author: {
          "@type": "Person",
          name: article.authorProfile.name,
          jobTitle: article.authorProfile.designation,
          email: article.authorProfile.email,
          worksFor: { "@type": "Organization", name: siteConfig.name },
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          email: siteConfig.email,
          telephone: siteConfig.phone,
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `/blog/${article.slug}`,
        },
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
