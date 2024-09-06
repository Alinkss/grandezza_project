import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PaginationBar } from './PaginationBar';
import { paginate } from '@/assets/paginate';
import { Category, Pet } from '@/types/catalog';
import { addToCart } from '@/app/store/storeUtils';
import { ShowSuccessNotification } from '../PetPage/ShowSuccessNotification';

interface Props {
	pets: Pet[];
	catagories: Category[];
}

export default function PetsList({ pets, catagories }: Props) {
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const showingProductAmount = 6;

	const petsForDisplay = paginate(pets, currentPage, showingProductAmount);

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	const addPetToCart = (pet: Pet) => {
		addToCart(pet);
		setIsOpenSuccessWindow(true);
	};

	useEffect(() => {
		if (!isOpenSuccessWindow) return;

		setTimeout(() => {
			setIsOpenSuccessWindow(false);
		}, 2500);
	}, [isOpenSuccessWindow]);

	if (!petsForDisplay.length)
		return (
			<div className="w-[75%] flex justify-center items-center">
				<p className="text-xl">No pets match your search parameters</p>
			</div>
		);

	return (
		<>
			{isOpenSuccessWindow && (
				<ShowSuccessNotification successText="You have successfully added this item to your cart" />
			)}
			<div className="w-[75%] p-12 flex flex-col gap-8">
				<div className="grid grid-cols-3 gap-12">
					{petsForDisplay.map((pet, index) => (
						<div
							className="p-4 px-6 rounded-xl text-center bg-gray-300 flex flex-col gap-4"
							key={index}>
							<div className="flex flex-row justify-center">
								<Image
									src={'/' + pet.images}
									alt="#"
									width={200}
									height={100}
									className="h-[170px]"
								/>
							</div>
							<div>
								<p className="text-lg font-semibold">
									<Link href={'/catalog/' + pet.id} className="hover:underline">
										{pet.name}
									</Link>
								</p>
								<p className="">
									Category:{' '}
									{
										catagories.find(
											(catagory) => catagory.id === pet.category_id
										)?.name
									}
								</p>
							</div>
							<div className="flex flex-row justify-between">
								<p className="my-auto text-lg">${parseInt(pet.price)}</p>
								<button
									className="px-2 py-1 rounded-lg bg-[#e100ff] text-white font-semibold"
									onClick={() => addPetToCart(pet)}>
									Add to cart
								</button>
							</div>
						</div>
					))}
				</div>
				<PaginationBar
					currentPage={currentPage}
					onPageChange={onPageChange}
					productsAmount={pets.length}
					showingProductAmount={showingProductAmount}
				/>
			</div>
		</>
	);
}
