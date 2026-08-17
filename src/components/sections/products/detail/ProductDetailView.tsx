"use client";

import type { ProductDetail } from "@/data/product-detail";
import type { PortfolioProduct } from "@/data/products-page";
import type { PortfolioProject } from "@/data/projects-page";
import ProductDetailHero from "./ProductDetailHero";
import {
  ProductDetailApplications,
  ProductDetailGalleryFeatures,
  ProductDetailOverview,
} from "./ProductDetailStory";
import {
  ProductDetailCTA,
  ProductDetailDownloads,
  ProductDetailFaq,
  ProductDetailRelated,
  ProductDetailSidebar,
  ProductDetailSpecs,
  ProductDetailVariants,
} from "./ProductDetailSections";
import {
  ProductDetailInquiryBar,
  ProductDetailProjectProof,
} from "./ProductDetailEnterprise";
import {
  PRODUCTS_BG_SURFACE,
  PRODUCTS_GRID_GAP,
  PRODUCTS_INNER,
  PRODUCTS_SECTION_PAD,
} from "../constants";

type Props = {
  product: ProductDetail;
  relatedProducts: PortfolioProduct[];
  relatedProjects: PortfolioProject[];
};

export default function ProductDetailView({
  product,
  relatedProducts,
  relatedProjects,
}: Props) {
  return (
    <>
      <ProductDetailHero product={product} />
      <ProductDetailOverview product={product} />
      <ProductDetailGalleryFeatures product={product} />
      <ProductDetailApplications product={product} />

      <div id="technical" className={`${PRODUCTS_BG_SURFACE} ${PRODUCTS_SECTION_PAD}`}>
        <div className={PRODUCTS_INNER}>
          <div className={`grid xl:grid-cols-[minmax(0,1fr)_300px] ${PRODUCTS_GRID_GAP}`}>
            <div className="min-w-0 space-y-12 lg:space-y-16">
              <ProductDetailSpecs product={product} embedded />
              <ProductDetailVariants product={product} embedded />
              <ProductDetailDownloads product={product} embedded />
            </div>
            <div className="hidden xl:block">
              <div className="sticky top-28">
                <ProductDetailSidebar product={product} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailFaq product={product} />
      <ProductDetailProjectProof projects={relatedProjects} />
      <ProductDetailRelated products={relatedProducts} />
      <ProductDetailCTA product={product} />
      <ProductDetailInquiryBar product={product} />
      <div className="h-20 xl:hidden" aria-hidden />
    </>
  );
}
