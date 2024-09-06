import { ChangeEvent } from 'react';

interface Props {
	searchProps: {
		searchedPetName: string;
		handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
	};
}

export default function Search({
	searchProps: { searchedPetName, handleSearchChange },
}: Props) {
	return (
		<div className="px-2 py-1 flex items-center gap-2 rounded-xl bg-gray-200 my-[0.3rem]">
			<img
				width="20"
				height="20"
				src="https://img.icons8.com/ios-filled/50/search--v1.png"
				alt="#"
			/>
			<input
				type="text"
				placeholder="Search..."
				value={searchedPetName}
				onChange={handleSearchChange}
				className="bg-transparent outline-none"
			/>
		</div>
	);
}
