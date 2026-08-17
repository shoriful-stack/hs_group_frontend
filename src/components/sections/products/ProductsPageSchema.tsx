import { siteConfig } from "@/data/site";
import { portfolioProducts } from "@/data/products-page";

export default function ProductsPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `Products | ${siteConfig.name}`,
        description: `Engineering product portfolio from ${siteConfig.name} for power, telecom, renewable, and smart infrastructure applications.`,
        url: "/products",
      },
      {
        "@type": "ItemList",
        itemListElement: portfolioProducts.slice(0, 8).map((product, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.image,
            brand: { "@type": "Brand", name: product.brand },
            category: product.category,
            url: `/products#${product.id}`,
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
