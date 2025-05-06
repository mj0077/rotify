'use client'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SearchForm = () => {
    const [location, setLocation] = useState('');
    const [property, setProperty] = useState('');
    const router = useRouter();

    useEffect(() => {
        console.log(property);
    }, [property])

    const handleSubmit = (e) => {
    	e.preventDefault();
    	// router.push(`/properties?search=${'Boston Common Retreat'}&type=${property}`);
    	router.push(`/properties?loc=${location}&type=${property}`);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* City text box */}
            <input type="text" 
            name="city" 
            id="city" 
            placeholder='Enter Location (City, State, ZIP etc.)' 
            className="rounded-lg px-4 w-72 h-10 text-white dark:focus:ring-white dark:focus:border-white bg-gray-900" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />

            {/* Property Type Select Dropdown */}
            <select name="propertyType"
                id="propertyType"
                value={property}
                // defaultValue='default'
                className=" mx-3 border border-gray-900 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark-900 dark:focus:ring-white dark:focus:border-blue-500 bg-gray-900"
                onChange={(e) => setProperty(e.target.value)}
            >
                
                <option disabled hidden value=''>When</option>
                <option value="all">All</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
            </select>
            {/* <select className="rounded-lg mx-3 px-4 w-48" type="select" name="propertyType" id="propertyType" >
					<option value="all">All</option>
					<option value="spartment">Apartment</option>
					<option value="studio">Studio</option>
					<option value="congo">Congo</option>
					<option value="house">House</option>
					<option value="cottageOrCabin">Cottage or Cabin</option>
					<option value="chalet">Chalet</option>
				</select> */}
            <button type="submit" className="hover:shadow-glow transition duration-250 px-6 py-1.5 text-lg font-semibold rounded-lg border-white border-2 bg-green-700/30 text-white hover:border-green-200 hover:bg-green-500 hover:font-bold">Submit</button>
            {/* <button type="button" className="px-8 py-3 m-2 text-lg border rounded dark:border-gray-700 dark:text-gray-900">Learn more</button> */}

        </form>
    )
}

export default SearchForm
