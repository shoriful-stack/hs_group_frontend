"use client";

import type { ProjectCaseStudy } from "@/data/project-case-study";
import type { PortfolioProject } from "@/data/projects-page";
import CaseStudyProgress from "./CaseStudyProgress";
import CaseStudyHero from "./CaseStudyHero";
import { CaseStudyOverview, CaseStudyStats, CaseStudyStory } from "./CaseStudyStory";
import {
  CaseStudyAwards,
  CaseStudyGallery,
  CaseStudyProcess,
  CaseStudyScope,
} from "./CaseStudyDelivery";
import { CaseStudyRelatedProjects } from "./CaseStudyEngage";
import CaseStudySidebar from "./CaseStudySidebar";
import CaseStudyCTA from "./CaseStudyCTA";
import {
  PROJECTS_BG_WHITE,
  PROJECTS_GRID_GAP,
  PROJECTS_INNER,
  PROJECTS_SECTION_PAD,
} from "../constants";

type Props = {
  study: ProjectCaseStudy;
  relatedProjects: PortfolioProject[];
};

export default function CaseStudyView({ study, relatedProjects }: Props) {
  return (
    <>
      <CaseStudyProgress />
      <CaseStudyHero study={study} />
      <CaseStudyOverview study={study} />
      <CaseStudyStats study={study} />

      <div
        id="case-study-body"
        className={`${PROJECTS_BG_WHITE} ${PROJECTS_SECTION_PAD}`}
      >
        <div className={PROJECTS_INNER}>
          <div className={`grid xl:grid-cols-[minmax(0,1fr)_300px] ${PROJECTS_GRID_GAP}`}>
            <div className="min-w-0">
              <CaseStudyStory study={study} embedded />
            </div>
            <div className="hidden xl:block">
              <div className="sticky top-28">
                <CaseStudySidebar study={study} related={relatedProjects} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CaseStudyScope study={study} />
      <CaseStudyProcess study={study} />
      <CaseStudyGallery study={study} />
      <CaseStudyAwards study={study} />
      <CaseStudyRelatedProjects items={relatedProjects} />
      <CaseStudyCTA />
    </>
  );
}
