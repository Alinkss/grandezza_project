import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PaginationBar } from './PaginationBar';
import { paginate } from '@/assets/paginate';
import { Category, Pet, Product } from '@/types/catalog';
import { addToCart } from '@/app/store/storeUtils';
import { ShowSuccessNotification } from '../PetPage/ShowSuccessNotification';
import { store } from '@/app/store/store';

interface Props {
	pets: (Pet | Product)[];
	catagories: Category[];
}

export default function PetsList({ pets, catagories }: Props) {
	const isUserAuthorized = !!store.getState().user?.sessionId;
	const [isOpenSuccessWindow, setIsOpenSuccessWindow] =
		useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const showingProductAmount = 6;

	const petsForDisplay = paginate(pets, currentPage, showingProductAmount);

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	const addPetToCart = (pet: Pet | Product) => {
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
			<div className="w-[75%] flex justify-center items-center max-sm:w-full">
				<p className="text-xl max-sm:text-center max-sm:p-8">
					No pets match your search parameters
				</p>
			</div>
		);

	return (
		<>
			{isOpenSuccessWindow && (
				<ShowSuccessNotification successText="You have successfully added this item to your cart" />
			)}
			<div className="w-[75%] p-12 flex flex-col gap-8 max-sm:w-full max-sm:p-10">
				<div className="grid grid-cols-3 gap-12 max-sm:grid-cols-1">
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
									<Link
										href={
											pet.type
												? '/catalog/' + pet.id
												: '/catalog/product/' + pet.id
										}
										className="hover:underline">
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
									className="px-2 py-1 rounded-lg bg-[#e100ff] disabled:bg-[#a442b0] text-white font-semibold"
									onClick={() => addPetToCart(pet)}
									disabled={!isUserAuthorized}>
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
