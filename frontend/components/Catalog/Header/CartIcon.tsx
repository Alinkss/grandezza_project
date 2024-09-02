import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartIcon() {
	const router = useRouter();

	return (
		<button onClick={() => router.push('/cart')}>
			<Image
				src="https://img.icons8.com/material-two-tone/24/shopping-cart--v1.png"
				alt="#"
				className="w-[28px] h-[30px]"
				width={100}
				height={100}
			/>
		</button>
	);
}
