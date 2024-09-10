import Image from 'next/image';

export default function MomPhoto() {
	return (
		<Image
			src="/mom.jpg"
			alt="#"
			className="w-[350px] h-[500px] max-sm:w-[200px] max-sm:h-[300px] max-sm:mx-auto"
			width={300}
			height={300}
		/>
	);
}
