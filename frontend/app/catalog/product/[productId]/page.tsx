import { Product } from '@/types/catalog';
import axios from 'axios';
import ProductPageContent from './ProductPageContent';
import { CommentType } from '@/types/comment';

interface Props {
	params: {
		productId: string;
	};
}

export default async function ProductPage({ params: { productId } }: Props) {
	if (!process.env.NEXT_PUBLIC_BASE_SERVER_URL) return <p>shit happens</p>;

	const product = await axios
		.get(process.env.NEXT_PUBLIC_BASE_SERVER_URL + '/product')
		.then((res) =>
			res.data.prods.find(
				(product: Product) => product.id === parseInt(productId)
			)
		);

	let comments: CommentType = await axios
		.post(
			process.env.NEXT_PUBLIC_BASE_SERVER_URL +
				'/get_product_comments/' +
				productId
		)
		.then((res) => res.data.comments);

	comments = await Promise.all(
		comments.map(async (comment) => {
			const authorname = await axios
				.get(
					process.env.NEXT_PUBLIC_BASE_SERVER_URL +
						'/bloguser/' +
						comment.user_id
				)
				.then((res) => res.data.user.username);

			comment.username = authorname;
			return comment;
		})
	);

	return (
		<div className="flex-[2_1_auto]">
			<ProductPageContent product={product} comments={comments} />
		</div>
	);
}
