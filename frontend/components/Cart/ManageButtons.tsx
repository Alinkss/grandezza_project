'use client';
import { store } from '@/app/store/store';
import { clearCart } from '@/app/store/storeUtils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ShowConfirmPurchaseModal } from './ConfirmPurchase/ShowConfirmPurchaseModal';

export default function ManageButtons() {
	const [isConfirmPurchaseModal, setIsConfirmPurchaseModal] =
		useState<boolean>(false);

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
		setIsConfirmPurchaseModal(true);
	};

	const handleCloseConfirmPurchaseModal = () => {
		setIsConfirmPurchaseModal(false);
	};

	return (
		<>
			{isConfirmPurchaseModal && (
				<ShowConfirmPurchaseModal
					handleCloseConfirmPurchaseModal={handleCloseConfirmPurchaseModal}
				/>
			)}
			<div>
				{isCartEmpty ? (
					<button
						className="flex w-full items-center justify-center rounded-md border border-transparent p-3 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
						onClick={handleContinueShopping}>
						Continue shopping
					</button>
				) : (
					<div className="flex flex-col gap-2">
						<div className="flex flex-row gap-2 max-sm:flex-col">
							<button
								className="flex w-full items-center justify-center rounded-md border border-transparent p-3 text-base font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none max-sm:order-2"
								onClick={handleClearCart}>
								Clear cart
							</button>
							<button
								className="flex w-full text-nowrap items-center justify-center rounded-md border border-transparent p-3 text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none"
								onClick={handleConfirmPurchase}>
								Confirm purchase
							</button>
						</div>
						<button
							className="flex w-full text-nowrap items-center justify-center rounded-md border border-transparent p-3 text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
							onClick={handleContinueShopping}>
							Continue shopping
						</button>
					</div>
				)}
			</div>
		</>
	);
}
