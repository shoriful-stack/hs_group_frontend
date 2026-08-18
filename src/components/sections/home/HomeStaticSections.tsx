import HeroSlider from "@/components/sections/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TrustNetworkSection from "@/components/sections/TrustNetworkSection";
import {
  getHomeStaticData,
  mapAboutCollageImages,
  mapFeatureCards,
  mapHeroSlides,
  mapPartnerLogos,
  toParagraphs,
} from "@/services/homeService";

function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse bg-[#e8edf2] dark:bg-border ${className}`} />;
}

export function HeroSkeleton() {
  return (
    <section className="relative h-screen min-h-[520px] w-full overflow-hidden bg-[#0a1628]" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 z-10 pb-24 pl-4 sm:pb-32 sm:pl-8 lg:pb-36 lg:pl-12">
        <Pulse className="mb-4 h-12 w-2/3 max-w-xl rounded-lg bg-white/15" />
        <Pulse className="mb-6 h-16 w-1/2 max-w-md rounded-lg bg-white/10" />
        <Pulse className="h-4 w-full max-w-lg rounded bg-white/10" />
        <div className="mt-6 flex gap-3">
          <Pulse className="h-11 w-40 rounded-full bg-white/20" />
          <Pulse className="h-11 w-32 rounded-full bg-white/10" />
        </div>
      </div>
    </section>
  );
}

export function AboutSkeleton() {
  return (
    <section className="bg-[#f0f7fa] py-[88px] sm:py-[100px] lg:py-[112px] dark:bg-surface" aria-hidden>
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-[72px]">
          <div className="mx-auto w-full max-w-[610px] lg:mx-0">
            <div className="flex gap-5">
              <div className="flex w-[57.5%] flex-col gap-5">
                <Pulse className="h-[200px] rounded-[36px] sm:h-[230px] lg:h-[260px]" />
                <Pulse className="h-[200px] rounded-[36px] sm:h-[230px] lg:h-[260px]" />
              </div>
              <div className="flex w-[42.5%] flex-col justify-center gap-5 pt-5">
                <Pulse className="h-[165px] rounded-[36px] sm:h-[190px] lg:h-[210px]" />
                <Pulse className="h-[165px] rounded-[36px] sm:h-[190px] lg:h-[210px]" />
              </div>
            </div>
          </div>
          <div className="max-w-[540px]">
            <Pulse className="mb-4 h-3 w-24 rounded" />
            <Pulse className="mb-4 h-10 w-full rounded-lg" />
            <Pulse className="mb-3 h-10 w-4/5 rounded-lg" />
            <Pulse className="mb-3 h-4 w-full rounded" />
            <Pulse className="mb-3 h-4 w-full rounded" />
            <Pulse className="mb-8 h-4 w-3/4 rounded" />
            <div className="mb-9 grid grid-cols-2 gap-5 sm:grid-cols-4">
              <Pulse className="h-14 rounded-xl" />
              <Pulse className="h-14 rounded-xl" />
              <Pulse className="h-14 rounded-xl" />
              <Pulse className="h-14 rounded-xl" />
            </div>
            <Pulse className="h-12 w-52 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSkeleton() {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28 dark:bg-background" aria-hidden>
      <div className="container-wide px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center lg:mb-16">
          <Pulse className="mx-auto mb-4 h-3 w-40 rounded" />
          <Pulse className="mx-auto mb-5 h-10 w-3/4 rounded-lg" />
          <Pulse className="mx-auto h-4 w-full max-w-xl rounded" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {Array.from({ length: 3 }, (_, i) => (
            <Pulse key={i} className="min-h-[300px] rounded-[20px] sm:min-h-[320px] lg:min-h-[340px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function PartnersSkeleton() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafbfd] py-24 sm:py-28 lg:py-32 dark:bg-background" aria-hidden>
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto mb-14 max-w-4xl text-center lg:mb-16">
          <Pulse className="mx-auto mb-5 h-3 w-32 rounded" />
          <Pulse className="mx-auto mb-6 h-12 w-3/4 rounded-lg" />
          <Pulse className="mx-auto h-4 w-full max-w-2xl rounded" />
        </div>
        <div className="flex justify-center gap-4 sm:gap-5">
          {Array.from({ length: 6 }, (_, i) => (
            <Pulse key={i} className="h-[96px] w-[140px] shrink-0 rounded-[20px] sm:h-[104px] sm:w-[160px]" />
          ))}
        </div>
      </div>
    </section>
  );
}

export async function HomeStaticHero() {
  const data = await getHomeStaticData();
  return <HeroSlider slides={mapHeroSlides(data.hero)} />;
}

export async function HomeStaticAbout() {
  try {
    const data = await getHomeStaticData();
    const about = data?.about_stats;

    return (
      <AboutSection
        title={about?.title}
        paragraphs={toParagraphs(about?.content)}
        images={mapAboutCollageImages(about)}
        stats={Array.isArray(about?.stats) ? about.stats : []}
      />
    );
  } catch {
    return null;
  }
}

export async function HomeStaticFeatures() {
  const data = await getHomeStaticData();
  return <WhyChooseUs cards={mapFeatureCards(data.features)} />;
}

export async function HomeStaticPartners() {
  try {
    const data = await getHomeStaticData();
    return <TrustNetworkSection logos={mapPartnerLogos(data?.partners)} />;
  } catch {
    return null;
  }
}
