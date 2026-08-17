import { siteConfig } from "@/data/site";
import type { CareerDetail } from "@/data/career-detail";

export default function CareerDetailSchema({ job }: { job: CareerDetail }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.overview,
    datePosted: job.posted,
    validThrough: `${job.applicationDeadline}T23:59:59+06:00`,
    totalJobOpenings: job.vacancy,
    employmentType: job.type.toUpperCase().replace("-", "_"),
    educationRequirements: job.educationalQualifications.join(" "),
    experienceRequirements: job.experienceDetails.join(" "),
    responsibilities: job.responsibilities.join(" "),
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.name,
      sameAs: "/",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "BD",
      },
    },
    url: `/careers/${job.slug}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
