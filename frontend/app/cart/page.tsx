'use client';
import ManageButtons from '@/components/Cart/ManageButtons';
import ProductList from '@/components/Cart/ProductList';
import { store } from '../store/store';
import { useRouter } from 'next/navigation';

export default function CartPage() {
	const router = useRouter();

	const handleLogInButtonClick = () => {
		router.push('/login');
	};

	const isUserAuthorized = !!store.getState().user?.sessionId;
	if (!isUserAuthorized) {
		return (
			<div className="flex-[2_1_auto] flex flex-col justify-center items-center gap-10">
				<p className="font-semibold text-4xl text-red-600">
					You cannot use a cart without being authorized
				</p>
				<button
					className="flex w-fit items-center justify-center rounded-md border border-transparent px-3 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
					onClick={handleLogInButtonClick}>
					Log In
				</button>
			</div>
		);
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
