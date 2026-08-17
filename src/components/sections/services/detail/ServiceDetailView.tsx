"use client";

import type { ServiceDetail } from "@/data/service-detail";
import type { PortfolioService } from "@/data/services-page";
import ServiceDetailHero from "./ServiceDetailHero";
import {
  ServiceDetailBenefits,
  ServiceDetailChallengeSolution,
  ServiceDetailOverview,
  ServiceDetailProcess,
} from "./ServiceDetailStory";
import {
  ServiceDetailCTA,
  ServiceDetailRelatedServices,
  ServiceDetailSidebar,
} from "./ServiceDetailSections";
import ServiceDetailIndustriesSection from "./ServiceDetailIndustriesSection";
import {
  SERVICES_BG_WHITE,
  SERVICES_GRID_GAP,
  SERVICES_INNER,
  SERVICES_SECTION_PAD,
} from "../constants";

type Props = {
  service: ServiceDetail;
  relatedServices: PortfolioService[];
};

export default function ServiceDetailView({
  service,
  relatedServices,
}: Props) {
  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceDetailOverview service={service} />
      <ServiceDetailBenefits service={service} />

      <div id="service-detail-body" className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`}>
        <div className={SERVICES_INNER}>
          <div className={`grid xl:grid-cols-[minmax(0,1fr)_300px] ${SERVICES_GRID_GAP}`}>
            <div className="min-w-0">
              <ServiceDetailChallengeSolution service={service} embedded />
            </div>
            <div className="hidden xl:block">
              <div className="sticky top-28">
                <ServiceDetailSidebar service={service} related={relatedServices} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceDetailProcess service={service} />
      <ServiceDetailIndustriesSection />
      <ServiceDetailRelatedServices services={relatedServices} />
      <ServiceDetailCTA />
    </>
  );
}
