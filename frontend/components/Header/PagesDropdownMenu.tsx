'use client';
import { Listbox, ListboxItem } from '@nextui-org/listbox';
import { useState } from 'react';

export default function PagesDropdownMenu() {
	const [openListboxMenu, setOpenListboxMenu] = useState(false);

	return (
		<>
			{openListboxMenu && <ListboxMenu />}
			<div
				className="relative flex flex-row gap-1 header-list-link"
				onMouseOver={() => setOpenListboxMenu(true)}
				onMouseLeave={() => setOpenListboxMenu(false)}>
				<p>PAGES</p>
				<div className="flex flex-col justify-center">
					<p className="text-4xl h-5">&#129171;</p>
				</div>
			</div>
		</>
	);
}

const ListboxMenu = () => {
	return (
		<div className="appear-animation z-50 absolute right-[8.2rem] top-[7.8rem]">
			<div className="flex flex-col gap-4">
				<div className="bg-black text-white w-full max-w-[150px] border-2 border-gray-500 px-1 py-1 rounded-lg">
					<Listbox>
						<ListboxItem
							key="create"
							className="transition-[100] hover:bg-gray-300 hover:rounded hover:text-black">
							Create your blog
						</ListboxItem>
						<ListboxItem
							key="search"
							className="transition-[100] hover:bg-gray-300 hover:rounded hover:text-black">
							Search blog
						</ListboxItem>
					</Listbox>
				</div>
			</div>
		</div>
	);
};
