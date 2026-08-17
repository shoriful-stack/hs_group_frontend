import { siteConfig } from "@/data/site";
import type { ProductDetail } from "@/data/product-detail";

export default function ProductDetailSchema({ product }: { product: ProductDetail }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "/" },
          { "@type": "ListItem", position: 2, name: "Products", item: "/products" },
          { "@type": "ListItem", position: 3, name: product.category, item: `/products#${product.category}` },
          { "@type": "ListItem", position: 4, name: product.title, item: `/products/${product.slug}` },
        ],
      },
      {
        "@type": "Product",
        name: product.title,
        description: product.description,
        image: product.image,
        sku: product.modelNumber,
        brand: { "@type": "Brand", name: product.brand },
        category: product.category,
        url: `/products/${product.slug}`,
        manufacturer: { "@type": "Organization", name: siteConfig.name },
      },
      {
        "@type": "FAQPage",
        mainEntity: product.faqs.map((faq) => ({
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
