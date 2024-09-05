'use client';
import { store } from '@/app/store/store';
import { clearCart } from '@/app/store/storeUtils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ManageButtons() {
	const [isCartEmpty, setIsCartEmpty] = useState(
		store.getState().cart?.length === 0
	);
	const router = useRouter();

	const handleContinueShopping = () => {
		router.push('/catalog');
	};

	const handleClearCart = () => {
		clearCart();
		router.refresh();
		setIsCartEmpty(true);
	};

	const handleConfirmPurchase = () => {
		console.log('confirm purchase');
	};

	return (
		<div>
			{isCartEmpty ? (
				<button
					className="flex w-full items-center justify-center rounded-md border border-transparent p-3 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
					onClick={handleContinueShopping}>
					Continue shopping
				</button>
			) : (
				<div className="flex flex-row gap-2">
					<button
						className="flex w-full items-center justify-center rounded-md border border-transparent p-3 text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none"
						onClick={handleClearCart}>
						Clear cart
					</button>
					<button
						className="flex w-full text-nowrap items-center justify-center rounded-md border border-transparent p-3 text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none"
						onClick={handleConfirmPurchase}>
						Confirm purchase
					</button>
				</div>
			)}
		</div>
	);
}
