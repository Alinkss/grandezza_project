import { useEffect, useState } from 'react';
import Catagories from './Catagories';
import PetsList from './PetsList';
import { Category, Pet } from '@/types/catalog';

interface Props {
	pets: Pet[];
	categories: Category[];
}

const allPetsCategory = { id: 0, name: 'All' };

export default function Catalog({ pets: assortmentPets, categories }: Props) {
	const [pets, setPets] = useState(assortmentPets);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

	const selectCategory = (categoryId: number) => {
		setSelectedCategoryId(categoryId);
	};

	useEffect(() => {
		if (selectedCategoryId === 0) setPets(assortmentPets);

		const sortedPets = assortmentPets.filter(
			(pet) => pet.category_id === selectedCategoryId
		);

		setPets(sortedPets);
	}, [assortmentPets, selectedCategoryId]);

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
