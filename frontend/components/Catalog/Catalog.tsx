import { useEffect, useState } from 'react';
import Catagories from './Catagories';
import PetsList from './PetsList';
import { Category, Pet, Product } from '@/types/catalog';

interface Props {
	pets: Pet[];
	products: Product[];
	categories: Category[];
}

export default function Catalog({
	pets: assortmentPets,
	products: assortmentProducts,
	categories,
}: Props) {
	const [pets, setPets] = useState(assortmentPets);
	const [products, setProducts] = useState(assortmentProducts);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0);

	const selectCategory = (categoryId: number) => {
		setSelectedCategoryId(categoryId);
	};

	useEffect(() => {
		if (selectedCategoryId === 0) return setPets(assortmentPets);

		const sortedPets = assortmentPets.filter(
			(pet) => pet.category_id === selectedCategoryId
		);

		setPets(sortedPets);
	}, [assortmentPets, selectedCategoryId]);

	useEffect(() => {
		if (selectedCategoryId === 0) return setProducts(assortmentProducts);

		const sortedProducts = assortmentProducts.filter(
			(product) => product.category_id === selectedCategoryId
		);

		setProducts(sortedProducts);
	}, [assortmentPets, selectedCategoryId]);

	return (
		<div className="flex flex-row">
			<Catagories
				catagories={categories}
				selectedCategoryId={selectedCategoryId}
				selectCategory={selectCategory}
			/>
			<PetsList pets={[...products, ...pets]} catagories={categories} />
		</div>
	);
}
