import { Category } from '@/types/catalog';
import { Fragment, useRef } from 'react';

interface Props {
	catagories: Category[];
	selectedCategoryId: number | null;
	selectCategory: (categoryId: number) => void;
}

export default function Catagories({
	catagories,
	selectedCategoryId,
	selectCategory,
}: Props) {
	return (
		<div className="w-[20%] bg-gray-200 h-fit p-4 py-6">
			<div className="mb-6">
				<p className="font-semibold text-2xl mb-2">Categories</p>
				<Separator />
			</div>
			<div className="flex flex-col items-start gap-2">
				{catagories.map((category, index) => (
					<Fragment key={index}>
						<button
							onClick={() => selectCategory(category.id)}
							className={
								'text-lg ' +
								(category.id === selectedCategoryId && 'font-semibold')
							}>
							{category.name}
						</button>
						<Separator />
					</Fragment>
				))}
			</div>
		</div>
	);
}

const Separator = () => {
	return <div className="bg-gray-500/30 h-[3px] w-full rounded-xl" />;
};
