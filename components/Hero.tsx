"use client";

import { useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowUpRight } from "lucide-react";
import { ModalContext } from "@/app/ModalContext";

// Import food images
import breakfast from "@/assets/images/morning.jpg";
import lunch from "@/assets/images/noon.webp";
import dinner from "@/assets/images/night.avif";
import thali from "@/assets/images/thali.webp";

const Hero = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useContext must be used within a ModalProvider');
  const { setIsModalOpen } = context;
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const ctaRef = useRef(null);
  const decorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entry animation timeline
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 0.8,
        },
      });

      // Set initial states
      gsap.set([eyebrowRef.current, headlineRef.current, subheadRef.current, ctaRef.current], {
        y: 40,
        opacity: 0,
      });

      gsap.set(decorRef.current, {
        scale: 0.8,
        opacity: 0,
        rotate: -5,
      });

      // Orchestrated reveal sequence
      tl.to(eyebrowRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
      })
        .to(
          headlineRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
          },
          "-=0.3"
        )
        .to(
          subheadRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
          },
          "-=0.5"
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.4"
        )
        .to(
          decorRef.current,
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=0.8"
        );

      // Continuous floating animation for decorative element
      gsap.to(decorRef.current, {
        y: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={containerRef}
      className="min-h-[100dvh] relative flex items-center overflow-hidden"
    >
      {/* Asymmetric Content Grid - Editorial Layout */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left Content - 7 columns */}
          <div className="lg:col-span-7 relative z-20 pt-20 lg:pt-0">
            {/* Eyebrow Tag */}
            <div
              ref={eyebrowRef}
              className="inline-flex items-center mb-6"
            >
              <span className="px-4 py-1.5 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 text-[#FCDF59] text-[10px] uppercase tracking-[0.2em] font-medium backdrop-blur-sm">
                Homemade Tiffin Service
              </span>
            </div>

            {/* Headline - Asymmetric sizing */}
            <h1
              ref={headlineRef}
              className="text-[#FCDF59] font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] leading-[0.95] tracking-tight"
              style={{ fontFamily: "NeueMachina, serif" }}
            >
              <span className="block">Your search for</span>
              <span className="block mt-2">
                <span className="relative inline-block">
                  Home-cooked
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-[#FCDF59]/30"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 8 Q50 0 100 8 T200 8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="block mt-2">food ends here.</span>
            </h1>

            {/* Subhead */}
            <p
              ref={subheadRef}
              className="mt-8 text-[#FCDF59]/80 text-lg md:text-xl lg:text-[22px] uppercase tracking-wide max-w-md"
              style={{ fontFamily: "29LT, serif" }}
            >
              Just tell us where and when — we&apos;ll handle the rest with fresh,
              authentic meals delivered daily.
            </p>

            {/* CTA Button - Double Bezel Architecture */}
            <div ref={ctaRef} className="mt-10">
              {/* Outer Shell */}
              <div
                className="inline-block p-1.5 rounded-full bg-[#FCDF59]/5 ring-1 ring-[#FCDF59]/10"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                {/* Inner Core */}
                <button
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#971303] to-[#FF000D] text-[#FCDF59] font-medium text-sm uppercase tracking-wider overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
                  onClick={() => setIsModalOpen(true)}
                >
                  {/* Hover fill overlay */}
                  <span className="absolute inset-0 bg-[#FCDF59] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />

                  {/* Content */}
                  <span className="relative flex items-center gap-3">
                    <span className="group-hover:text-[#971303] transition-colors duration-500">
                      Schedule Your Meal
                    </span>

                    {/* Button-in-Button Trailing Icon */}
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#FCDF59]/10 group-hover:bg-[#971303]/10 transition-colors duration-500">
                      <ArrowUpRight
                        className="w-4 h-4 group-hover:text-[#971303] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                        strokeWidth={2}
                      />
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* Stats Row - Minimalist data display */}
            <div className="mt-12 flex items-center gap-8 lg:gap-12">
              <div className="flex flex-col">
                <span
                  className="text-3xl md:text-4xl font-bold text-[#FCDF59] tracking-tight"
                  style={{ fontFamily: "NeueMachina, serif" }}
                >
                  500+
                </span>
                <span className="text-xs uppercase tracking-wider text-[#FCDF59]/50 mt-1">
                  Happy Customers
                </span>
              </div>
              <div className="w-px h-12 bg-[#FCDF59]/20" />
              <div className="flex flex-col">
                <span
                  className="text-3xl md:text-4xl font-bold text-[#FCDF59] tracking-tight"
                  style={{ fontFamily: "NeueMachina, serif" }}
                >
                  4.9
                </span>
                <span className="text-xs uppercase tracking-wider text-[#FCDF59]/50 mt-1">
                  Average Rating
                </span>
              </div>
              <div className="w-px h-12 bg-[#FCDF59]/20 hidden sm:block" />
              <div className="flex flex-col hidden sm:flex">
                <span
                  className="text-3xl md:text-4xl font-bold text-[#FCDF59] tracking-tight"
                  style={{ fontFamily: "NeueMachina, serif" }}
                >
                  Meerut
                </span>
                <span className="text-xs uppercase tracking-wider text-[#FCDF59]/50 mt-1">
                  Service Area
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - 5 columns - Decorative Element */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div
              ref={decorRef}
              className="relative"
            >
              {/* Floating Card Stack Effect */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Back card */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF000D]/20 to-[#971303]/10 transform rotate-6 scale-95 translate-x-4 translate-y-4" />

                {/* Middle card */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF000D]/30 to-[#971303]/20 transform rotate-3 scale-97 translate-x-2 translate-y-2" />

                {/* Main card - Liquid Glass with Food Collage */}
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#FF000D]/40 to-[#971303]/30 backdrop-blur-xl border border-[#FCDF59]/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] z-10 pointer-events-none" />

                  {/* Food Images Grid */}
                  <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
                    {/* Breakfast - Top Left */}
                    <div className="relative rounded-tl-[1.8rem] rounded-br-lg overflow-hidden">
                      <Image
                        src={breakfast}
                        alt="Delicious homemade breakfast"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Lunch - Top Right */}
                    <div className="relative rounded-tr-[1.8rem] rounded-bl-lg overflow-hidden">
                      <Image
                        src={lunch}
                        alt="Authentic Central Indian thali"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Dinner - Bottom Left */}
                    <div className="relative rounded-bl-[1.8rem] rounded-tr-lg overflow-hidden">
                      <Image
                        src={dinner}
                        alt="Homemade dinner delights"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Extra Food - Bottom Right (using breakfast rotated) */}
                    <div className="relative rounded-br-[1.8rem] rounded-tl-lg overflow-hidden">
                      <Image
                        src={thali}
                        alt="Fresh prepared meals"
                        fill
                        className="object-cover scale-125"
                        style={{ objectPosition: "center 30%" }}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </div>

                  {/* Center Overlay - FRESH Daily Delivered */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center p-6 bg-black/40 backdrop-blur-md rounded-2xl border border-[#FCDF59]/20 shadow-2xl">
                      <div
                        className="text-4xl font-bold text-[#FCDF59] mb-1"
                        style={{ fontFamily: "NeueMachina, serif" }}
                      >
                        FRESH
                      </div>
                      <div
                        className="text-lg text-[#FCDF59]/90 uppercase tracking-widest"
                        style={{ fontFamily: "29LT, serif" }}
                      >
                        Daily Delivered
                      </div>
                    </div>
                  </div>

                  {/* Corner Labels */}
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

                {/* Floating badge */}
                <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-[#FCDF59] text-[#971303] text-xs font-bold uppercase tracking-wider shadow-lg z-30">
                  New
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
};

export default Hero;
