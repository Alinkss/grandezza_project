interface Props {
	title: string;
}

export default function Title({ title }: Props) {
	return (
		<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
			<h1 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
				{title}
			</h1>
		</div>
	);
}
