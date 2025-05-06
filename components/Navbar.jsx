"use client";
import React, { useRef, useState } from "react";
import logo from "@/assets/images/logo.png";
// import defaultProfile from '@/assets/images/profile.png';
// import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
// import { FaGoogle } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaWhatsapp } from "react-icons/fa6";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [session, setSession] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const { data: session, status } = useSession();
  // const providers = getProviders();

  // console.log({session: session, status: status, providers: providers})

  return (
    <div className="z-10 navbar mx-auto">
      <nav className="bg-red-600/15 shadow-nav"> {/* "nav-bg" */}
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex flex-row h-20 items-center justify-content-between">

            {/* <!-- Mobile menu button--> */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              // onClick={(prev) => setIsMobileMenuOpen((prev) => !prev)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                {/* <!-- Icon when menu is closed. Menu open: "hidden", Menu closed: "block"--> */}
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                {/* <!-- Icon when menu is open. Menu open: "block", Menu closed: "hidden"--> */}
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* ROTIFY Logo */}
            <div className="basis-1/3">
              <Link className="flex flex-shrink-0 items-center" href="/">
                <Image
                  className="logo"
                  src={logo}
                  alt="ROTIFY logo"
                  priority
                />
              </Link>
            </div>

            {/* Navbar Navigation Links */}
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end  basis-1/4">
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                  <Link
                    href="/"
                    className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                    aria-current="page"
                  >
                    Home
                  </Link>
                  {/* <Link
                    href="/schedule"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Schedule Meal
                  </Link> */}
                  <Link
                    href="/plans"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Plans and Pricing
                  </Link>
                  {session && (
                    <Link
                      href="/kitchen/add-meal"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Add Meal
                    </Link>
                  )}
                </div>
              </div>
            </div>


            {/* <!-- Right Side Menu (Logged Out) --> */}
            {/* {!session && (
              <div className="hidden md:block md:ml-6 basis-1/4">
                <div className="flex items-center">
                  <button
                    onClick={() => {
                      // signIn();
                      setSession(true);
                    }}
                    className="flex items-center text-white bg-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2"
                  >
                    <FcGoogle className="text-white mr-2 text-xl" />
                    <FaGithub className="mr-2 text-xl" />
                    <span>Login or Register</span>
                  </button>
                </div>
              </div>
            )} */}

            {/* <!-- Right Side Menu (Logged In) --> */}
            {session && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 basis-1/4">
                <span className="text-gray-200 px-2 mr-2 block">
                  Welcome, user {/*<b>{session.user.name}</b>*/}
                </span>
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>

                {/* <!-- Profile dropdown --> */}
                <div className="relative ml-3">
                  <div>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                      onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    >
                      {/* onClick={() => setIsProfileMenuOpen((prev) => !prev)}> */}
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full border-2 border-blue-700"
                        width={100}
                        height={100}
                        src={defaultProfile}
                        // src={session.user.image}
                        alt="Default Profile"
                      />
                    </button>
                  </div>

                  {/* <!-- Profile Dropdown menu, show/hide based on menu state.

                                Entering: "transition ease-out duration-100"
                                From: "transform opacity-0 scale-95"
                                To: "transform opacity-100 scale-100"
                                Leaving: "transition ease-in duration-75"
                                From: "transform opacity-100 scale-100"
                                To: "transform opacity-0 scale-95" --> */}

                  {isProfileMenuOpen && (
                    <div
                      id="user-menu"
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex="-1"
                    >
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </Link>
                      <Link
                        href="/properties/saved"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                      >
                        Saved Properties
                      </Link>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="user-menu-item-2"
                        onClick={() => {
                          // signOut();
                          setSession(false)
                        }}
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {isMobileMenuOpen && (
          <div id="mobile-menu">
            <div className="px-4 pb-3 pt-2">
              {/* Home Link */}
              <Link
                href="/"
                className="text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base"
                aria-current="page"
              >
                Home
              </Link>

              {/* Schedule Link */}
              {/* <Link
                href="/schedule"
                className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
              >
                Schedule Meal
              </Link><br/> */}

              {/* Plans Link */}
              <Link
                href="/plans"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md mb-3 px-3 py-2 text-base"
              >
                Plans and Pricing
              </Link>

              {/* Contact Us Link */}
              <span
                href="https://wa.me/918266882636"
                className="bg-green-600 text-white rounded-lg px-3 py-2 mb-3 font-medium hover:bg-gray-700 flex w-44"
              >
                <FaWhatsapp className="text-xl" /> &nbsp; Chat on Whatsapp
              </span>

              {session && (
                <Link
                  href="/kitchen/add-meal"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Add Meal
                </Link>
              )}
              {/* <button
                onClick={() => {
                  // signIn(providers);
                  setSession(true);
                }}
                className="flex items-center text-white bg-gray-900 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2"
              >
                <FcGoogle className="text-white mr-2 text-xl" />
                <span>Login or Register</span>
              </button> */}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
