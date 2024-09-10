'use client';
import { Fragment } from 'react';
import { Accordion, AccordionItem } from '@nextui-org/react';
import useIsMobileDevice from '@/hooks/useIsMobileDevice';
import { Category } from '@/types/catalog';

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
		<div className="w-[20%] bg-gray-200 h-fit p-4 py-6 max-sm:w-full">
			<Accordion defaultExpandedKeys={useIsMobileDevice() ? ['1'] : ['2']}>
				<AccordionItem
					key="1"
					title="Categories"
					aria-label="Accordion Categories"
					className="font-semibold text-lg">
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
								{index === catagories.length - 1 || <Separator />}
							</Fragment>
						))}
					</div>
				</AccordionItem>
			</Accordion>
		</div>
	);
}

const Separator = () => {
	return <div className="bg-gray-500/30 h-[3px] w-full rounded-xl" />;
};
