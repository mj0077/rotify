"use client";
// import { signIn, useSession } from 'next-auth/react'
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const InfoBoxes = () => {
  // const {data: session} = useSession();
  return (

    <>
      <div className="container-md lg:container-sm sm:ml-28 mr-20 mt-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg text-white">
          <Link href="https://wa.me/918266882636">
            <div className="bg-blue-500/30 p-6 rounded-lg shadow-md infoboxes-cards" id="whatsapp-card">
              <h2 className="text-2xl font-bold text-yellow-300">Contact Us</h2>
              <p className="mt-2 mb-4">
                Check out Today's Menu, and let us know what suits you the best.
              </p>
              <span
                href="https://wa.me/918266882636"
                className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-gray-700 flex w-52"
              >
                <FaWhatsapp className="text-xl" /> &nbsp; Chat on Whatsapp
              </span>
            </div>
          </Link>
          {/* <div className="bg-blue-500/30 p-6 rounded-lg shadow-md infoboxes-cards" id="schedule-card">
            <h2 className="text-2xl font-bold text-yellow-300">Schedule Your Meal</h2>
            <p className="mt-2 mb-4">
              Plan and book your meals ahead.
            </p>
            <Link
              href="/today"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Schedule Meal
            </Link>
          </div> */}
        </div>
      </div>
    </>

  );
};

export default InfoBoxes;
