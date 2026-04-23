"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { UtensilsCrossed, ChefHat, Bike, ArrowUpRight } from "lucide-react";
import meals from "@/assets/images/meals.jpg";
import fresh from "@/assets/images/fresh.jpg";
import delivery from "@/assets/images/delivery.jpg";

// Spring configuration for smooth animations
const springConfig = {
  stiffness: 100,
  damping: 20,
  mass: 0.5,
};

// Staggered reveal variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [, , , ] as any,
    },
  },
};

// Step card component with parallax
const StepCard = ({ children, className, align = "left" }: { children: React.ReactNode, className?: string, align?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const smoothY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      variants={itemVariants}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Step card content with liquid glass effect
const StepContent = ({
  title,
  description,
  icon: Icon,
  image,
  gradient,
  number,
  align = "left",
}: any) => {
  const isLeft = align === "left";

  return (
    <div
      className={`
        group relative overflow-hidden rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10
        transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]
        hover:border-white/20 hover:bg-black/40
        flex flex-col lg:flex-row
        ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}
      `}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `linear-gradient(to bottom right, ${gradient.colors[0]}15, ${gradient.colors[1]}15)`,
        }}
      />

      {/* Inner highlight */}
      <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />

      {/* Image section */}
      <div className="relative w-full lg:w-2/5 h-48 lg:h-auto overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      </div>

      {/* Content section */}
      <div className="relative z-10 flex-1 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
        {/* Number badge */}
        <div className="absolute top-4 right-4 text-6xl font-bold text-white/5 group-hover:text-white/10 transition-colors duration-500">
          {number}
        </div>

        {/* Icon */}
        <div
          className="
            w-14 h-14 rounded-xl flex items-center justify-center mb-6
            bg-gradient-to-br border transition-all duration-500
            group-hover:scale-110
          "
          style={{
            background: `linear-gradient(135deg, ${gradient.colors[0]}20, ${gradient.colors[1]}20)`,
            borderColor: `${gradient.colors[0]}30`,
          }}
        >
          <Icon
            className="w-7 h-7 transition-colors duration-500"
            style={{ color: gradient.colors[0] }}
          />
        </div>

        {/* Title */}
        <h3
          className="text-2xl sm:text-3xl font-bold text-[#FCDF59] mb-4"
          style={{ fontFamily: "NeueMachina, serif" }}
        >
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#FCDF59]/60 text-base leading-relaxed">
          {description}
        </p>

        {/* Hover arrow */}
        <div className="mt-6 flex items-center gap-2 text-[#FCDF59]/40 group-hover:text-[#FCDF59] transition-colors duration-500">
          <span className="text-sm uppercase tracking-wider">Learn more</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const features = [
    {
      title: "Choose Your Meal Plan",
      description:
        "Select from our variety of meal plans that suit your dietary preferences and requirements. Breakfast, lunch, and dinner options available.",
      icon: UtensilsCrossed,
      image: meals,
      gradient: { colors: ["#FCDF59", "#FF6B35"] },
      align: "left",
    },
    {
      title: "We Cook Fresh Daily",
      description:
        "Our chefs prepare your meals with fresh ingredients and authentic recipes every single day. No preservatives, no compromises.",
      icon: ChefHat,
      image: fresh,
      gradient: { colors: ["#25D366", "#128C7E"] },
      align: "right",
    },
    {
      title: "Doorstep Delivery",
      description:
        "Get your hot, delicious tiffin delivered right to your home or office on time, every time.",
      icon: Bike,
      image: delivery,
      gradient: { colors: ["#FF000D", "#971303"] },
      align: "left",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900/50 to-zinc-950" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-16 lg:mb-24"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#FCDF59] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/80 font-medium">
              Simple Process
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FCDF59] mb-6"
            style={{ fontFamily: "NeueMachina, serif" }}
          >
            How It{" "}
            <span className="relative inline-block">
              Works
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
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-[#FCDF59]/60 max-w-2xl mx-auto"
          >
            Getting your homemade tiffin is just three simple steps away
          </motion.p>
        </motion.div>

        {/* Vertical Steps with connecting line */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden lg:block">
            <div className="h-full w-full bg-gradient-to-b from-transparent via-[#FCDF59]/20 to-transparent" />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-12 lg:gap-16">
            {features.map((feature, index) => (
              <StepCard key={feature.title} align={feature.align}>
                <div
                  className={`
                    relative
                    ${feature.align === "left" ? "lg:mr-20" : "lg:ml-20"}
                  `}
                >
                  {/* Step number indicator for desktop */}
                  <div
                    className={`
                      absolute top-1/2 -translate-y-1/2 z-20 hidden lg:flex
                      w-12 h-12 rounded-full bg-[#971303] border-2 border-[#FCDF59]/30
                      items-center justify-center
                      ${feature.align === "left" ? "-right-16" : "-left-16"}
                    `}
                  >
                    <span className="text-[#FCDF59] font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>

                  <StepContent {...feature} number={`0${index + 1}`} />
                </div>
              </StepCard>
            ))}

            {/* Stats card */}
            <StepCard>
              <div className="flex justify-center">
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#971303]/20 to-[#FF000D]/20 backdrop-blur-xl border border-white/10 p-8 sm:p-12 max-w-2xl w-full flex flex-col items-center text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FCDF59]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10">
                    <div
                      className="text-6xl sm:text-7xl font-bold text-[#FCDF59] mb-3"
                      style={{ fontFamily: "NeueMachina, serif" }}
                    >
                      500+
                    </div>
                    <div className="text-[#FCDF59]/60 text-base uppercase tracking-wider mb-6">
                      Happy Customers
                    </div>
                    <div className="flex -space-x-3 justify-center">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FCDF59]/30 to-[#FF000D]/30 border-2 border-zinc-950 flex items-center justify-center"
                        >
                          <span className="text-xs text-[#FCDF59]">★</span>
                        </div>
                      ))}
                      <div className="w-10 h-10 rounded-full bg-[#FCDF59]/10 border-2 border-zinc-950 flex items-center justify-center text-xs text-[#FCDF59]">
                        +
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StepCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
