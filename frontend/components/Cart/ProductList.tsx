'use client';
import Image from 'next/image';
import Link from 'next/link';
import { store } from '@/app/store/store';
import { removeFromCart } from '@/app/store/storeUtils';
import { useRouter } from 'next/navigation';

export default function ProductList() {
	const router = useRouter();
	const cart = store.getState().cart;
	const totalPrice = cart?.reduce(
		(partialSum, pet) => partialSum + parseInt(pet.price),
		0
	);

	const handleRemovePetFromCart = (id: number) => {
		removeFromCart(id);
		router.refresh();
	};

	if (!cart?.length) {
		return <p className="text-center">Cart is currently empty</p>;
	}

	return (
		<div className="flex flex-col gap-4">
			{cart.map((pet, index) => (
				<div key={index}>
					<div className="flex flex-row justify-between">
						<div className="flex flex-row gap-6">
							<Image
								src={'/' + pet.images}
								alt="#"
								className="w-[120px] h-[100px]"
								width={200}
								height={200}
							/>
							<div className="flex flex-col justify-center">
								<Link
									href={'/catalog/' + pet.id}
									className="text-lg font-bold hover:underline">
									{pet.name}
								</Link>
								<p>${parseInt(pet.price)}</p>
							</div>
						</div>
						<button onClick={() => handleRemovePetFromCart(pet.id)}>
							<Image
								src="https://img.icons8.com/glyph-neue/64/trash.png"
								alt="#"
								className="w-[30px] h-[30px]"
								width={100}
								height={100}
							/>
						</button>
					</div>
					<div className="mt-4 w-full h-[3px] bg-gray-300" />
				</div>
			))}
			<p className="text-lg text-center">Total: ${totalPrice}</p>
		</div>
	);
}
