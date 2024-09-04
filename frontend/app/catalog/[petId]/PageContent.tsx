'use client';
import Breadcrumb from '@/components/PetPage/PageContent/Breadcrumb';
import PhotoCarousel from '@/components/PetPage/PageContent/PhotoCarousel';
import Title from '@/components/PetPage/PageContent/Title';
import Option from '@/components/PetPage/PageContent/Option';
import Details from '@/components/PetPage/PageContent/Details';
import Comments from '@/components/PetPage/PageContent/Comments';
import { Pet } from '@/types/catalog';
import { CommentType } from '@/types/comment';
import { useEffect, useState } from 'react';
import { ShowSuccessNotification } from '@/components/PetPage/PageContent/ShowSuccessNotification';
import { store } from '@/app/store/store';
import { addToCart } from '@/app/store/storeUtils';

interface Props {
	pet: Pet;
}

export default function PageContent({ pet }: Props) {
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);
	const productComments: CommentType = [];

	const handleClickBuyButton = () => {
		addToCart(pet);
		setIsOpenSuccessWindow(true);
	};

	const sendCommentToServer = () => {
		console.log('clicked');
	};

	useEffect(() => {
		if (!isOpenSuccessWindow) return;

		setTimeout(() => {
			setIsOpenSuccessWindow(false);
		}, 2500);
	}, [isOpenSuccessWindow]);

	return (
		<>
			{isOpenSuccessWindow && (
				<ShowSuccessNotification successText="You have successfully added this item to your cart" />
			)}

			<div className="pt-6">
				<Breadcrumb productTitle={pet.name} />
				<PhotoCarousel imagePath={pet.images} />

				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<Title title={pet.name} />
					<Option
						productPrice={parseInt(pet.price)}
						commentsAmount={productComments.length}
						handleClickBuyButton={handleClickBuyButton}
					/>
					<Details productDescription={pet.description} />
					<Comments
						productComments={productComments}
						sendCommentToServer={sendCommentToServer}
					/>
				</div>
			</div>
		</>
	);
}
