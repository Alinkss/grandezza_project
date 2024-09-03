interface Props {
	productDescription: string;
}

export default function Details({ productDescription }: Props) {
	return (
		<>
			<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
				{/* Description and details */}
				<div className="flex flex-col gap-2">
					<h3 className="sr-only">Description</h3>
					<h3 className="text-xl font-bold">Description</h3>
					<div className="space-y-6">
						<p className="text-base text-gray-900 break-words dark:text-white">
							{productDescription}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
