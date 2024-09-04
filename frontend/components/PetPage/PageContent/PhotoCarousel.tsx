'use client';
import { useState } from 'react';
import Image from 'next/image';
import { ShowPhotoInFullscreen } from './ShowPhotoInFullscreen';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

interface Props {
	imagePath: string;
}

export default function PhotoCarousel({ imagePath }: Props) {
	const [isOpenPhotosInFullscreen, setIsOpenPhotosInFullscreen] =
		useState<boolean>(false);

	const handleOpenFullscreenMode = () => setIsOpenPhotosInFullscreen(true);
	const handleCloseFullscreenMode = () => setIsOpenPhotosInFullscreen(false);

	return (
		<>
			{isOpenPhotosInFullscreen && (
				<ShowPhotoInFullscreen
					handleClose={handleCloseFullscreenMode}
					imagePath={imagePath}
				/>
			)}

			<div className="min-h-[300px] max-h-[400px] flex flex-row justify-center mx-auto mt-6 max-w-2xl">
				<div className="h-fit overflow-hidden rounded-lg lg:block">
					<Swiper
						onClick={handleOpenFullscreenMode}
						modules={[Navigation, Pagination, A11y, EffectCoverflow]}
						effect="coverflow"
						navigation>
						<SwiperSlide>
							<div className="flex flex-row justify-center">
								<Image
									className="object-contain object-center"
									src={imagePath}
									alt="#"
									width={400}
									height={400}
									loading="lazy"
								/>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			</div>
		</>
	);
}
