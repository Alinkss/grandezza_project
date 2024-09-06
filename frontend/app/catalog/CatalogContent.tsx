'use client';
import Header from '@/components/Catalog/Header';
import Catalog from '@/components/Catalog/Catalog';
import { Assortment } from '@/types/catalog';
import { ChangeEvent, useEffect, useState } from 'react';

interface Props {
	assortment: Assortment;
}

export default function CatalogContent({ assortment }: Props) {
	const [searchedPetName, setSearchedPetName] = useState<string>('');
	const [pets, setPets] = useState(assortment.pets);
	const [products, setProducts] = useState(assortment.products);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchedPetName(event.target.value);
	};

	useEffect(() => {
		if (!searchedPetName) setPets(assortment.pets);

		const filteredPets = assortment.pets.filter((pet) =>
			pet.name.toLowerCase().startsWith(searchedPetName.toLowerCase())
		);

		setPets(filteredPets);
	}, [searchedPetName]);

	useEffect(() => {
		if (!searchedPetName) setProducts(assortment.products);

		const filteredProducts = assortment.products.filter((product) =>
			product.name.toLowerCase().startsWith(searchedPetName.toLowerCase())
		);

		setProducts(filteredProducts);
	}, [searchedPetName]);

	return (
		<>
			<Header searchProps={{ searchedPetName, handleSearchChange }} />
			<Catalog
				pets={pets}
				products={products}
				categories={assortment.categories}
			/>
		</>
	);
}
