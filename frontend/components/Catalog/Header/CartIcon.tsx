'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { store } from '@/app/store/store';

export default function CartIcon() {
	const router = useRouter();
	const cartSize = store.getState().cart?.length;

	return (
		<button className="relative" onClick={() => router.push('/cart')}>
			<Image
				src="https://img.icons8.com/material-two-tone/24/shopping-cart--v1.png"
				alt="#"
				className="w-[28px] h-[30px]"
				width={100}
				height={100}
			/>
			<div className="absolute top-[1px] right-[-3px] bg-red-500 text-white text-[12px] px-1 rounded-full leading-4">
				{cartSize}
			</div>
		</button>
	);
}
