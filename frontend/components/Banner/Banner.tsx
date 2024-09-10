import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
	return (
		<div className="reletive w-full flex-[2_1_auto]">
			<Image
				src="https://www.ageucate.com/blog/wp-content/uploads/2019/04/Puppy-and-Kitten-hug.jpg"
				alt="#"
				priority={true}
				className="sm:m-auto sm:px-4 w-[1200px] h-[600px] max-sm:h-[300px]"
				width={2000}
				height={1000}
			/>
			<div className="absolute top-[48%] left-[48%] max-sm:top-[17%]">
				<div className="absolute -top-1/2 right-1/4 w-52 h-64 bg-gray-700/85 rotate-45 z-[5] max-sm:scale-[0.8]" />
				<div className="relative -left-1/3 flex flex-col justify-center">
					<em className="z-10 text-white text-right sm:mr-1 max-sm:text-sm max-sm:ml-5">
						Welcome to
					</em>
					<h1 className="z-10 text-[#ffb32d] text-4xl">Grandezza</h1>
					<p className="z-10 text-white mb-4 pb-lg-2">
						your <u>favourite</u> nursery
					</p>
					<div className="z-10 flex flex-row max-sm:flex-col max-sm:items-center max-sm:mr-6">
						<Link
							className="text-white btn custom-btn custom-border-btn smoothscroll me-3"
							href="#about-us-section">
							Our Story
						</Link>
						<Link
							className="z-10 text-white btn custom-btn smoothscroll me-2 mb-2"
							href="/catalog">
							<strong>Catalog</strong>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
