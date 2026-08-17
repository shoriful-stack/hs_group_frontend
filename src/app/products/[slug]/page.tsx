import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSkipLink from "@/components/sections/about/AboutSkipLink";
import ProductDetailSchema from "@/components/sections/products/detail/ProductDetailSchema";
import ProductDetailView from "@/components/sections/products/detail/ProductDetailView";
import {
  getAllProductSlugs,
  getProductDetailBySlug,
  getRelatedProducts,
  getRelatedProjectsForProduct,
} from "@/data/product-detail";
import { siteConfig } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductDetailBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.title} | ${siteConfig.name}`,
      description: product.description,
      type: "website",
      images: [{ url: product.image, alt: product.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | ${siteConfig.name}`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductDetailBySlug(slug);
  if (!product) notFound();

  const relatedProducts = getRelatedProducts(slug, 6);
  const relatedProjects = getRelatedProjectsForProduct(slug, 4);

  return (
    <>
      <ProductDetailSchema product={product} />
      <AboutSkipLink />
      <Header />
      <main
        id="main-content"
        tabIndex={-1}
        className="about-scroll-padding overflow-x-clip outline-none"
      >
        <ProductDetailView
          product={product}
          relatedProducts={relatedProducts}
          relatedProjects={relatedProjects}
        />
      </main>
      <Footer />
    </>
  );
}
