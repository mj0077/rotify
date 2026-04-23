"use client";

import React, { useRef, useContext } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Calendar, MessageCircle } from "lucide-react";
import { ModalContext } from "@/app/ModalContext";

// Spring configuration for magnetic effect
const springConfig = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

// Magnetic card component
const MagneticCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: any) => {
    const rect = (ref.current as any)?.getBoundingClientRect();
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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [, , , ] as any,
    },
  },
};

const InfoBoxes = ({ onOpen }: { onOpen?: () => void }) => {
  const { setIsModalOpen } = useContext(ModalContext) as any;

  return (
    <motion.div
      className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WhatsApp Contact Card */}
        <motion.div variants={itemVariants}>
          <Link href="https://wa.me/918266882636" target="_blank" rel="noopener noreferrer">
            <MagneticCard className="block h-full">
              {/* Double-bezel: Outer Shell */}
              <div className="relative h-full p-1 rounded-2xl bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/10 group cursor-pointer overflow-hidden">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#25D366]/40 via-transparent to-[#128C7E]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Inner Core: Liquid Glass Card */}
                <div className="relative h-full p-6 sm:p-8 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden">
                  {/* Inner highlight */}
                  <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />

                  {/* Hover fill effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon & Eyebrow */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <MessageCircle className="w-6 h-6 text-[#25D366]" />
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-[#25D366]/70 font-medium">
                        Quick Response
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-2xl sm:text-3xl font-bold text-[#FCDF59] mb-3"
                      style={{ fontFamily: "NeueMachina, serif" }}
                    >
                      Chat on WhatsApp
                    </h3>

                    {/* Description */}
                    <p className="text-[#FCDF59]/60 text-sm leading-relaxed mb-6 max-w-sm">
                      Check out today&apos;s menu and let us know what suits you best.
                      Average response time: under 5 minutes.
                    </p>

                    {/* CTA Button - Double Bezel */}
                    <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-medium text-sm overflow-hidden relative">
                      {/* Hover fill */}
                      <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                      <span className="relative flex items-center gap-2 group-hover:text-[#128C7E] transition-colors duration-500">
                        <FaWhatsapp className="w-5 h-5" />
                        <span>Start Chat</span>
                      </span>
                      <motion.span
                        className="relative w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#128C7E]/10 transition-colors duration-500"
                        whileHover={{ x: 3 }}
                      >
                        <svg
                          className="w-3 h-3 group-hover:text-[#128C7E] transition-colors duration-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </motion.span>
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#25D366]/5 blur-2xl group-hover:bg-[#25D366]/10 transition-colors duration-700" />
                </div>
              </div>
            </MagneticCard>
          </Link>
        </motion.div>

        {/* Schedule Meal Card */}
        <motion.div variants={itemVariants}>
          <MagneticCard className="block h-full">
            {/* Double-bezel: Outer Shell */}
            <div className="relative h-full p-1 rounded-2xl bg-gradient-to-br from-[#971303]/20 to-[#FF000D]/10 group cursor-pointer overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#FF000D]/40 via-transparent to-[#971303]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Inner Core: Liquid Glass Card */}
              <div className="relative h-full p-6 sm:p-8 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 overflow-hidden">
                {/* Inner highlight */}
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />

                {/* Hover fill effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF000D]/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Eyebrow */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#971303]/20 to-[#FF000D]/20 border border-[#FF000D]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <Calendar className="w-6 h-6 text-[#FF000D]" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#FF000D]/70 font-medium">
                      Plan Ahead
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-[#FCDF59] mb-3"
                    style={{ fontFamily: "NeueMachina, serif" }}
                  >
                    Schedule Your Meal
                  </h3>

                  {/* Description */}
                  <p className="text-[#FCDF59]/60 text-sm leading-relaxed mb-6 max-w-sm">
                    Plan and book your meals ahead. Choose your dates and meal
                    types — we&apos;ll handle the rest with fresh, authentic food.
                  </p>

                  {/* CTA Button - Double Bezel */}
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-[#971303] to-[#FF000D] text-[#FCDF59] font-medium text-sm overflow-hidden relative group/btn"
                  >
                    {/* Hover fill */}
                    <span className="absolute inset-0 bg-[#FCDF59] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                    <span className="relative flex items-center gap-2 group-hover/btn:text-[#971303] transition-colors duration-500">
                      <Calendar className="w-5 h-5" />
                      <span>Book Now</span>
                    </span>
                    <motion.span
                      className="relative w-6 h-6 rounded-full bg-[#FCDF59]/20 flex items-center justify-center group-hover/btn:bg-[#971303]/10 transition-colors duration-500"
                      whileHover={{ x: 3 }}
                    >
                      <svg
                        className="w-3 h-3 group-hover/btn:text-[#971303] transition-colors duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </motion.span>
                  </button>
                </div>

                {/* Decorative corner element */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-[#FF000D]/5 blur-2xl group-hover:bg-[#FF000D]/10 transition-colors duration-700" />
              </div>
            </div>
          </MagneticCard>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InfoBoxes;
