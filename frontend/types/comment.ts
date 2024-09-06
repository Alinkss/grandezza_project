export interface IComment {
	id: number;
	text: string;
	product_id: number;
	published_date: string;
	user_id: number;
	username?: string;
}

export type CommentType = IComment[];
