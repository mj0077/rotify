"use client";

import React, { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import logo from "@/assets/images/logo.png";
import { ModalContext } from "@/app/ModalContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/plans", label: "Plans" },
  { href: "https://wa.me/918266882636", label: "Contact", external: true },
];

// Spring configuration for premium feel
const springConfig = {
  type: "spring" as any,
  stiffness: 100,
  damping: 20,
};

// Staggered reveal variants for menu items
const containerVariants = {
  closed: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  closed: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.3,
      ease: [, , , ] as any,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [, , , ] as any,
    },
  },
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

// Magnetic button component
const MagneticButton = ({ children, className, onClick }: MagneticButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      transition={springConfig}
    >
      {children}
    </motion.button>
  );
};

const Navbar = () => {
  const { setIsModalOpen } = useContext(ModalContext) as any;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const isWaitlist = pathname === "/waitlist";

  // Track scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      {/* Floating Island Navbar */}
      <motion.header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [, , , ] as any }}
      >
        <nav
          className={`
            relative flex items-center gap-6 px-4 py-3 rounded-full
            transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
            ${isScrolled
              ? "bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
              : "bg-transparent"
            }
          `}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={springConfig}
            >
              <Image
                src={logo}
                alt="ROTIFY"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
                style={{
                  filter: "drop-shadow(0 0 20px rgba(252, 223, 89, 0.3))",
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => {
                  const isDisabled = isWaitlist && link.href !== "/about";
                  return (
                    <Link
                      key={link.href}
                      href={isDisabled ? "#" : link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 group ${
                        isDisabled
                          ? "text-[#FCDF59]/30 cursor-not-allowed pointer-events-none"
                          : "text-[#FCDF59]/80 hover:text-[#FCDF59]"
                      }`}
                    >
                      {link.label}
                      {/* Animated underline */}
                      {!isDisabled && (
                        <span className="absolute bottom-1 left-4 right-4 h-px bg-[#FCDF59] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* CTA Button - Desktop */}
              <div className="hidden md:block">
                <MagneticButton
                  className={`px-5 py-2.5 rounded-full bg-gradient-to-r from-[#971303] to-[#FF000D] ${
                    isWaitlist ? "text-[#FCDF59]/40 opacity-50 cursor-not-allowed pointer-events-none" : "text-[#FCDF59]"
                  } text-sm font-medium uppercase tracking-wider relative overflow-hidden group`}
                  onClick={() => !isWaitlist && setIsModalOpen(true)}
                >
                  {/* Hover fill */}
                  {!isWaitlist && (
                    <span className="absolute inset-0 bg-[#FCDF59] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />
                  )}
                  <span className="relative group-hover:text-[#971303] transition-colors duration-500">
                    Order Now
                  </span>
                </MagneticButton>
              </div>

              {/* Hamburger Menu Button - Mobile */}
              <MagneticButton
                className="md:hidden relative w-12 h-12 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 flex items-center justify-center backdrop-blur-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="relative w-5 h-5 flex flex-col justify-center items-center">
                  {/* Line 1 */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-[#FCDF59] rounded-full"
                    animate={{
                      rotate: isMenuOpen ? 45 : 0,
                      y: isMenuOpen ? 0 : -4,
                    }}
                    transition={springConfig}
                  />
                  {/* Line 2 */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-[#FCDF59] rounded-full"
                    animate={{
                      opacity: isMenuOpen ? 0 : 1,
                      x: isMenuOpen ? 10 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  />
                  {/* Line 3 */}
                  <motion.span
                    className="absolute w-5 h-0.5 bg-[#FCDF59] rounded-full"
                    animate={{
                      rotate: isMenuOpen ? -45 : 0,
                      y: isMenuOpen ? 0 : 4,
                    }}
                    transition={springConfig}
                  />
                </div>
              </MagneticButton>
        </nav>
      </motion.header>

      {/* Full-Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop with glassmorphism */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              className="relative h-full flex flex-col justify-center items-center px-6"
              variants={containerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Navigation Links */}
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link, index) => {
                  const isDisabled = isWaitlist && link.href !== "/about";
                  return (
                    <motion.div key={link.href} variants={itemVariants}>
                      <Link
                        href={isDisabled ? "#" : link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className={`text-4xl font-bold transition-colors duration-300 ${
                          isDisabled
                            ? "text-[#FCDF59]/30 cursor-not-allowed pointer-events-none"
                            : "text-[#FCDF59] hover:text-white"
                        }`}
                        style={{ fontFamily: "NeueMachina, serif" }}
                        onClick={() => !isDisabled && !link.external && setIsMenuOpen(false)}
                      >
                        <span className={`text-lg mr-4 font-normal ${isDisabled ? "text-[#FCDF59]/20" : "text-[#FCDF59]/40"}`}>
                          0{index + 1}
                        </span>
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA in mobile menu */}
              <motion.div variants={itemVariants} className="mt-12">
                <button
                  className={`px-8 py-4 rounded-full bg-gradient-to-r from-[#971303] to-[#FF000D] font-medium uppercase tracking-wider text-sm ${
                    isWaitlist ? "text-[#FCDF59]/40 opacity-50 cursor-not-allowed pointer-events-none" : "text-[#FCDF59]"
                  }`}
                  onClick={() => {
                    if (!isWaitlist) {
                      setIsMenuOpen(false);
                      setTimeout(() => setIsModalOpen(true), 300);
                    }
                  }}
                  disabled={isWaitlist}
                >
                  Schedule Your Meal
                </button>
              </motion.div>

              {/* Footer text */}
              <motion.div
                variants={itemVariants}
                className="absolute bottom-8 left-0 right-0 text-center"
              >
                <span className="text-[#FCDF59]/40 text-sm uppercase tracking-widest">
                  ROTIFY — Homemade Tiffin Service
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
