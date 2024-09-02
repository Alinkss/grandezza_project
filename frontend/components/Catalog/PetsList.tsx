import { Category, Pet } from '@/types/catalog';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
	pets: Pet[];
	catagories: Category[];
}

export default function PetsList({ pets, catagories }: Props) {
	return (
		<div className="w-[75%] p-12">
			<div className="grid grid-cols-3 gap-12">
				{pets.map((pet, index) => (
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
									catagories.find((catagory) => catagory.id === pet.category_id)
										?.name
								}
							</p>
						</div>
						<div className="flex flex-row justify-between">
							<p className="my-auto text-lg">${parseInt(pet.price)}</p>
							<button className="px-2 py-1 rounded-lg bg-[#e100ff] text-white font-semibold">
								Add to cart
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
