'use client';
import ManageButtons from '@/components/Cart/ManageButtons';
import ProductList from '@/components/Cart/ProductList';
import UserIsNotAuthorized from './UserIsNotAuthorized';
import { store } from '../store/store';

export default function CartPage() {
	if (!store.getState().user?.sessionId) return <UserIsNotAuthorized />;

	return (
		<div className="flex-[2_1_auto] flex flex-col gap-12 justify-center items-center pb-8">
			<p className="text-2xl font-semibold max-sm:text-3xl">Cart</p>
			<div className="flex flex-col items-center gap-12">
				<div className="w-[150%] max-sm:w-screen max-sm:px-8">
					<ProductList />
				</div>
				<ManageButtons />
			</div>
		</div>
	);
}
