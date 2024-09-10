'use client';
import Breadcrumb from '@/components/PetPage/Breadcrumb';
import PhotoCarousel from '@/components/PetPage/PhotoCarousel';
import Title from '@/components/PetPage/Title';
import Option from '@/components/PetPage/Option';
import Details from '@/components/PetPage/Details';
import { useEffect, useState } from 'react';
import { ShowSuccessNotification } from '@/components/PetPage/ShowSuccessNotification';
import { addToCart } from '@/app/store/storeUtils';
import Comments from '@/components/PetPage/Comments';
import { Product } from '@/types/catalog';
import { CommentType } from '@/types/comment';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { store } from '@/app/store/store';

interface Props {
	product: Product;
	comments: CommentType;
}

export default function ProductPageContent({ product, comments }: Props) {
	const token = store.getState().user?.sessionId;

	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);

	const handleClickBuyButton = () => {
		addToCart(product);
		setIsOpenSuccessWindow(true);
	};

	const sendCommentToServer = async (productId: string, text: string) => {
		const jwtTokenForm = new FormData();
		jwtTokenForm.append('token', token!);

		const userId = await axios
			.post(
				process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/blog/get_user_by_jwt',
				jwtTokenForm
			)
			.then((res) => res.data.user_id);

		const newComment = new FormData();
		newComment.append('id', uuidv4());
		newComment.append('user_id', userId);
		newComment.append('text', text);

		await axios
			.post(
				process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/comments/' + productId,
				newComment,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => console.log(res.data));
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
				<Breadcrumb productTitle={product.name} />
				<PhotoCarousel imagePath={'/' + product.image} />

				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<Title title={product.name} />
					<Option
						productPrice={parseInt(product.price)}
						commentsAmount={comments.length}
						handleClickBuyButton={handleClickBuyButton}
					/>
					<Details productDescription={product.description} />
					<Comments
						comments={comments}
						sendCommentToServer={sendCommentToServer}
					/>
				</div>
			</div>
		</>
	);
}
