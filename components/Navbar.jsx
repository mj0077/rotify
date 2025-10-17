"use client";
import React, { useState } from "react";
import logo from "@/assets/images/logo.png";
import menu from "@/assets/images/menu.webp";
import menuIcon from "@/assets/images/menu_icon.jpg";
import closeIcon from "@/assets/images/close_icon.webp";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [session, setSession] = useState(false);
  // const path = usePathname();
  // const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    // Menu button rotate animation
    tl.to('.menu-button', {
      rotateY: 90,
      duration: .1,
    }),
    tl.from('.close-button', {
      rotateY: -90,
      duration: .1
    })

    const menuTL = gsap.timeline({paused: true});

    // Nav menu entry animation (rev for exit)
    menuTL.to('.nav-menu', {
      x: '0',
      ease: "power3.out",
      duration: 0.3
    })
    menuTL.from('.nav-menu div a', {
      opacity: 0,
      x: '10%',
      stagger: 0.075,
      duration: 0.3,
      delay: -0.05
    })

    // Nav menu background animation
    gsap.to('.nav-menu', {
      backgroundPositionY: '50%',
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    })

    document.querySelector('.menu-button').addEventListener('click', () => {
      tl.play();
      menuTL.play();
    })

    document.querySelector('.close-button').addEventListener('click', () => {
      tl.reverse();
      menuTL.reverse();
    })
    Array.from(document.querySelectorAll('.nav-menu div a')).forEach( (elem) => elem.addEventListener('click', () => {
      tl.reverse();
      menuTL.reverse();
    }))
  })

  // const onCLickHandler = (e) => {
  //   console.log(e.target);
  //   e.target.classList.toggle('opened');
  //   e.target.setAttribute('aria-expanded', e.target.classList.contains('opened'));
  // }

  return (
    <div className="z-10 navbar mx-auto rounded-[30px]">
      <nav className="bg-gradient-to-b from-[#971303] to-[#FF000D] shadow-nav"> {/* "nav-bg" */}
        <div className="mx-auto max-w-7xl md:px-2 lg:px-6">
          <div className="relative flex h-16 items-center justify-content-between">

            {/* ROTIFY Logo */}
            <div className="basis-1/3">
              <Link className="flex items-center" href="/">
                <Image
                  className="logo"
                  src={logo}
                  alt="ROTIFY logo"
                  priority
                />
              </Link>
            </div>

            {/* Navbar Menu + Navigation Links */}
            <div className="nav-menu absolute top-0 -mt-[53px] right-0 -mr-[122px] h-[100vh] w-[45vw] items-center justify-center sm:items-stretch sm:justify-end basis-1/4">
              <div className="sm:ml-6 h-full flex items-center">
                <div className="flex flex-col space-x-4">
                  <Link
                    href="/"
                    className="hover:text-white ml-3.5 rounded-md px-3 py-1"
                    aria-current="page"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="hover:text-white rounded-md px-3 py-1"
                  >
                    About Us
                  </Link>
                  <Link
                    href="/plans"
                    className="hover:text-white rounded-md px-3 py-1"
                  >
                    Plans & Pricing
                  </Link>
                  <Link
                    href="https://wa.me/918266882636"
                    className="hover:text-white rounded-md px-3 py-1"
                  >
                    Contact Us
                  </Link>
                  {/* <Link
                    href="/schedule"
                    className="hover:text-white rounded-md px-3 py-1"
                  >
                    Schedule Meal
                  </Link> */}
                  {/* {session && (
                    <Link
                      href="/kitchen/add-meal"
                      className="text-gray-300 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                      Add Meal
                    </Link>
                  )} */}
                </div>
              </div>
              <span className="absolute bottom-10 right-24 text-[20px]">ROTIFY</span>
            </div>

            {/* <!-- Mobile menu button--> */}
            <div className="absolute -right-7 inset-y-0 flex items-center menu-btn-wrapper">
              <Image src={menu} alt="menu button" width="110" className="absolute menu-btn" />

              <button type="button" className="relative scale-[60%] menu" aria-label="Main Menu">
                  <Image src={menuIcon}
                    alt="hamburger menu icon"
                    width="100"
                    className="rounded-full menu-button absolute"
                    onClick={() => {
                      setTimeout(() => {
                        setIsMenuOpen(true);
                      }, 200);
                    }} />

                    <Image src={closeIcon}
                      alt="hamburger close icon"
                      width="100"
                      className="close-button"
                      onClick={() => setIsMenuOpen(false)} />
              </button>
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
            {/* {session && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 basis-1/4">
                <span className="text-gray-200 px-2 mr-2 block">
                  Welcome, user session.user.name
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
            )} */}
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        {/* {isMobileMenuOpen && (
          <div id="mobile-menu">
            <div className="px-4 pb-3 pt-2">
              <Link
                href="/"
                className="text-white hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base"
                aria-current="page"
              >
                Home
              </Link>

              <Link
                href="/plans"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md mb-3 px-3 py-2 text-base"
              >
                Plans and Pricing
              </Link>

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
            </div>
          </div>
        )} */}
      </nav>
    </div>
  );
};

export default Navbar;
