"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Image from 'next/image';
import about from '../../assets/images/about.avif';
import aboutHeadingBg from '../../assets/images/hero-bg2.avif';

// Spring configuration for premium feel
const springConfig = {
  stiffness: 100,
  damping: 20,
};

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
}

// Magnetic card component
const MagneticCard = ({ children, className }: MagneticCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.08);
    y.set(distanceY * 0.08);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Staggered reveal variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [, , , ] as any,
    },
  },
};

const AboutPage = () => {
  const promises = [
    { title: "Fresh & Hygienic", desc: "Prepared daily with the freshest ingredients" },
    { title: "Homely Taste", desc: "Just like Maa ke haath ka khana" },
    { title: "On-time Delivery", desc: "Every meal, delivered on time" },
    { title: "Customer First", desc: "Your satisfaction is our priority" },
  ];

  return (
    <div className="min-h-screen bg-[#111]">
      {/* Hero Section with Parallax */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src={aboutHeadingBg}
          alt="About Rotify"
          fill
          className="object-cover brightness-50"
          priority
          placeholder="blur"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#111]" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [, , , ] as any }}
            className="text-center px-4"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FCDF59] animate-pulse" />
              <span className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/80 font-medium">
                Since 2020
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-4xl xs:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FCDF59]"
              style={{ fontFamily: "NeueMachina, serif" }}
            >
              About Us
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative pb-16 pt-4 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-12 md:space-y-16"
          >
            {/* Intro Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#FCDF59] mb-6"
                style={{ fontFamily: "NeueMachina, serif" }}
              >
                Welcome to Rotify
              </h2>
              <p className="text-lg md:text-xl text-[#FCDF59]/70 leading-relaxed max-w-3xl mx-auto">
                Your trusted home-style cloud kitchen in Meerut, serving wholesome,
                freshly cooked meals made with love for the past 4 years.
              </p>
            </motion.div>

            {/* Story Section with Image */}
            <motion.div variants={itemVariants}>
              <MagneticCard className="relative">
                <div className="relative p-1 rounded-2xl bg-gradient-to-br from-[#FCDF59]/20 to-[#971303]/10">
                  <div className="relative rounded-xl overflow-hidden">
                    <Image
                      src={about}
                      alt="Rotify kitchen"
                      width={1200}
                      height={600}
                      placeholder="blur"
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Overlay text */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <p className="text-[#FCDF59]/90 text-lg md:text-xl leading-relaxed">
                        What started as Public Tiffin Box has now grown into{" "}
                        <span className="text-[#FCDF59] font-bold">Rotify</span> — a name
                        that reflects our passion for bringing you healthy, tasty, and
                        satisfying food every day.
                      </p>
                    </div>
                  </div>
                </div>
              </MagneticCard>
            </motion.div>

            {/* Philosophy Section */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
              <div className="p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-[#FCDF59]/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FCDF59]/20 to-[#971303]/20 border border-[#FCDF59]/20 flex items-center justify-center mb-4">
                  <span className="text-[#FCDF59] text-xl">❤️</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold text-[#FCDF59] mb-3"
                  style={{ fontFamily: "NeueMachina, serif" }}
                >
                  Our Philosophy
                </h3>
                <p className="text-[#FCDF59]/60 leading-relaxed">
                  At Rotify, we believe food is not just about filling your stomach —
                  it&apos;s about nourishing your body and soul. That&apos;s why we carefully
                  prepare every dish with fresh ingredients, balanced nutrition, and the
                  authentic taste of home.
                </p>
              </div>

              <div className="p-6 md:p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-[#FCDF59]/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FCDF59]/20 to-[#971303]/20 border border-[#FCDF59]/20 flex items-center justify-center mb-4">
                  <span className="text-[#FCDF59] text-xl">🏠</span>
                </div>
                <h3
                  className="text-xl md:text-2xl font-bold text-[#FCDF59] mb-3"
                  style={{ fontFamily: "NeueMachina, serif" }}
                >
                  Ghar Ka Khana
                </h3>
                <p className="text-[#FCDF59]/60 leading-relaxed">
                  Whether it&apos;s breakfast, lunch, or dinner, our goal is to make sure
                  you never miss the comfort of ghar ka khana. We&apos;re more than just a
                  tiffin service — we&apos;re your daily food partner, committed to
                  consistency, hygiene, and timely delivery.
                </p>
              </div>
            </motion.div>

            {/* Our Promise Section */}
            <motion.div variants={itemVariants}>
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 mb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/80 font-medium">
                    Our Commitment
                  </span>
                </div>
                <h3
                  className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#FCDF59]"
                  style={{ fontFamily: "NeueMachina, serif" }}
                >
                  Our Promise to You
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {promises.map((promise, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="group p-6 rounded-xl bg-black/30 backdrop-blur-xl border border-[#FCDF59]/10 hover:border-[#FCDF59]/30 transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#971303] to-[#FF000D] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <span className="text-[#FCDF59] font-bold">{idx + 1}</span>
                    </div>
                    <h4 className="text-[#FCDF59] font-semibold mb-2">{promise.title}</h4>
                    <p className="text-[#FCDF59]/50 text-sm">{promise.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Closing Section */}
            <motion.div variants={itemVariants} className="text-center">
              <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-[#FCDF59]/5 to-[#971303]/10 border border-[#FCDF59]/10">
                <p className="text-lg md:text-xl text-[#FCDF59]/70 leading-relaxed max-w-2xl mx-auto">
                  Thank you for making us a part of your everyday life. With your support,
                  we look forward to serving you even better in the coming years!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;