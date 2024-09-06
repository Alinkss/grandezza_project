import { Pet } from '@/types/catalog';

export const paginate = (
	products: Pet[],
	pageAmount: number,
	showingProductAmount: number
) => {
	const startIndex = (pageAmount - 1) * showingProductAmount;
	const endIndex = startIndex + showingProductAmount;
	return products.slice(startIndex, endIndex);
};
