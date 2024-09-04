import { useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

interface Props {
	handleClose: () => void;
	imagePath: string;
}

export default function FullscreenPhotoCarousel({
	handleClose,
	imagePath,
}: Props) {
	useEffect(() => {
		document.body.classList.add('overflow-hidden');

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	}, []);

	useEffect(() => {
		const handleClickEsc = (event: any) => {
			if (event.key === 'Escape') handleClose();
		};

		document.addEventListener('keydown', handleClickEsc);

		return () => {
			document.removeEventListener('keydown', handleClickEsc);
		};
	}, []);

	return (
		<div className="w-screen h-screen overflow-hidden bg-gray-800 bg-opacity-70">
			<button
				className="absolute right-[45px] top-[0.7rem] text-[2.5rem] h-fit transition-all ease-linear duration-100 text-white scale-[1.2] hover:scale-[1.5] hover:text-[orange]"
				onClick={handleClose}>
				&times;
			</button>
			<div className="h-full flex justify-center items-center overflow-hidden">
				<Swiper
					modules={[Navigation, Pagination, A11y, EffectCoverflow]}
					effect="coverflow"
					navigation>
					<SwiperSlide>
						<Image
							className="max-h-screen w-full object-contain object-center"
							src={imagePath}
							alt="#"
							width={1000}
							height={1000}
							loading="lazy"
						/>
					</SwiperSlide>
				</Swiper>
			</div>
		</div>
	);
}
