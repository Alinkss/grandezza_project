'use client';
import { store } from '@/app/store/store';

export default function ProductList() {
	const cart = store.getState().cart;

	if (!cart?.length) return <p>Cart is currently empty</p>;
	return (
		<div>
			{cart.map((pet, index) => (
				<div key={index}>
					<p>{pet.name}</p>
				</div>
			))}
		</div>
	);
}
