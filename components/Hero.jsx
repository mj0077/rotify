import Image from 'next/image'
import SearchForm from './SearchForm'

const Hero = () => {

	return (
		<>
			<div className='md:pb-48 lg:pb-20 hero-background text-yellow-300'>
				{/* <Image
					width={100}
					height={100}
					objectFit="cover"
					src={bgImage}
					alt=""
				/> */}
				<div className=" container flex flex-col justify-items-start h-80 py-12 mx-auto lg:pb-56 lg:mt-0 mt-24 md:py-20 md:px-10 lg:px-32">
					<h1 className="text-3xl font-extrabold md:text-5xl md:mt-16 xl:max-w-3xl">Your search for Home-cooked food <br/> ends here.</h1>
					<p className="mt-6 mb-8 text-xl sm:mb-8 xl:max-w-3xl">Just tell us where and when!</p>
					{/* <div className="flex flex-wrap">
						<SearchForm/>
					</div> */}
				</div>
			</div>
		</>
	)
}

export default Hero
