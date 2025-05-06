// import bgImage from "@/assets/images/bgImage.png";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import Map from "@/components/Map";
import Review from "@/components/Review";
import ReviewsSection from "@/components/ReviewsSection";
// import bgImage from "@/assets/images/background.jpg";
// import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="bg-veggies bg-cover bg-no-repeat h-screen z-0 relative">
        <div className="wrapper">
          <Hero />
          <InfoBoxes />
        </div>
      </section>
      
      <section className="service-area bg-zinc-950 py-12">
        < Map />
      </section>

      <section className="features">
        <Features />
      </section>

      {/* <section className="reviews-section">
        <ReviewsSection />
      </section> */}
    </>
  );
}
