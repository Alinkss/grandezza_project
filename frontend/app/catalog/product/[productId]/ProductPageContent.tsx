'use client';
import Breadcrumb from '@/components/PetPage/Breadcrumb';
import PhotoCarousel from '@/components/PetPage/PhotoCarousel';
import Title from '@/components/PetPage/Title';
import Option from '@/components/PetPage/Option';
import Details from '@/components/PetPage/Details';
import { useEffect, useState } from 'react';
import { ShowSuccessNotification } from '@/components/PetPage/ShowSuccessNotification';
import { addToCart } from '@/app/store/storeUtils';
import { Product } from '@/types/catalog';
import { CommentType } from '@/types/comment';
import Comments from '@/components/PetPage/Comments';

interface Props {
	product: Product;
}

export default function ProductPageContent({ product }: Props) {
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);
	const productComments: CommentType = [];

	const handleClickBuyButton = () => {
		addToCart(product);
		setIsOpenSuccessWindow(true);
	};

	const sendCommentToServer = async () => {};

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
				<Breadcrumb productTitle={product.name} />
				<PhotoCarousel imagePath={'/' + product.image} />

				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<Title title={product.name} />
					<Option
						productPrice={parseInt(product.price)}
						commentsAmount={productComments.length}
						handleClickBuyButton={handleClickBuyButton}
					/>
					<Details productDescription={product.description} />
					<Comments
						productComments={productComments}
						sendCommentToServer={sendCommentToServer}
					/>
				</div>
			</div>
		</>
	);
}
