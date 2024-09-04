export interface IComment {
	author: string;
	date: number;
	picture: string;
	text: string;
	uniqueCommentId: string;
}

export type CommentType = IComment[];
