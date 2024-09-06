import CatalogContent from './CatalogContent';
import axios from 'axios';
import { Assortment, Product } from '@/types/catalog';

export default async function CatalogPage() {
	const assortment: Assortment = await axios
		.get(process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/catalog')
		.then((res) => {
			res.data.products.map((product: Product) => {
				return (product.images = product.image);
			});

			return res.data;
		});

	return (
		<div className="flex-[2_1_auto] flex flex-col">
			<CatalogContent assortment={assortment} />
		</div>
	);
}
