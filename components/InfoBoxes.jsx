"use client";
// import { signIn, useSession } from 'next-auth/react'
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

// const boxesInfo = {
//   whatsapp: {
//     id: "whatsapp-card",
//     title: "Contact Us",
//     description: "Check out Today&apos;s Menu, and let us know what suits you the best.",
//     buttonText: "Chat on Whatsapp",
//     buttonIcon: <FaWhatsapp className="text-lg sm:text-xl" />,
//   },
//   schedule: {
//     id: "schedule-card",
//     title: "Schedule Your Meal",
//     description: "Plan and book your meals ahead.",
//     buttonText: "Schedule Meal",
//   },
// }

const InfoBoxes = ({ onOpen }) => {

  // const {data: session} = useSession();
  return (

    <>
      <div className="infoboxes-wrapper sm:w-4/5 lg:w-3/4 lg:container-sm relative sm:left-[17%] lg:left-[20%] sm:mt-3">
        <div className="flex flex-col lg:flex-row justify-between gap-4 p-4 px-8 rounded-lg text-[#FCDF59] ">

          <Link href="https://wa.me/918266882636" className="md:overflow-hidden rounded-xl">
            <div className="pt-1.5 p-2 sm:p-3 px-4 rounded-lg shadow-md infoboxes-cards" id="whatsapp-card">
              <h2 className="sm:text-[26px] font-bold text-yellow-300">Contact Us</h2>
              <p className="mt-1 mb-2 font-semibold">
                Check out Today&apos;s Menu, and let us know what suits you the best.
              </p>
              <span
                // href="https://wa.me/918266882636"
                className="bg-gradient-to-r from-green-600 to-lime-400 text-white rounded-xl px-2 sm:px-4 py-1.5 hover:bg-black flex w-fit"
              >
                <FaWhatsapp className="text-lg sm:text-xl" /> &nbsp; Chat on Whatsapp
              </span>
            </div>
          </Link>

          <div className="flex-1 p-3 px-4 rounded-lg shadow-md infoboxes-cards" id="schedule-card">
            <h2 className="sm:text-[26px] font-bold text-yellow-300">Schedule Your Meal</h2>
            <p className="mt-1 mb-2 font-semibold">
              Plan and book your meals ahead.
            </p>
            <button
              type="button"
              onClick={onOpen}
              className="bg-gradient-to-r from-green-600 to-lime-400 text-white rounded-xl px-4 py-1.5 max-w-[140px] hover:bg-gray-700"
            >
              Schedule Meal
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default InfoBoxes;

{/* {Object.keys(boxesInfo).map(card => (
            <div className="flex-1 p-3 px-4 rounded-lg shadow-md infoboxes-cards" id={card.id} key={card.id}>
              <h2 className="sm:text-[26px] font-bold text-yellow-300">{card.title}</h2>
              <p className="mt-1 mb-2 font-semibold">
                {card.description}
              </p>
              <button
                type="button"
                onClick={onOpen}
                className="bg-gradient-to-r from-green-600 to-lime-400 text-white rounded-xl px-4 py-1.5 max-w-[140px] hover:bg-gray-700"
              >
                {card.buttonIcon? card.buttonIcon : ""} &nbsp; {card.buttonText}
              </button>
            </div>
          ))} */}