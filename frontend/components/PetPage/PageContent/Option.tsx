import { LegacyRef, useRef, useEffect } from 'react';
import { useUserData } from '@/hooks/useUserDataContext';

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
	const authorizeUserData = useUserData();
	const addToCartButtonRef = useRef<HTMLButtonElement>();

	useEffect(() => {
		if (addToCartButtonRef.current)
			addToCartButtonRef.current.disabled = !authorizeUserData.data?.name;
	}, [authorizeUserData]);

	return (
		<>
			{/* Options */}
			<div className="mt-4 lg:row-span-3 lg:mt-0">
				<h2 className="sr-only">Product information</h2>
				<p className="text-3xl tracking-tight text-gray-900 dark:text-white">
					${productPrice}
				</p>

				{/* Reviews */}
				<div className="mt-6">
					<div className="flex items-center">
						<a className="text-sm font-medium text-indigo-600 dark:text-[orange] hover:text-indigo-500">
							{commentsAmount} reviews
						</a>
					</div>
				</div>
				<button
					ref={addToCartButtonRef as LegacyRef<HTMLButtonElement>}
					onClick={handleClickBuyButton}
					className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white dark:bg-orange-600 dark:hover:bg-orange-700 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50">
					Add to bag
				</button>
			</div>
		</>
	);
}
