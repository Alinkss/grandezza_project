'use client';
import { store } from '@/app/store/store';
import { LegacyRef, useRef, useEffect } from 'react';

interface Props {
	productPrice: number;
	commentsAmount: number;
	handleClickBuyButton: () => void;
}

export default function Option({
	productPrice,
	commentsAmount,
	handleClickBuyButton,
}: Props) {
	const isUserAuthorized = !!store.getState().user?.sessionId;
	const addToCartButtonRef = useRef<HTMLButtonElement>();

	useEffect(() => {
		if (addToCartButtonRef.current) {
			addToCartButtonRef.current.disabled = !isUserAuthorized;
		}
	}, [isUserAuthorized]);

	return (
		<>
			<div className="mt-4 lg:row-span-3 lg:mt-0">
				<h2 className="sr-only">Product information</h2>
				<p className="text-3xl tracking-tight text-gray-900">${productPrice}</p>
				<div className="mt-6">
					<div className="flex items-center">
						<a className="text-sm font-medium text-[orange]">
							{commentsAmount} reviews
						</a>
					</div>
				</div>
				<button
					ref={addToCartButtonRef as LegacyRef<HTMLButtonElement>}
					onClick={handleClickBuyButton}
					className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white bg-orange-600 hover:bg-orange-700 disabled:hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50">
					Add to bag
				</button>
			</div>
		</>
	);
}
