"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormSchema } from "@/assets/schema/formSchema";
import Image from "next/image";
import {
  X,
  Check,
  User,
  Phone,
  CalendarDays,
  Clock,
  Utensils,
  ChevronRight,
} from "lucide-react";
import checkmark from "../assets/images/checkmark.gif";

// Backdrop animation
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Modal container animation
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    filter: "blur(10px)",
    transition: { duration: 0.2 },
  },
};

// Staggered content animation
const contentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1] as const,
    },
  },
};

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Custom checkbox component
const AnimatedCheckbox = ({ checked, onChange, label, icon: Icon }: CheckboxProps) => (
  <motion.label
    className={`
      relative flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl cursor-pointer
      transition-all duration-300 overflow-hidden
      ${checked
        ? "bg-[#FCDF59]/10 border-[#FCDF59]/40"
        : "bg-white/5 border-white/10 hover:bg-white/10"
      }
      border
    `}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="sr-only"
    />

    {/* Custom checkbox */}
    <div
      className={`
        relative w-6 h-6 rounded-md border-2 flex items-center justify-center
        transition-all duration-300
        ${checked
          ? "bg-[#FCDF59] border-[#FCDF59]"
          : "border-white/30 bg-transparent"
        }
      `}
    >
      <motion.div
        initial={false}
        animate={{ scale: checked ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Check className="w-4 h-4 text-[#971303]" strokeWidth={3} />
      </motion.div>
    </div>

    {/* Icon */}
    <div
      className={`
        w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300
        ${checked ? "bg-[#FCDF59]/20" : "bg-white/5"}
      `}
    >
      <Icon
        className={`w-5 h-5 transition-colors duration-300 ${checked ? "text-[#FCDF59]" : "text-[#FCDF59]/50"
          }`}
      />
    </div>

    {/* Label */}
    <span
      className={`font-medium text-sm sm:text-base transition-colors duration-300 ${checked ? "text-[#FCDF59]" : "text-[#FCDF59]/70"
        }`}
    >
      {label}
    </span>
  </motion.label>
);

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  error?: string;
  touched?: boolean;
}

// Form input component
const FormInput = ({
  label,
  icon: Icon,
  error,
  touched,
  required,
  ...props
}: FormInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div variants={itemVariants} className="space-y-2">
      <label className="flex items-center gap-2 text-sm text-[#FCDF59]/80">
        {label}
        {required && <span className="text-[#FF000D]">*</span>}
      </label>

      <div className="relative">
        {/* Icon */}
        <div
          className={`
            absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300
            ${isFocused ? "text-[#FCDF59]" : "text-[#FCDF59]/40"}
          `}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          {...props}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border
            text-[#FCDF59] placeholder:text-[#FCDF59]/30
            transition-all duration-300 outline-none
            ${error && touched
              ? "border-[#FF000D]/50 bg-[#FF000D]/5"
              : isFocused
                ? "border-[#FCDF59]/50 bg-white/10"
                : "border-white/10 hover:border-white/20"
            }
          `}
        />

        {/* Focus glow */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 rounded-xl bg-[#FCDF59]/5 -z-10 blur-xl"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && touched && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[#FF000D] text-xs flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Submit button with loading states
const SubmitButton = ({ status }: { status: string }) => {
  const buttonContent: Record<string, any> = {
    "": {
      text: "Book Meals",
      icon: ChevronRight,
      className: "from-[#971303] to-[#FF000D]",
    },
    Sending: {
      text: "Processing...",
      icon: null,
      className: "from-gray-600 to-gray-700",
    },
    Error: {
      text: "Try Again",
      icon: ChevronRight,
      className: "from-[#FF000D] to-[#971303]",
    },
    Success: {
      text: "Order Sent",
      icon: Check,
      className: "from-[#25D366] to-[#128C7E]",
    },
  };

  const currentContent = buttonContent[status] || buttonContent[""];
  const Icon = currentContent.icon;

  return (
    <motion.button
      type="submit"
      disabled={status === "Sending"}
      variants={itemVariants}
      whileHover={status !== "Sending" ? { scale: 1.02 } : {}}
      whileTap={status !== "Sending" ? { scale: 0.98 } : {}}
      className={`
        w-full py-4 rounded-xl bg-gradient-to-r ${currentContent.className}
        text-[#FCDF59] font-semibold text-sm uppercase tracking-wider
        flex items-center justify-center gap-2
        transition-all duration-300
        disabled:opacity-70 disabled:cursor-not-allowed
        shadow-lg hover:shadow-xl
      `}
    >
      {status === "Sending" ? (
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-[#FCDF59]/30 border-t-[#FCDF59] rounded-full animate-spin" />
          <span>{currentContent.text}</span>
        </div>
      ) : (
        <>
          <span>{currentContent.text}</span>
          {Icon && <Icon className={`w-5 h-5 ${status === "" ? "animate-pulse" : ""}`} />}
        </>
      )}
    </motion.button>
  );
};

// Success state component
const SuccessState = ({ onClose }: { onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }}
      className="text-center py-8"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
        className="relative mx-auto mb-8"
      >
        <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/20 border border-[#25D366]/30 flex items-center justify-center"
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Check className="w-12 h-12 text-[#25D366]" strokeWidth={3} />
          </motion.div>
        </div>

        {/* Ripple effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#25D366]/30"
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
      </motion.div>

      {/* Success text */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-3xl font-bold text-[#FCDF59] mb-4"
        style={{ fontFamily: "NeueMachina, serif" }}
      >
        Order Received!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-[#FCDF59]/70 mb-8"
      >
        Thank you for your order. We&apos;ll contact you shortly to confirm
        your meal schedule.
      </motion.p>

      {/* Confetti or celebration GIF */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Image
          src={checkmark}
          alt="Success"
          width={200}
          height={200}
          className="mx-auto rounded-lg"
        />
      </motion.div>

      {/* Close button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onClose}
        className="mt-8 px-8 py-3 rounded-xl bg-white/10 text-[#FCDF59] font-medium hover:bg-white/20 transition-colors duration-300"
      >
        Close
      </motion.button>
    </motion.div>
  );
};

const ScheduleModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form, setForm] = useState({
    name: "",
    phNumber: "",
    startDate: "",
    endDate: "",
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [orderSubmitted, setOrderSubmitted] = useState<boolean>(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !orderSubmitted) onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose, orderSubmitted]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target;
    const newForm = { ...form, [name]: type === "checkbox" ? checked : value };
    setForm(newForm);
    validateData(newForm);
    // Clear error message when user modifies form
    if (errorMessage) setErrorMessage("");
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateData(form);
  };

  const validateData = (formData: typeof form) => {
    const validation = FormSchema.safeParse(formData);
    if (validation.success) {
      setErrors({});
    } else {
      const errorsObj: Record<string, string> = {};
      validation.error.issues.forEach((err) => {
        errorsObj[err.path[0] as string] = err.message;
      });
      setErrors(errorsObj);
    }
  };

  // Parse error response from backend into a user-friendly message
  const parseErrorResponse = (data: Record<string, any> | null, statusCode: number) => {
    if (statusCode === 429) {
      return "Too many requests. Please wait a minute and try again.";
    }

    if (typeof data?.error === "string") {
      return data.error;
    }

    // Zod flattened error from backend
    if (data?.error?.fieldErrors) {
      const fieldMessages = Object.entries(data.error.fieldErrors)
        .map(([field, msgs]) => {
          const label = {
            name: "Name",
            phNumber: "Phone number",
            startDate: "Start date",
            endDate: "End date",
          }[field] || field;
          return `${label}: ${(msgs as string[]).join(", ")}`;
        })
        .join(". ");
      return fieldMessages || "Please check your form inputs.";
    }

    if (statusCode === 500) {
      return "Something went wrong on our end. Please try again in a moment.";
    }

    return "An unexpected error occurred. Please try again.";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setTouched({
      name: true,
      phNumber: true,
      startDate: true,
      endDate: true,
    });

    // Client-side validation: at least one meal must be selected
    if (!form.breakfast && !form.lunch && !form.dinner) {
      setStatus("Error");
      setErrorMessage("Please select at least one meal type.");
      return;
    }

    if (Object.keys(errors).length > 0) {
      setStatus("Error");
      setErrorMessage("Please fix the errors in the form above.");
      return;
    }

    setStatus("Sending");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setOrderSubmitted(true);
          setStatus("Success");
          setErrorMessage("");
          setForm({
            name: "",
            phNumber: "",
            startDate: "",
            endDate: "",
            breakfast: false,
            lunch: false,
            dinner: false,
          });
          setErrors({});
        }
      } else {
        let data = {};
        try {
          data = await res.json();
        } catch {
          // Response is not JSON
        }
        const msg = parseErrorResponse(data, res.status);
        setStatus("Error");
        setErrorMessage(msg);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error");
      setErrorMessage(
        "Unable to connect. Please check your internet connection and try again."
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={!orderSubmitted ? onClose : undefined}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg max-h-[90vh] overflow-x-hidden overflow-y-auto"
          >
            {/* Modal container */}
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-[#FCDF59]/20 via-white/10 to-[#971303]/20"
            >
              <div className="relative rounded-2xl bg-black/90 backdrop-blur-2xl p-6 sm:p-8">
                {/* Close button */}
                {!orderSubmitted && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#FCDF59]/60 hover:text-[#FCDF59] hover:bg-white/10 transition-all duration-300 z-10"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                )}

                <AnimatePresence mode="wait">
                  {!orderSubmitted ? (
                    <motion.div
                      key="form"
                      variants={contentVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {/* Header */}
                      <motion.div variants={itemVariants} className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 mb-4"
                        >
                          <Utensils className="w-4 h-4 text-[#FCDF59]" />
                          <span className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/80"
                          >
                            Meal Booking
                          </span>
                        </div>

                        <h2
                          className="text-2xl sm:text-3xl font-bold text-[#FCDF59] mb-2"
                          style={{ fontFamily: "NeueMachina, serif" }}
                        >
                          Schedule Your Meal
                        </h2>

                        <p className="text-sm text-[#FCDF59]/60"
                        >
                          Reserve your delicious homemade meals
                        </p>
                      </motion.div>

                      {/* Form */}
                      <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <FormInput
                          label="Full Name"
                          icon={User}
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your full name"
                          error={errors.name}
                          touched={touched.name}
                          required
                        />

                        {/* Phone */}
                        <FormInput
                          label="Phone Number"
                          icon={Phone}
                          name="phNumber"
                          type="tel"
                          value={form.phNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter your phone number"
                          error={errors.phNumber}
                          touched={touched.phNumber}
                          required
                        />

                        {/* Dates */}
                        <div className="grid grid-cols-2 gap-4">
                          <FormInput
                            label="Start Date"
                            icon={CalendarDays}
                            name="startDate"
                            type="date"
                            value={form.startDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.startDate}
                            touched={touched.startDate}
                            min={new Date().toISOString().split("T")[0]}
                            required
                          />

                          <FormInput
                            label="End Date"
                            icon={CalendarDays}
                            name="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={errors.endDate}
                            touched={touched.endDate}
                            min={form.startDate || new Date().toISOString().split("T")[0]}
                            required
                          />
                        </div>

                        {/* Meal Types */}
                        <motion.div variants={itemVariants} className="space-y-3">
                          <label className="text-sm text-[#FCDF59]/80"
                          >
                            Select Meal Types
                          </label>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                          >
                            <AnimatedCheckbox
                              checked={form.breakfast}
                              onChange={() => {
                                setForm((prev) => ({
                                  ...prev,
                                  breakfast: !prev.breakfast,
                                }));
                                if (errorMessage) setErrorMessage("");
                              }}
                              label="Breakfast"
                              icon={Clock}
                            />

                            <AnimatedCheckbox
                              checked={form.lunch}
                              onChange={() => {
                                setForm((prev) => ({
                                  ...prev,
                                  lunch: !prev.lunch,
                                }));
                                if (errorMessage) setErrorMessage("");
                              }}
                              label="Lunch"
                              icon={Utensils}
                            />

                            <AnimatedCheckbox
                              checked={form.dinner}
                              onChange={() => {
                                setForm((prev) => ({
                                  ...prev,
                                  dinner: !prev.dinner,
                                }));
                                if (errorMessage) setErrorMessage("");
                              }}
                              label="Dinner"
                              icon={Clock}
                            />
                          </div>
                        </motion.div>
                        {/* Error Message Banner */}
                        <AnimatePresence>
                          {errorMessage && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, height: 0 }}
                              animate={{ opacity: 1, y: 0, height: "auto" }}
                              exit={{ opacity: 0, y: -10, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="rounded-xl bg-[#FF000D]/10 border border-[#FF000D]/30 px-4 py-3 flex items-start gap-3"
                            >
                              <div className="w-5 h-5 rounded-full bg-[#FF000D]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <X className="w-3 h-3 text-[#FF000D]" />
                              </div>
                              <p className="text-[#FF000D] text-sm leading-relaxed">
                                {errorMessage}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <SubmitButton status={status} />
                      </form>

                      {/* Footer text */}
                      <motion.p
                        variants={itemVariants}
                        className="text-center text-xs text-[#FCDF59]/40 mt-6"
                      >
                        Fresh, home-cooked meals delivered to your doorstep
                      </motion.p>
                    </motion.div>
                  ) : (
                    <SuccessState onClose={onClose} />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ScheduleModal;
