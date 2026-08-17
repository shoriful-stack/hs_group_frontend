"use client";

import type { CareerDetail } from "@/data/career-detail";
import type { CareerJob } from "@/data/careers-page";
import CareerDetailBoard from "./CareerDetailBoard";
import CareerDetailHero from "./CareerDetailHero";
import CareerDetailPrevNext from "./CareerDetailPrevNext";
import { CareerDetailCTA, CareerDetailRelated } from "./CareerDetailSections";

type Props = {
  job: CareerDetail;
  related: CareerJob[];
  prev: CareerJob | null;
  next: CareerJob | null;
};

export default function CareerDetailView({ job, related, prev, next }: Props) {
  return (
    <>
      <CareerDetailHero job={job} />
      <CareerDetailBoard job={job} />
      <CareerDetailRelated jobs={related} />
      <CareerDetailCTA job={job} />
      <CareerDetailPrevNext prev={prev} next={next} />
    </>
  );
}
