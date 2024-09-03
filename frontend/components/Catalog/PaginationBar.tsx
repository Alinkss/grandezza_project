import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface Props {
	onPageChange: (page: number) => void;
	productsAmount: number;
	currentPage: number;
	showingProductAmount: number;
}

export function PaginationBar({
	onPageChange,
	productsAmount,
	currentPage,
	showingProductAmount,
}: Props) {
	const pagesAmount = Math.ceil(productsAmount / showingProductAmount);

	if (pagesAmount < 2) return null;
	const pages = Array.from({ length: pagesAmount }, (_, i) => i + 1);

	return (
		<div className="flex items-center justify-center px-4 py-2 sm:px-6">
			<div className="sm:flex sm:flex-1 sm:items-center sm:justify-center">
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination">
						<button
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="relative bg-white inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-200">
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</button>
						{pages.map((page, index) => (
							<button
								key={index}
								aria-current="page"
								onClick={() => onPageChange(page)}
								className={`relative z-10 inline-flex items-center px-4 py-2 text-2xl font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
									page === currentPage
										? 'bg-orange-500 text-white ring-1 ring-inset ring-gray-300'
										: 'bg-white text-black ring-1 ring-inset ring-gray-300'
								}`}>
								{page}
							</button>
						))}
						<button
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === pagesAmount}
							className="relative bg-white inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-gray-200">
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
}
