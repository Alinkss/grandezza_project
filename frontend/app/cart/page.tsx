import ManageButtons from '@/components/Cart/ManageButtons';
import ProductList from '@/components/Cart/ProductList';

export default function CartPage() {
	return (
		<div className="flex-[2_1_auto] flex flex-col gap-10 justify-center items-center">
			<ProductList />
			<ManageButtons />
		</div>
	);
}
