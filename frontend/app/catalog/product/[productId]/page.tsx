import { Product } from '@/types/catalog';
import axios from 'axios';
import ProductPageContent from './ProductPageContent';

interface Props {
	params: {
		productId: string;
	};
}

export default async function ProductPage({ params: { productId } }: Props) {
	const product = await axios
		.get(process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/product')
		.then((res) =>
			res.data.prods.find(
				(product: Product) => product.id === parseInt(productId)
			)
		);

	return (
		<div className="flex-[2_1_auto]">
			<ProductPageContent product={product} />
		</div>
	);
}
