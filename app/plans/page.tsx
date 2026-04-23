"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import meals from "@/Meals";
import MealCard from "@/components/MealCard";
import { gsap } from "gsap";
import thaliImage from "@/assets/images/thali.webp";
import breakfastImg from "@/assets/images/morning.jpg";
import lunchImg from "@/assets/images/noon.webp";
import dinnerImg from "@/assets/images/night.avif";

const PlansPage = () => {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      // Set initial states
      gsap.set([titleRef.current, subtitleRef.current], {
        y: 40,
        opacity: 0,
      });

      gsap.set(cardsRef.current ? Array.from(cardsRef.current.querySelectorAll(".meal-column")) : [], {
        y: 60,
        opacity: 0,
        scale: 0.95,
      });

      // Staggered reveal - title → subtitle → columns
      tl.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.7,
      })
        .to(
          subtitleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(
          cardsRef.current ? Array.from(cardsRef.current.querySelectorAll(".meal-column")) : [],
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.3"
        );

      // Floating animation for the hero image card
      gsap.to(imageRef.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-[100dvh] bg-zinc-950">
      {/* Hero Section with background */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center overflow-hidden pt-24 pb-16 md:pt-28 md:pb-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#971303]/10 via-zinc-950 to-zinc-950" />

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FCDF59]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF000D]/5 rounded-full blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
            {/* Eyebrow tag */}
            <div ref={headerRef} className="inline-flex items-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 text-[#FCDF59] text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm">
                Meal Plans
              </span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-[#FCDF59] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight"
              style={{ fontFamily: "NeueMachina, serif" }}
            >
              Choose Your
              <br />
              <span className="inline-block mt-2">
                Perfect Plan
              </span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="mt-6 text-[#FCDF59]/70 text-base md:text-lg lg:text-xl uppercase tracking-wide max-w-xl"
              style={{ fontFamily: "29LT, serif" }}
            >
              Flexible meal plans designed for your lifestyle.
              Mix and match breakfast, lunch, and dinner —
              all freshly prepared and delivered daily.
            </p>
            </div>

            {/* Hero Image — Premium Floating Card */}
            <div className="hidden lg:flex justify-center items-center">
              <div ref={imageRef} className="relative w-full max-w-md aspect-square">
                {/* Ambient glow */}
                <div className="absolute -inset-8 bg-gradient-to-br from-[#FCDF59]/15 via-[#FF000D]/10 to-[#971303]/15 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '4s' }} />

                {/* Back card — depth layer */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF000D]/20 to-[#971303]/10 transform rotate-6 scale-95 translate-x-4 translate-y-4" />

                {/* Middle card — depth layer */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF000D]/30 to-[#971303]/20 transform rotate-3 translate-x-2 translate-y-2" style={{ scale: '0.97' }} />

                {/* Main card — Double bezel with food collage */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF000D]/40 to-[#971303]/30 backdrop-blur-xl border border-[#FCDF59]/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] z-10 pointer-events-none" />

                  {/* Food images grid */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                    {/* Breakfast — Top Left */}
                    <div className="relative rounded-tl-[1.8rem] rounded-br-lg overflow-hidden">
                      <Image src={breakfastImg} alt="Breakfast" fill className="object-cover" sizes="25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    {/* Lunch — Top Right */}
                    <div className="relative rounded-tr-[1.8rem] rounded-bl-lg overflow-hidden">
                      <Image src={lunchImg} alt="Lunch" fill className="object-cover" sizes="25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    {/* Dinner — Bottom Left */}
                    <div className="relative rounded-bl-[1.8rem] rounded-tr-lg overflow-hidden">
                      <Image src={dinnerImg} alt="Dinner" fill className="object-cover" sizes="25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    {/* Thali — Bottom Right */}
                    <div className="relative rounded-br-[1.8rem] rounded-tl-lg overflow-hidden">
                      <Image src={thaliImage} alt="Traditional Indian thali" fill className="object-cover scale-125" style={{ objectPosition: 'center 30%' }} sizes="25vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>

                  {/* Center glass overlay */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center px-5 py-4 bg-black/40 backdrop-blur-md rounded-2xl border border-[#FCDF59]/20 shadow-2xl">
                      <div className="text-3xl font-bold text-[#FCDF59] mb-0.5" style={{ fontFamily: 'NeueMachina, serif' }}>
                        3 MEALS
                      </div>
                      <div className="text-sm text-[#FCDF59]/90 uppercase tracking-widest" style={{ fontFamily: '29LT, serif' }}>
                        Daily Delivered
                      </div>
                    </div>
                  </div>

                  {/* Corner labels */}
                  <div className="absolute top-3 left-3 z-20 px-2 py-1 rounded-full bg-[#FCDF59]/90 text-[#971303] text-[10px] font-bold uppercase tracking-wider">
                    Breakfast
                  </div>
                  <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-full bg-[#FCDF59]/90 text-[#971303] text-[10px] font-bold uppercase tracking-wider">
                    Lunch
                  </div>
                  <div className="absolute bottom-3 left-3 z-20 px-2 py-1 rounded-full bg-[#FCDF59]/90 text-[#971303] text-[10px] font-bold uppercase tracking-wider">
                    Dinner
                  </div>
                  <div className="absolute bottom-3 right-3 z-20 px-2 py-1 rounded-full bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider">
                    Fresh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none" />
      </section>

      {/* Meal Cards Section */}
      <section className="relative py-12 md:py-16">
        {/* Background gradient spanning all columns */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCDF59]/5 via-transparent to-transparent pointer-events-none" />

        <div ref={cardsRef} className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Grid layout: 3 columns on desktop, stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {meals.map((meal, index) => (
              <div
                key={meal.name}
                className="meal-column"
                style={{ "--column-index": index } as React.CSSProperties}
              >
                <MealCard key={meal.name} details={meal} variant="compact" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlansPage;
