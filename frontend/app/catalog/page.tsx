import Header from '@/components/Catalog/Header';
import Catalog from '@/components/Catalog/Catalog';
import { Assortment } from '@/types/catalog';
import axios from 'axios';

export default async function CatalogPage() {
	const assortment: Assortment = await axios
		.get(process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/catalog')
		.then((res) => res.data);

	return (
		<div className="flex-[2_1_auto] flex flex-col">
			<Header />
			<Catalog pets={assortment.pets} categories={assortment.categories} />
		</div>
	);
}
