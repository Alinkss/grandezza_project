import Image from 'next/image';

export default function MomPhoto() {
	return (
		<Image
			src="/mom.jpg"
			alt="#"
			className="w-[350px] h-[500px]"
			width={300}
			height={300}
		/>
	);
}
