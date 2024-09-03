import { Category, Pet } from '@/types/catalog';
import Catagories from './Catagories';
import PetsList from './PetsList';

interface Props {
	pets: Pet[];
	categories: Category[];
}

export default function Catalog({ pets, categories }: Props) {
	return (
		<div className="flex flex-row">
			<Catagories catagories={categories} />
			<PetsList pets={pets} />
		</div>
	);
}
