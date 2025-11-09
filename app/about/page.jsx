import React from 'react'
import about from '../../assets/images/about.avif';
import aboutHeadingBg from '../../assets/images/hero-bg2.avif'
import Image from 'next/image';

const AboutPage = () => {
    return (<>
        <div className='heading h-[50vh] md:h-[60vh] overflow-hidden relative flex items-center justify-center'>
            <Image src={aboutHeadingBg} alt='About Heading background' className='absolute w-full h-full object-cover brightness-75' placeholder='blur'/>
            <h1 className='text-[#fff] text-5xl xs:text-6xl md:text-7xl relative mt-10 md:mt-0 md:mb-5'>about us</h1>
        </div>
        <div className='text-lg md:text-3xl lg:text-4xl text-white py-10 md:py-20 px-10 md:px-20 lg:px-40 bg-[#111] text-justify'>
            <h1 className='text-2xl md:text-5xl lg:text-6xl text-[#FCDF59] mb-10'>
                Welcome to Rotify - your trusted home-style cloud kitchen in Meerut!
            </h1>
            <p className='font-light'>
                For the past 4 years, we&apos;ve been serving wholesome, freshly cooked meals made with love, just like you&apos;d enjoy at home.
            </p>
            <br />
            <Image src={about} alt='' width='80%' placeholder='blur' className='mx-auto my-10 rounded' />
            <br />
            <p> What started as Public Tiffin Box has now grown into Rotify, a name that reflects our passion for bringing you healthy, tasty, and satisfying food every day. <br />
                At Rotify, we believe food is not just about filling your stomach - it&apos;s about nourishing your body and soul.That&apos;s why we carefully prepare every dish with fresh ingredients, balanced nutrition, and the authentic taste of home. Whether it&apos;s breakfast, lunch, or dinner, our goal is to make sure you never miss the comfort of ghar ka khana.

                <br />
                <br />
                We&apos;re more than just a tiffin service - we&apos;re your daily food partner, committed to consistency, hygiene, and timely delivery. With the trust and love of our loyal customers, Rotify continues to grow, one meal at a time.
            </p>
            <br />
            <ul>Our Promise:
                <li>Fresh, hygienic, and homely food</li>
                <li>Variety that keeps your meals exciting</li>
                <li>On - time delivery, every day</li>
                <li>Customer - first approach</li>
            </ul>
            <br />
            <p>Thank you for making us a part of your everyday life. With your support, we look forward to serving you even better in the coming years!</p>
            <br />
        </div>
    </>
    )
}

export default AboutPage