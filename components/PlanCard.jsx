import React from 'react'

const PlanCard = ( props ) => {

  const { plan_id, plan_name, plan_pricing } = props.details;

  return (
    <div className='sm:mb-5 z-20 text-gray-50'>
      <div className="w-screen max-w-sm p-4 border border-gray-800 rounded-lg plan-card sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-4 text-xl font-medium text-gray-50 dark:text-gray-400">
          { `${plan_name} plan` }
        </h5>
        <div className="flex items-baseline text-yellow-300 dark:text-white">
          <span className="text-3xl font-semibold">₹</span>
          <span className="mx-1 text-4xl font-bold tracking-tight">{plan_pricing.plate}</span>
          <span className="ms-1 text-xl font-normal text-gray-50 dark:text-gray-400">
            /plate
          </span>
        </div>
        <ul role="list" className="space-y-5 my-7">
          <li className="flex items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-green-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-50 dark:text-gray-400 ms-3">
              2 team members
            </span>
          </li>
          <li className="flex">
            <svg
              className="flex-shrink-0 w-4 h-4 text-green-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-50 dark:text-gray-400 ms-3">
              20GB Cloud storage
            </span>
          </li>
          <li className="flex">
            <svg
              className="flex-shrink-0 w-4 h-4 text-green-700 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-50 dark:text-gray-400 ms-3">
              Integration help
            </span>
          </li>
          <li className="flex line-through decoration-gray-50">
            <svg
              className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-50"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-50 ms-3">
              Sketch Files
            </span>
          </li>
          <li className="flex line-through decoration-gray-50">
            <svg
              className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-50"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-50 ms-3">
              API Access
            </span>
          </li>
          <li className="flex line-through decoration-gray-50">
            <svg
              className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-50"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-50 ms-3">
              Complete documentation
            </span>
          </li>
          <li className="flex line-through decoration-gray-50">
            <svg
              className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-50"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-50 ms-3">
              24×7 phone & email support
            </span>
          </li>
        </ul>
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center"
        >
          Choose plan
        </button>
      </div>
    </div>
  )
}

export default PlanCard
