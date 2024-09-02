'use client';
import Search from './Header/Search';
import CartIcon from './Header/CartIcon';
import { ChangeEvent } from 'react';

interface Props {
	searchProps: {
		searchedPetName: string;
		handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
	};
}

export default function Header({ searchProps }: Props) {
	return (
		<div className="px-[3%] py-2 flex flex-row justify-between">
			<Search searchProps={searchProps} />
			<CartIcon />
		</div>
	);
}
