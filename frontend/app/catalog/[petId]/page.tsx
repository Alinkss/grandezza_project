import axios from 'axios';
import PageContent from './PetPageContent';

interface Props {
	params: {
		petId: string;
	};
}

export default async function PetPage({ params: { petId } }: Props) {
	if (!process.env.NEXT_PUBLIC_BASE_SERVER_URL) return <p>shit happens</p>;

	const pet = await axios
		.get(process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/product_detail/' + petId)
		.then((res) => {
			res.data.product.images = res.data.product.images.replace('/media/', '');
			return res.data.product;
		});

	return (
		<div className="flex-[2_1_auto]">
			<PageContent pet={pet} />
		</div>
	);
}
