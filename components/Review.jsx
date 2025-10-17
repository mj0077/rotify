import Image from 'next/image';
import React from 'react'

const Review = () => {
  const reviews = [
      {
        text: 'Actually it tastes like "Ghar ka khana". Simple yet tasty. Do order from them. Hygienically packed and comes in neat and clean tiffins.\nFood: 5/5  |  Service: 5/5  |  Atmosphere: 5/5',
        name: 'Kislay Bhardwaj',
        imageUrl: ''
      },
      {
        text: 'Best quality at an affordable price and tastes just like you cook at your home. The use of spices and oil is also optimum and you can feel that it is healthy. Highly recommended for anyone who wants to have home cooked food.',
        name: 'Navneet Raj Vaish',
        imageUrl: '/../assets/images/navneet.png'
      },
      {
        text: 'Bhoot hi jyada tasty khana Milta hai bilkul ghar jaisa bilkul maa ke hath ki tarah khud bnate hai khud packing krte hai khud hi delivered bhi krte hai covid time pr bilkul safe hai. Ek bar jarur try krke dekhe. Thank you.',
        name: 'Pandit Suraj Bharala',
        imageUrl: '/assets/images/suraj.png'
      }
    ];

    
  return (
    <>
      { reviews.map((review, idx) => 
        <div key={idx} className="bg-linear-[90deg] from-blue-400 to-purple-800 backdrop-blur-md rounded-xl shadow-[-1px_-1px_1px_#fff5,1px_1px_1px_#000,0_1px_35px_#0003] p-5 flex flex-col h-full">
            {/* Quotation mark icon */}
            <div className="text-4xl text-blue-300 font-bold mb-2 rounded-full bg-[#e1e1e1] w-8 h-8 grid place-items-center">
                <svg width="15" height="14" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5003 17.5C17.9976 17.5 18.4745 17.3025 18.8262 16.9508C19.1778 16.5992 19.3753 16.1223 19.3753 15.625V11.0462C19.3753 10.549 19.1778 10.0721 18.8262 9.72042C18.4745 9.36879 17.9976 9.17125 17.5003 9.17125H14.8978C14.8978 8.51312 14.9372 7.85313 15.0141 7.195C15.1303 6.4975 15.3253 5.87688 15.5953 5.335C15.8672 4.79125 16.216 4.36562 16.6435 4.05437C17.0691 3.70563 17.611 3.53125 18.271 3.53125V0.625C17.1853 0.625 16.2366 0.8575 15.4209 1.3225C14.6124 1.78279 13.9173 2.41835 13.3866 3.1825C12.8539 4.02496 12.4613 4.94818 12.2241 5.91625C11.985 6.98455 11.868 8.07655 11.8753 9.17125V15.625C11.8753 16.1223 12.0729 16.5992 12.4245 16.9508C12.7761 17.3025 13.253 17.5 13.7503 17.5H17.5003ZM6.25033 17.5C6.74761 17.5 7.22452 17.3025 7.57615 16.9508C7.92778 16.5992 8.12533 16.1223 8.12533 15.625V11.0462C8.12533 10.549 7.92778 10.0721 7.57615 9.72042C7.22452 9.36879 6.74761 9.17125 6.25033 9.17125H3.64783C3.64783 8.51312 3.6872 7.85313 3.76407 7.195C3.88032 6.4975 4.07533 5.87688 4.34533 5.335C4.6172 4.79125 4.96595 4.36562 5.39345 4.05437C5.81908 3.70563 6.36095 3.53125 7.02095 3.53125V0.625C5.93533 0.625 4.98658 0.8575 4.17095 1.3225C3.36242 1.78279 2.66728 2.41835 2.13657 3.1825C1.60393 4.02496 1.21135 4.94818 0.974075 5.91625C0.734986 6.98455 0.617986 8.07655 0.625325 9.17125V15.625C0.625325 16.1223 0.822869 16.5992 1.1745 16.9508C1.52613 17.3025 2.00304 17.5 2.50033 17.5H6.25033Z" fill="#1FB1D6" />
                </svg>

            </div>

            {/* Testimonial text */}
            <p className="text-[15px] font-medium leading-relaxed mb-3 flex-grow text-xs">
                {review.text}
            </p>

            {/* Profile information */}
            <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 mr-2 flex-shrink-0">
                    {review.imageUrl ? (
                        <Image
                            src={review.imageUrl}
                            alt={review.name}
                            className="w-full h-full rounded-full object-cover" width="100" height="100"
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">
                                {review.name?.charAt(0)}
                            </span>
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-semibold tracking-wide text-sm text-blue-300">{review.name}</h4>
                    {/* <p className="text-[8px]">{review.school}</p> */}
                </div>
            </div>
        </div>
        )}            
      </>  
  )
}

export default Review