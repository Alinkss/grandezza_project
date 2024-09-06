'use client';
import ManageButtons from '@/components/Cart/ManageButtons';
import ProductList from '@/components/Cart/ProductList';
import { store } from '../store/store';
import Error from 'next/error';

export default function CartPage() {
	const isUserAuthorized = !!store.getState().user?.sessionId;
	if (!isUserAuthorized) {
		// throw new Error({
		// 	title: 'You cannot use a cart without being authorized',
		// 	statusCode: 401,
		// });
		console.log('You cannot use a cart without being authorized');
	}

	return (
		<div className="flex-[2_1_auto] flex flex-col gap-12 justify-center items-center pb-8">
			<p className="text-2xl font-semibold">Cart</p>
			<div className="flex flex-col items-center gap-12">
				<div className="w-[150%]">
					<ProductList />
				</div>
				<ManageButtons />
			</div>
		</div>
	);
}
