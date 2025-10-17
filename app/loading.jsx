'use client'
// import CircularText from './CircularText';
// import { useEffect } from 'react';
// import { motion, useAnimation, useMotionValue } from 'motion/react';
import logo from "@/assets/images/footer-logo.jpeg";
import Image from 'next/image';


const loading = () => {
    return (
        <div className='loading-div relative'>
            <div className="loader">
            </div>
            <Image src={logo} alt="" className='rounded-full absolute top-50 left-50' width={100} height={100} />
        </div>
    )
}

export default loading
