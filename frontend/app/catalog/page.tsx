import CatalogContent from './CatalogContent';
import axios from 'axios';
import { Assortment, Product } from '@/types/catalog';

export default async function CatalogPage() {
	if (!process.env.NEXT_PUBLIC_BASE_SERVER_URL) return <p>shit happens</p>;

	const assortment: Assortment = await axios
		.get(process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/catalog')
		.then((res) => {
			res.data.categories.unshift({ id: 0, name: 'All' });
			return res.data;
		})
		.then((data) => {
			data.products.map((product: Product) => {
				product.category_id = 4;
				product.images = product.image;

				return product;
			});

			data.categories.push({ id: 4, name: 'Products for pets' });
			return data;
		});

	return (
		<div className="flex-[2_1_auto] flex flex-col">
			<CatalogContent assortment={assortment} />
		</div>
	);
}
