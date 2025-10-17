'use client'

import Image from 'next/image';
import React from 'react';

import breakfast from '../assets/images/morning.jpg';
import lunch from '../assets/images/noon.webp';
import dinner from '../assets/images/night.avif';

const MealCard = (props) => {

    const { name, plans, imageUrl } = props.details;

    return (
        <div className='relative meal-card'>
            <div className="z-20 relative w-full min-h-44 ml-4 py-12 border border-gray-800 rounded-lg plan-card sm:p-8">
                <Image
                    src={name === "Lunch" ? lunch : name === "Dinner" ? dinner : breakfast}
                    alt={name === "Lunch" ? "lunch" : name === "Dinner" ? "dinner" : "breakfast"}
                    className='w-full h-full mx-auto absolute inset-0 rounded-lg bg-top object-cover' />

                <div className="card-content relative z-20">
                    <h5 className="mb-4 text-4xl md:text-5xl font-medium text-[#FCDF59] drop-shadow-md shadow-slate-950 dark:text-gray-400">
                        {`${name}`}
                    </h5>
                </div>
            </div>

            <div className='pricing h-full'>
                {plans.map(plan => {
                    const { plan_id, plan_name, plan_pricing, plan_features, features_not_incl } = plan;
                    return (<div className="pricing-card text-[#FCDF59]" key={plan_id}>
                        <h1 className='leading-4 text-2xl'>{plan_pricing.plate}</h1>
                        <h5 className={` ${plan_name === 'Deluxe' ? 'text-lime-400 mt-1' : 'text-white mt-1'}`}>{plan_name}</h5>
                        <ul className='mt-2 text-xs flex flex-col justify-center items-center h-2/3'>
                            {plan_features.map(feat => <li key={feat}>{feat}</li>)}
                        </ul>
                    </div>)
                })}
            </div>
        </div>
    )
}

export default MealCard
