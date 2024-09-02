import { Assortment } from '@/types/catalog';
import axios from 'axios';
import CatalogContent from './CatalogContent';

export default async function CatalogPage() {
	const assortment: Assortment = await axios
		.get(process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/catalog')
		.then((res) => res.data);

	return (
		<div className="flex-[2_1_auto] flex flex-col">
			<CatalogContent assortment={assortment} />
		</div>
	);
}
