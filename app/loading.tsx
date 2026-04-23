"use client";
import logo from "@/assets/images/footer-logo.jpeg";
import Image from "next/image";
import { useEffect, useState } from "react";

const tagLines = [
  "Bringing you smiles, one meal at a time.",
  "Because everyone deserves a good meal.",
  "Fueling your day the healthy way.",
  "Connecting you to comfort food.",
  "Meals that feel like a hug.",
  "Happy bellies, happy homes.",
];

const loading = () => {
  //   const [randomIndex, setRandomIndex] = useState(0);
  //   const [mounted, setMounted] = useState(false);

  //   useEffect(() => {
  //     setRandomIndex(Math.floor(Math.random() * tagLines.length));
  //     console.log(randomIndex);
  //     setMounted(true);
  //   }, []);

  return (
    <div className="loading-div relative">
      <div className="loader"></div>
      <Image
        src={logo}
        placeholder="blur"
        alt=""
        className="rounded-full absolute top-50 left-50"
        width={100}
        height={100}
      />
      <p className="tagline absolute top-3/4">{tagLines[0]}</p>
    </div>
  );
};

export default loading;
