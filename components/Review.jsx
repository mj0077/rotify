import Image from 'next/image';
import React from 'react'

const reviews = [
    {
      text: 'This is an amazing platform to meet intellectuals contemplating to the field of pattern recognition and image processing. The field has paramount importance, my bag is full of ideas, innovation and practices that I can implement in my research. Thanks to the brilliant team.',
      name: 'Tripti Goel',
      school: 'National Institute of Technology, New Delhi',
      imageUrl: '/assets/images/tripti.jpg'
    },
    {
      text: 'This is an amazing platform to meet intellectuals contemplating to the field of pattern recognition and image processing. The field has paramount importance, my bag is full of ideas, innovation and practices that I can implement in my research. Thanks to the brilliant team.',
      name: 'Harshal Gunwant',
      school: 'The Doon School, Dehradun',
      imageUrl: '/assets/images/harshal.jpg'
    },
    {
      text: 'This is an amazing platform to meet intellectuals contemplating to the field of pattern recognition and image processing. The field has paramount importance, my bag is full of ideas, innovation and practices that I can implement in my research. Thanks to the brilliant team.',
      name: 'Pawan Singh Kori',
      school: 'IGNTU Madhya Pradesh',
      imageUrl: '/assets/images/pawan.jpg'
    }
  ];
const Review = () => {
    return (
        <div className="review-wrapper active" >
            <div className="review-content">
                <span className="commas opening-quote"></span>
                <p className="review-text">
                { reviews.text }
                </p>
                <span className="commas closing-quote"></span>
            </div>
            <div className="reviewer-section">
                <div className="reviewer-avatar">
                    <Image src={reviews.imageUrl} alt={reviews.name} className="reviewer-image" />
                    </div>
                    <div className="reviewer-info">
                    <div className="reviewer-name">{ reviews.name }</div>
                    <div className="reviewer-school">{ reviews.school }</div>
                </div>
            </div>
        </div >

        
  )
}

export default Review