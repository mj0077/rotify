import React from 'react'
import Review from './Review'

const ReviewsSection = () => {
  return (
    <>
      <h1 className="text-center text-yellow-300 text-4xl md:text-5xl mb-20">Our Testimonials</h1>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-5">
        <Review />
      </div>
    </>
  )
}

export default ReviewsSection