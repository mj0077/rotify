'use client'

import { useState, useEffect } from 'react';
import Loading from '@/app/loading';

export default function LoadingWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? <Loading /> : children;
}

// 'use client'

// import { useState, useEffect } from 'react'
// import Loading from '@/app/loading'

// export default function LoadingWrapper({ children }) {
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     // Check if the document is fully loaded
//     if (document.readyState === 'complete') {
//       console.log('readyState = complete')
//       setIsLoading(false)
//     } else {
//       window.addEventListener('load', () => setIsLoading(false))
      
//       // Cleanup listener
//       return () => window.removeEventListener('load', () => setIsLoading(false))
//     }
//   }, [])

//   // Show loading spinner while page is loading
//   if (isLoading) {
//     return <Loading />
//   }

//   // Show actual content once loaded
//   return <>{children}</>
// }