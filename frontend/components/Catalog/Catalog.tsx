import { useEffect, useState } from 'react';
import Catagories from './Catagories';
import PetsList from './PetsList';
import { Category, Pet } from '@/types/catalog';

interface Props {
	pets: Pet[];
	categories: Category[];
}

const allPetsCategory = { id: 0, name: 'All' };

export default function Catalog({ pets, categories }: Props) {
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
		0
	);

	const selectCategory = (categoryId: number) => {
		setSelectedCategoryId(categoryId);
	};

	useEffect(() => {
		// make sort pets by category
	}, [selectedCategoryId]);

	return (
		<div className="flex flex-row">
			<Catagories
				catagories={[allPetsCategory, ...categories]}
				selectedCategoryId={selectedCategoryId}
				selectCategory={selectCategory}
			/>
			<PetsList pets={pets} catagories={categories} />
		</div>
	);
}
