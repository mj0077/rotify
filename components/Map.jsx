import React from 'react'
// import 'dotenv/config'

const Map = () => {
    return (
        <>
            <h1 className="sm:text-5xl sm:fw-fw-bolder text-4xl fw-bold text-center text-yellow-300">Our Service Area</h1>
            <div className="map my-16 xl:mx-52 lg:mx-44 md:mx-32 mx-4 w-screen sm:w-3/4">
                <iframe
                    title="service-area"
                    width="100%"
                    height="450"
                    style={{ "border": 0, "filter": 'brightness(0.8)', "width": '90%' }}
                    loading="lazy"
                    allowFullScreen
                    frameBorder="0"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=lakhmi vihar&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
            </div>
        </>
    )
}

export default Map