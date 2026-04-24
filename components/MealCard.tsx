"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, X, Sparkles, Clock } from "lucide-react";

import breakfast from "@/assets/images/morning.jpg";
import lunch from "@/assets/images/noon.webp";
import dinner from "@/assets/images/night.avif";

// Premium Hover Card Component - Border glow only (no scale)
const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated gradient border */}
      <div
        className={`
          absolute -inset-[1px] rounded-2xl opacity-0 transition-opacity duration-500
          ${isHovered ? "opacity-100" : ""}
        `}
        style={{
          background: "linear-gradient(135deg, rgba(252, 223, 89, 0.4), rgba(151, 19, 3, 0.4), rgba(252, 223, 89, 0.4))",
          backgroundSize: "200% 200%",
          animation: isHovered ? "gradient-shift 3s ease infinite" : "none",
        }}
      />

      {children}
    </div>
  );
};

// Price display component
const PriceDisplay = ({ price, isDeluxe }: { price: string; isDeluxe: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
    >
      <div className="flex items-baseline gap-1 flex-wrap">
        <span
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FCDF59]"
          style={{ fontFamily: "NeueMachina, serif" }}
        >
          {price}
        </span>
        <span className="text-sm text-[#FCDF59]/60">/plate</span>
      </div>

      {isDeluxe && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-3 -right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-[#971303] to-[#FF000D] text-[10px] uppercase tracking-wider text-[#FCDF59] shadow-lg"
        >
          <Sparkles className="w-3 h-3" />
          Popular
        </motion.div>
      )}
    </motion.div>
  );
};

// Feature list component
const FeatureList = ({ features, notIncluded, compact = false }: { features: string[]; notIncluded?: string[]; compact?: boolean }) => {
  return (
    <div className={`mt-4 ${compact ? "space-y-2" : "space-y-2.5"}`}>
      {features.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
          className="flex items-start gap-2"
        >
          <span className={`flex-shrink-0 rounded-full bg-[#25D366]/20 flex items-center justify-center mt-0.5 ${compact ? "w-4 h-4" : "w-5 h-5"}`}>
            <Check className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#25D366]`} strokeWidth={3} />
          </span>
          <span className={`text-[#FCDF59]/80 leading-relaxed ${compact ? "text-xs" : "text-sm"}`}>{feature}</span>
        </motion.div>
      ))}

      {notIncluded?.map((feature, index) => (
        <motion.div
          key={feature}
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + index * 0.08 }}
          className="flex items-start gap-2"
        >
          <span className={`flex-shrink-0 rounded-full bg-white/5 flex items-center justify-center mt-0.5 ${compact ? "w-4 h-4" : "w-5 h-5"}`}>
            <X className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} text-[#FCDF59]/30`} strokeWidth={3} />
          </span>
          <span className={`text-[#FCDF59]/30 leading-relaxed line-through ${compact ? "text-xs" : "text-sm"}`}>{feature}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Plan Card Component
interface Plan {
  plan_id: string;
  plan_name: string;
  plan_pricing: {
    plate: string;
    monthly: string;
  };
  plan_features: string[];
  features_not_incl?: string[];
}

const PlanCard = ({ plan, index, compact = false, isLast }: { plan: Plan; index: number; compact?: boolean; isLast?: boolean }) => {
  const { plan_name, plan_pricing, plan_features, features_not_incl } = plan;
  const isDeluxe = plan_name === "Deluxe";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 + index * 0.1 }}
      className={`group/plan ${compact ? "w-full" : "flex-1 min-w-[280px]"}`}
    >
      {/* Outer shell - Double bezel architecture */}
      <div
        className={`
          relative h-full p-[1px] rounded-2xl transition-all duration-700
          ${
            isDeluxe
              ? "bg-gradient-to-br from-[#FCDF59]/50 via-[#FCDF59]/30 to-[#FF000D]/30"
              : "bg-gradient-to-br from-white/15 to-white/5 hover:from-white/25 hover:to-white/15"
          }
        `}
      >
        {/* Deluxe glow effect */}
        {isDeluxe && (
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-[#FF000D]/40 via-[#FCDF59]/20 to-[#FF000D]/40 blur-sm opacity-50 group-hover/plan:opacity-75 transition-opacity duration-500 -z-10" />
        )}

        {/* Inner core */}
        <div
          className={`
            relative h-full rounded-2xl ${compact ? "p-4" : "p-5 sm:p-6"}
            ${isDeluxe ? "bg-[#971303]/25" : "bg-black/50"}
            backdrop-blur-xl
          `}
        >
          {/* Plan header */}
          <div className="flex items-center justify-between mb-4">
            <span
              className={`
                text-xs uppercase tracking-[0.15em] font-medium
                ${isDeluxe ? "text-[#FCDF59]" : "text-[#FCDF59]/70"}
              `}
            >
              {plan_name}
            </span>

            {isDeluxe && (
              <span className="flex items-center gap-1.5 text-[10px] text-[#FCDF59]">
                <Sparkles className="w-3.5 h-3.5" />
                Best Value
              </span>
            )}
          </div>

          {/* Price */}
          <PriceDisplay price={plan_pricing.plate} isDeluxe={isDeluxe} />

          {/* Features */}
          <FeatureList features={plan_features} notIncluded={features_not_incl} compact={compact} />
        </div>
      </div>
    </motion.div>
  );
};

interface MealDetails {
  name: string;
  plans: Plan[];
}

const MealCard = ({ details, variant = "normal" }: { details: MealDetails; variant?: string }) => {
  const { name, plans } = details;
  const isCompact = variant === "compact";

  const imageMap: Record<string, any> = {
    Breakfast: breakfast,
    Lunch: lunch,
    Dinner: dinner,
  };

  const timeMap: Record<string, string> = {
    Breakfast: "7:00 - 9:00 AM",
    Lunch: "12:00 - 2:00 PM",
    Dinner: "7:00 - 9:00 PM",
  };

  const borderGradientMap: Record<string, string> = {
    Breakfast: "from-amber-500/40 via-amber-500/20 to-[#971303]/30",
    Lunch: "from-emerald-500/40 via-emerald-500/20 to-[#971303]/30",
    Dinner: "from-purple-500/40 via-purple-500/20 to-[#971303]/30",
  };

  return (
    <div className="group h-full">
      {/* Main card container */}
      <TiltCard className="w-full h-full">
        {/* Double-bezel: Outer Shell */}
        <div className={`relative p-[1px] rounded-3xl bg-gradient-to-br ${borderGradientMap[name]}`}>
          {/* Inner Core */}
          <div className="relative rounded-3xl overflow-hidden bg-black/60 backdrop-blur-xl h-full flex flex-col">
            {/* Image Section */}
            <div className={`relative ${isCompact ? "h-40 sm:h-48" : "h-64 sm:h-72 md:h-80"} overflow-hidden`}>
              <Image
                src={imageMap[name] || breakfast}
                alt={`${name} meal`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                priority
              />

              {/* Black overlay for better text legibility */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40`}
              />

              {/* Time badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <Clock className={`text-[#FCDF59] ${isCompact ? "w-3.5 h-3.5" : "w-4 h-4"}`} />
                <span className={`uppercase tracking-wider text-[#FCDF59]/90 ${isCompact ? "text-[10px]" : "text-xs"}`}>
                  {timeMap[name]}
                </span>
              </div>

              {/* Meal title overlay */}
              <div className={`absolute bottom-0 left-0 right-0 ${isCompact ? "p-4" : "p-6 sm:p-8"}`}>
                <motion.h2
                  className={`font-bold text-[#FCDF59] ${isCompact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl md:text-5xl"}`}
                  style={{ fontFamily: "NeueMachina, serif" }}
                  whileHover={{ scale: 1.02, originX: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {name}
                </motion.h2>
              </div>
            </div>

            {/* Pricing Section */}
            <div className={`p-4 sm:p-6 flex-1 ${isCompact ? "" : "p-6 sm:p-8"}`}>
              <div className={`flex ${isCompact ? "flex-col gap-4" : "flex-col md:flex-row gap-4 md:gap-6"}`}>
                {plans.map((plan: Plan, index: number) => (
                  <PlanCard
                    key={plan.plan_id}
                    plan={plan}
                    index={index}
                    isLast={index === plans.length - 1}
                    compact={isCompact}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};

export default MealCard;
