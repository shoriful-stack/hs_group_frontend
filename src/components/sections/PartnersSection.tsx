"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import SectionHeading from "@/components/ui/SectionHeading";
import { partners } from "@/data/site";

import "swiper/css";
import "swiper/css/free-mode";

export default function PartnersSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <section className="section-padding relative overflow-hidden bg-surface transition-colors duration-300">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="container-wide relative">
        <SectionHeading
          label="Our Partners"
          title="Trusted by Industry Leaders"
          description="We collaborate with world-renowned manufacturers and technology providers to deliver best-in-class solutions."
          align="center"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {!mounted ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {partners.slice(0, 6).map((partner) => (
                <div
                  key={partner.name}
                  className="card-surface flex h-24 items-center justify-center p-6"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={160}
                    height={64}
                    className="h-10 w-auto object-contain opacity-60"
                  />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Autoplay, FreeMode]}
              slidesPerView={2}
              spaceBetween={24}
              freeMode
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
              }}
              className="!overflow-visible"
            >
              {partners.map((partner) => (
                <SwiperSlide key={partner.name}>
                  <div className="group card-surface flex h-24 items-center justify-center p-6 transition-all duration-500 hover:border-engineering/30 hover:shadow-md">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={160}
                      height={64}
                      className="h-10 w-auto object-contain opacity-60 transition-opacity group-hover:opacity-100"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </section>
  );
}
