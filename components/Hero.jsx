import Image from 'next/image'
// import SearchForm from './SearchForm'

const Hero = () => {

	return (
		<>
			<div className='md:pb-48 lg:pb-20 hero-background text-[#FCDF59]'>
				{/* <Image
					width={100}
					height={100}
					objectFit="cover"
					src={bgImage}
					alt=""
				/> */}
				<div className="flex flex-col items-end pt-8 mt-24 md:h-80 md:py-28 md:px-[10%] lg:my-3 lg:px-[7.5%] lg:pb-56">
					<h1 className="text-right font-extrabold xs:mt-14 sm:text-4xl md:text-[4.25rem] md:mt-16 md:max-w-xl lg:max-w-2xl">Your search for Home-cooked food <br/> ends here.</h1>
					<p className="text-right mt-4 mb-16 text-[22px] sm:mb-8 max-w-lg oswald-font">Just tell us where and when!</p>
					{/* <div className="flex flex-wrap">
						<SearchForm/>
					</div> */}
				</div>
			</div>
		</>
	)
}

export default Hero
