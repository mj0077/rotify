import React from 'react';
import { motion } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import navneetImg from '@/assets/images/navneet.png';
import surajImg from '@/assets/images/suraj.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const reviews = [
  {
    text: 'Best quality at an affordable price and tastes just like you cook at your home. The use of spices and oil is also optimum and you can feel that it is healthy. Highly recommended for anyone who wants to have home cooked food.',
    name: 'Navneet Raj Vaish',
    image: navneetImg,
  },
  {
    text: 'Actually it tastes like "Ghar ka khana". Simple yet tasty. Do order from them. Hygienically packed and comes in neat and clean tiffins.\nFood: 5/5  |  Service: 5/5  |  Atmosphere: 5/5',
    name: 'Kislay Bhardwaj',
    image: null,
  },
  {
    text: 'Bhoot hi jyada tasty khana Milta hai bilkul ghar jaisa bilkul maa ke hath ki tarah khud bnate hai khud packing krte hai khud hi delivered bhi krte hai covid time pr bilkul safe hai. Ek bar jarur try krke dekhe. Thank you.',
    name: 'Pandit Suraj Bharala',
    image: surajImg,
  },
];

interface Review {
  text: string;
  name: string;
  image: string | StaticImageData | null;
}

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="group relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-[#FCDF59]/10 p-6 sm:p-8 flex flex-col h-full transition-all duration-500 hover:border-[#FCDF59]/30 hover:bg-black/50">
    {/* Gradient hover overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#FCDF59]/5 to-[#971303]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Inner highlight */}
    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />

    {/* Content */}
    <div className="relative z-10 flex flex-col h-full">
      {/* Quotation mark icon */}
      <div className="mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FCDF59]/20 to-[#971303]/20 border border-[#FCDF59]/20 flex items-center justify-center">
          <svg
            width="20"
            height="16"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#FCDF59]"
          >
            <path
              d="M17.5003 17.5C17.9976 17.5 18.4745 17.3025 18.8262 16.9508C19.1778 16.5992 19.3753 16.1223 19.3753 15.625V11.0462C19.3753 10.549 19.1778 10.0721 18.8262 9.72042C18.4745 9.36879 17.9976 9.17125 17.5003 9.17125H14.8978C14.8978 8.51312 14.9372 7.85313 15.0141 7.195C15.1303 6.4975 15.3253 5.87688 15.5953 5.335C15.8672 4.79125 16.216 4.36562 16.6435 4.05437C17.0691 3.70563 17.611 3.53125 18.271 3.53125V0.625C17.1853 0.625 16.2366 0.8575 15.4209 1.3225C14.6124 1.78279 13.9173 2.41835 13.3866 3.1825C12.8539 4.02496 12.4613 4.94818 12.2241 5.91625C11.985 6.98455 11.868 8.07655 11.8753 9.17125V15.625C11.8753 16.1223 12.0729 16.5992 12.4245 16.9508C12.7761 17.3025 13.253 17.5 13.7503 17.5H17.5003ZM6.25033 17.5C6.74761 17.5 7.22452 17.3025 7.57615 16.9508C7.92778 16.5992 8.12533 16.1223 8.12533 15.625V11.0462C8.12533 10.549 7.92778 10.0721 7.57615 9.72042C7.22452 9.36879 6.74761 9.17125 6.25033 9.17125H3.64783C3.64783 8.51312 3.6872 7.85313 3.76407 7.195C3.88032 6.4975 4.07533 5.87688 4.34533 5.335C4.6172 4.79125 4.96595 4.36562 5.39345 4.05437C5.81908 3.70563 6.36095 3.53125 7.02095 3.53125V0.625C5.93533 0.625 4.98658 0.8575 4.17095 1.3225C3.36242 1.78279 2.66728 2.41835 2.13657 3.1825C1.60393 4.02496 1.21135 4.94818 0.974075 5.91625C0.734986 6.98455 0.617986 8.07655 0.625325 9.17125V15.625C0.625325 16.1223 0.822869 16.5992 1.1745 16.9508C1.52613 17.3025 2.00304 17.5 2.50033 17.5H6.25033Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>

      {/* Testimonial text */}
      <p className="text-[15px] font-medium leading-relaxed mb-6 flex-grow text-[#FCDF59]/80 whitespace-pre-line">
        {review.text}
      </p>

      {/* Profile information */}
      <div className="flex items-center pt-4 border-t border-[#FCDF59]/10">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#971303] to-[#FF000D] flex items-center justify-center mr-4 flex-shrink-0 border border-[#FCDF59]/20">
          {review.image ? (
            <Image
              src={review.image}
              alt={review.name}
              className="w-full h-full rounded-full object-cover"
              width={48}
              height={48}
            />
          ) : (
            <span className="text-[#FCDF59] font-bold text-lg">
              {review.name?.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <h4 className="font-semibold tracking-wide text-[#FCDF59]">{review.name}</h4>
          <p className="text-xs text-[#FCDF59]/50">Verified Customer</p>
        </div>
      </div>
    </div>
  </div>
);

const ReviewsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FCDF59]/10 border border-[#FCDF59]/20 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FCDF59] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#FCDF59]/80 font-medium">
            Customer Love
          </span>
        </div>

        {/* Title */}
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#FCDF59] mb-4"
          style={{ fontFamily: 'NeueMachina, serif' }}
        >
          Our Testimonials
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-[#FCDF59]/60 max-w-2xl mx-auto">
          See what our happy customers have to say about their daily meals
        </p>
      </motion.div>

      {/* Reviews Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {reviews.map((review, idx) => (
          <motion.div key={idx} variants={itemVariants} className="h-full">
            <ReviewCard review={review} />
          </motion.div>
        ))}
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full bg-black/30 backdrop-blur-xl border border-[#FCDF59]/10">
          <div className="flex items-center gap-2">
            <span className="text-[#FCDF59] text-lg">★</span>
            <span className="text-[#FCDF59] font-semibold">4.9</span>
            <span className="text-[#FCDF59]/50 text-sm">Average Rating</span>
          </div>
          <div className="w-px h-6 bg-[#FCDF59]/20" />
          <div className="flex items-center gap-2">
            <span className="text-[#FCDF59] font-semibold">500+</span>
            <span className="text-[#FCDF59]/50 text-sm">Happy Customers</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReviewsSection;
