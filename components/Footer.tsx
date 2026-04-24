"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FaWhatsapp, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "@/assets/images/footer-logo.jpeg";

// Spring configuration for magnetic effect
const springConfig = {
  stiffness: 150,
  damping: 15,
  mass: 0.1,
};

interface MagneticIconProps {
  children: React.ReactNode;
  href: string;
}

// Magnetic icon component
const MagneticIcon = ({ children, href }: MagneticIconProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * 0.3);
    y.set(distanceY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FCDF59]/60 hover:text-[#FCDF59] hover:border-[#FCDF59]/30 hover:bg-[#FCDF59]/10 transition-all duration-300"
    >
      {children}
    </motion.a>
  );
};

// Staggered reveal variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

// Footer link with hover animation
const FooterLink = ({ href, children }: FooterLinkProps) => (
  <Link
    href={href}
    className="group relative text-sm text-[#FCDF59]/50 hover:text-[#FCDF59] transition-colors duration-300 uppercase tracking-wider"
  >
    <span className="relative">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FCDF59] group-hover:w-full transition-all duration-300" />
    </span>
  </Link>
);

const Footer = () => {
  const socialLinks = [
    { icon: FaWhatsapp, href: "https://wa.me/918266882636", label: "WhatsApp" },
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaYoutube, href: "#", label: "YouTube" },
  ];

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/plans", label: "Plans" },
    { href: "/", label: "Why Us" },
    { href: "/", label: "Contact" },
  ];

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FCDF59]/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#FCDF59]/5 blur-[120px]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#971303]/20 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-20 lg:py-32"
        >
          {/* Editorial Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Left Column - CTA (spans 7) */}
            <motion.div variants={itemVariants} className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 mb-8">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                <span className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/80 font-medium">
                  We&apos;re here to help
                </span>
              </div>

              {/* Main headline */}
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FCDF59] leading-[1.1] mb-6"
                style={{ fontFamily: "NeueMachina, serif" }}
              >
                Ready to enjoy
                <br />
                <span className="relative inline-block">
                  homemade food?
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-4 text-[#FCDF59]/20"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 6 Q75 0 150 6 T300 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h2>

              <p className="text-lg text-[#FCDF59]/60 max-w-md mb-10 leading-relaxed">
                Join 500+ happy customers in Meerut who trust us for fresh,
                home-cooked meals delivered daily.
              </p>

              {/* CTA Button - Double Bezel */}
              <Link href="https://wa.me/918266882636" target="_blank" rel="noopener noreferrer">
                <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-[#25D366]/40 to-[#128C7E]/40 group cursor-pointer">
                  <div className="relative px-8 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] overflow-hidden">
                    {/* Hover fill */}
                    <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]" />

                    <span className="relative flex items-center gap-3 text-white font-medium group-hover:text-[#128C7E] transition-colors duration-500">
                      <FaWhatsapp className="w-5 h-5" />
                      <span>Chat on WhatsApp</span>
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
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
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Right Column - Links & Social (spans 5) */}
            <motion.div variants={itemVariants} className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-8">
                {/* Navigation */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/40 mb-6">
                    Navigation
                  </h3>
                  <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <FooterLink key={link.href} href={link.href}>
                        {link.label}
                      </FooterLink>
                    ))}
                  </nav>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/40 mb-6">
                    Contact
                  </h3>
                  <div className="flex flex-col gap-4 text-sm text-[#FCDF59]/50">
                    <p>Meerut, Uttar Pradesh</p>
                    <p>+91 8266882636</p>
                    <p>hello@rotify.in</p>
                  </div>
                </div>
              </div>

              {/* Social Links with Magnetic Effect */}
              <div className="mt-12">
                <h3 className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/40 mb-6">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <MagneticIcon
                      key={social.label}
                      href={social.href}
                    >
                      <social.icon className="w-5 h-5" />
                    </MagneticIcon>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            variants={itemVariants}
            className="mt-20 pt-8 border-t border-white/10"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src={logo}
                  alt="ROTIFY"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span
                  className="text-xl font-bold text-[#FCDF59]"
                  style={{ fontFamily: "NeueMachina, serif" }}
                >
                  ROTIFY
                </span>
              </Link>

              {/* Copyright */}
              <p className="text-sm text-[#FCDF59]/40">
                © {new Date().getFullYear()} Rotify.in — All rights reserved
              </p>

              {/* Back to top */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-2 text-sm text-[#FCDF59]/50 hover:text-[#FCDF59] transition-colors duration-300"
              >
                <span className="uppercase tracking-wider">Back to top</span>
                <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-[#FCDF59]/10 transition-colors duration-300"
                >
                  <svg
                    className="w-4 h-4 transform -rotate-90"
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
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
