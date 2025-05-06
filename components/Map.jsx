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
                    src={`https://www.google.com/maps/embed/v1/search?q=rotify+lakhmi+vihar&key=${process.env.GOOGLE_KEY}`}></iframe>
            </div>
        </>
    )
}

export default Map