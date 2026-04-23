'use client'

import { useContext } from 'react';
import { ModalContext } from './ModalContext';
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Map from "@/components/Map";
import ReviewsSection from "@/components/ReviewsSection";
import Image from "next/image";
import rotifyBg from '../assets/images/rotify.avif';

export default function Home() {
  const modalContext = useContext(ModalContext);
  const setIsModalOpen = modalContext?.setIsModalOpen || (() => {});

  return (
    <>
      {/* Hero Section - Full viewport with background */}
      <section className="relative min-h-[100dvh] z-0">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={rotifyBg}
            alt="Fresh vegetables background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <Hero />
      </section>

      {/* Info Boxes Section */}
      <section className="relative bg-zinc-950 py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <InfoBoxes onOpen={() => setIsModalOpen(true)}/>
        </div>
      </section>

      {/* Service Area / Map Section */}
      <section className="service-area bg-zinc-950 py-12 border-t border-white/5">
        <Map />
      </section>

      {/* Reviews/Testimonials Section */}
      <section className="bg-zinc-950 py-16 lg:py-24 border-t border-white/5">
        <ReviewsSection />
      </section>

      {/* Features/How It Works Section */}
      <section className="features bg-zinc-950">
        <Features />
      </section>
    </>
  );
}
