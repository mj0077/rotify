'use client'

// import bgImage from "@/assets/images/bgImage.png";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Map from "@/components/Map";
// import Review from "@/components/Review";
// import ReviewsSection from "@/components/ReviewsSection";
import ScheduleModal from "@/components/ScheduleModal";
import { useState } from "react";
// import bgImage from "@/assets/images/background.jpg";
import rotifyBg from '../assets/images/rotify.avif';
import Image from "next/image";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="schedule-modal">
        <ScheduleModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
      </div>

      <section className="bg-cover bg-no-repeat h-screen z-0 relative">
        <div className="absolute w-full h-full bgImage">
          <Image src={ rotifyBg } alt="veggies background" placeholder="blur" className="h-full"/>
          {/* <Image src={ newBg5 } alt="veggies background" className="bg-bottom -translate-y-20"/> */}
        </div>
        <div className="wrapper">
          <Hero />
          <InfoBoxes onOpen={() => setIsModalOpen(true)}/>
        </div>
      </section>

      <section className="service-area bg-zinc-950 py-12">
        < Map />
      </section>
      <section className="features">
        <Features />
      </section>
      {/* <section className="reviews-section my-20">
        <ReviewsSection />
      </section> */}
    </>
  );
}
