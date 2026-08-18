"use client";

import type { ServiceCardView, ServiceDetailData } from "@/types/home";
import ServiceDetailHero from "./ServiceDetailHero";
import {
  ServiceDetailBenefits,
  ServiceDetailCapabilities,
  // ServiceDetailChallengeSolution,
  ServiceDetailEquipment,
  ServiceDetailFaqs,
  ServiceDetailOverview,
  ServiceDetailProcess,
  ServiceDetailScope,
} from "./ServiceDetailStory";
import {
  ServiceDetailCTA,
  ServiceDetailRelatedServices,
  // ServiceDetailSidebar,
} from "./ServiceDetailSections";
// import ServiceDetailIndustriesSection from "./ServiceDetailIndustriesSection";

type Props = {
  service: ServiceDetailData;
  relatedServices: ServiceCardView[];
};

export default function ServiceDetailView({
  service,
  relatedServices,
}: Props) {
  const related = Array.isArray(relatedServices) ? relatedServices : [];

  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceDetailOverview service={service} />
      <ServiceDetailBenefits service={service} />
      <ServiceDetailCapabilities service={service} />
      <ServiceDetailScope service={service} />

      {/* API has no challenges / solution yet
      {showChallengeSolution ? (
        <div id="service-detail-body" className={`${SERVICES_BG_WHITE} ${SERVICES_SECTION_PAD}`}>
          <div className={SERVICES_INNER}>
            <div className={`grid xl:grid-cols-[minmax(0,1fr)_300px] ${SERVICES_GRID_GAP}`}>
              <div className="min-w-0">
                <ServiceDetailChallengeSolution service={service} embedded />
              </div>
              <div className="hidden xl:block">
                <div className="sticky top-28">
                  <ServiceDetailSidebar service={service} related={related} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      */}

      <ServiceDetailProcess service={service} />
      <ServiceDetailEquipment service={service} />
      <ServiceDetailFaqs service={service} />

      {/* API has no per-service industries yet
      <ServiceDetailIndustriesSection />
      */}

      <ServiceDetailRelatedServices services={related} />
      <ServiceDetailCTA />
    </>
  );
}
