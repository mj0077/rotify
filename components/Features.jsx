import React from 'react'
import Image from 'next/image'
import meals from '@/assets/images/meals.jpg'
import fresh from '@/assets/images/fresh.jpg'
import delivery from '@/assets/images/delivery.jpg'
// import PropertyCard from './PropertyCard'

const FeaturesPage = () => {
    // const getFeaturedProperties = () => properties.filter(property => property.is_featured);

    return (
        <>
            {/* HOME COOKED */}


            {/* FRESH */}

            <div className="bg-kitchen bg-cover features-section">
                <div className="w-full dark:bg-gray-800 dark:text-white wrapper">
                    <div className="w-full md:w-4/5 mx-auto py-12 md:py-24">
                        <div className="w-full flex flex-col text-center md:mb-20">
                            <h1 className="text-4xl md:text-5xl font-semibold text-yellow-100 dark:text-white mb-4">
                                {/* Our */} <span className="text-yellow-300">How it Works</span>
                            </h1>
                            {/* <p className="w-full px-[12%] mb-3 text-base md:text-xl whitespace-pre-line text-yellow-100">
                                Here's what <span className="text-yellow-300">people </span>love us for.
                            </p> */}
                        </div>
                        <div className="flex flex-col md:flex-row px-2 md:px-6 md:pt-18 dark:text-white mt-8">
                            <div className="w-full md:w-1/2 border-b-1 text-gray-500 border-b border-gray-200 dark:border-gray-700 md:border-b-0 md:border-r md:border-gray-200 items-center text-center px-8 py-5 flex flex-col">
                                <Image src={meals} className="rounded-full h-32 w-32" alt="" title="" />
                                <h1 className="my-8 font-semibold text-yellow-300 dark:text-white text-2xl">Choose Your Meal Plan</h1>
                                {/* <h2 className="mt-1 mb-4 text-yellow-100 dark:text-gray-400 font-thin text-xl">Components</h2> */}
                                <p className="leading-7 font-base md:font-thin text-yellow-100 mb-12 md:!mb-0">Select from our variety of meal plans that suit your dietary preferences and requirements.</p>
                            </div>
                            <div className="w-full mt-8 md:!mt-0 md:w-1/2 border-b-1 text-gray-500 border-b border-gray-200 dark:border-gray-700 md:border-b-0 md:border-r md:border-gray-200 items-center text-center px-8 py-5 flex flex-col">
                                <Image src={fresh} className="rounded-full h-32 w-32" alt="" title="" />
                                <h1 className="my-8 font-semibold text-yellow-300 dark:text-white text-2xl">We Cook Fresh Daily</h1>
                                {/* <h2 className="mt-1 mb-4 text-yellow-100 dark:text-gray-400 font-thin text-xl">Elements</h2> */}
                                <p className="leading-7 font-base md:font-thin text-yellow-100 mb-12 md:!mb-0">Our chefs prepare your meals with fresh ingredients and authentic recipes every day.</p>
                            </div>
                            <div className="w-full mt-8 md:!mt-0 md:w-1/2 border-b-1 text-gray-500 border-b border-gray-200 dark:border-gray-700 md:border-b-0 md:border-gray-200 items-center text-center px-8 py-5 flex flex-col">
                                <Image src={delivery} className="rounded-full h-32 w-32" alt="delivery" title="" />
                                <h1 className="my-8 font-semibold text-yellow-300 dark:text-white text-2xl">Enjoy Doorstep Delivery</h1>
                                {/* <h2 className="mt-1 mb-4 text-yellow-100 dark:text-gray-400 font-thin text-xl">Components</h2> */}
                                <p className="leading-7 font-base md:font-thin text-yellow-100 mb-12 md:!mb-0">Get your hot, delicious tiffin delivered right to your home or office on time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default FeaturesPage
