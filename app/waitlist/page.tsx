"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WaitlistSchema } from "@/assets/schema/formSchema";
import { User, Phone, MapPin, ChevronRight, Check } from "lucide-react";

export default function WaitlistPage() {
  const [form, setForm] = useState({ name: "", phNumber: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);
    validateData(newForm);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    validateData(form);
  };

  const validateData = (formData: any) => {
    const validation = WaitlistSchema.safeParse(formData);
    if (validation.success) {
      setErrors({});
    } else {
      const errObj: Record<string, string> = {};
      validation.error.issues.forEach((err: any) => {
        errObj[err.path[0]] = err.message;
      });
      setErrors(errObj);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;
    setStatus("Sending");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("Success");
      } else {
        setStatus("Error");
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex justify-center items-center py-20 px-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#FCDF59]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF000D]/5 rounded-full blur-[100px] pointer-events-none" />

      {status === "Success" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10 p-10 bg-black/60 border border-[#FCDF59]/20 rounded-2xl backdrop-blur-md"
        >
          <div className="w-16 h-16 rounded-full bg-[#128C7E]/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-[#25D366]" />
          </div>
          <h2 className="text-[#FCDF59] text-3xl font-bold mb-4" style={{ fontFamily: "NeueMachina, serif" }}>
            You&apos;re on the list!
          </h2>
          <p className="text-[#FCDF59]/60 max-w-sm">
            Thank you for your interest. We&apos;ll be in touch as soon as we&apos;re ready to serve you.
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg z-10"
        >
          <div className="bg-black/60 rounded-3xl p-[1px] bg-gradient-to-br from-[#FCDF59]/20 to-[#FF000D]/20 mb-8 border border-white/5 shadow-xl backdrop-blur">
            <div className="bg-zinc-950/80 rounded-3xl p-8 sm:p-12">
              <h1 className="text-3xl sm:text-4xl text-[#FCDF59] font-bold mb-3" style={{ fontFamily: "NeueMachina, serif" }}>
                Join the Waitlist
              </h1>
              <p className="text-[#FCDF59]/50 mb-8 text-sm uppercase tracking-wide" style={{ fontFamily: "29LT, serif" }}>
                Be the first to taste our premium homemade tiffin service.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-[#FCDF59]/80 mb-2 block">Name *</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FCDF59]/40" />
                    <input
                      name="name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={form.name}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 text-[#FCDF59] outline-none focus:border-[#FCDF59]/50 transition-colors"
                      required
                    />
                  </div>
                  {errors.name && touched.name && <p className="text-[#FF000D] text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="text-sm text-[#FCDF59]/80 mb-2 block">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FCDF59]/40" />
                    <input
                      name="phNumber"
                      type="tel"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={form.phNumber}
                      placeholder="Enter phone number"
                      className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 text-[#FCDF59] outline-none focus:border-[#FCDF59]/50 transition-colors"
                      required
                    />
                  </div>
                  {errors.phNumber && touched.phNumber && <p className="text-[#FF000D] text-xs mt-1">{errors.phNumber}</p>}
                </div>

                <div>
                  <label className="text-sm text-[#FCDF59]/80 mb-2 block">Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-[1.1rem] w-5 h-5 text-[#FCDF59]/40" />
                    <textarea
                      name="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={form.address}
                      placeholder="Enter complete delivery address"
                      rows={3}
                      className="w-full pl-12 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 text-[#FCDF59] outline-none focus:border-[#FCDF59]/50 transition-colors resize-none"
                      required
                    />
                  </div>
                  {errors.address && touched.address && <p className="text-[#FF000D] text-xs mt-1">{errors.address}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "Sending"}
                  className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-[#971303] to-[#FF000D] text-[#FCDF59] font-bold text-sm uppercase tracking-wider flex justify-center items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === "Sending" ? "Submitting..." : "Join the List"} <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
