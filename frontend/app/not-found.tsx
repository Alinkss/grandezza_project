import Image from 'next/image';

export default function NotFound() {
	return (
		<div className="m-auto">
			<p className="text-4xl font-bold">This page did not Found</p>
			<div className="absolute left-0 bottom-0">
				<Image
					src="https://png.klev.club/uploads/posts/2024-04/png-klev-club-98uu-p-kot-zloi-png-31.png"
					alt="#"
					width={300}
					height={200}
				/>
			</div>
		</div>
	);
}
