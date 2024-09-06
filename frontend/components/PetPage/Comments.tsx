import { LegacyRef, useEffect, useRef } from 'react';
import Image from 'next/image';
import { newCommentValidateSchema } from '@/assets/validationSchemas';
import { Formik } from 'formik';
import { store } from '@/app/store/store';
import { CommentType } from '@/types/comment';
import { useParams } from 'next/navigation';

interface Props {
	comments: CommentType;
	sendCommentToServer: (productId: string, text: string) => Promise<void>;
}

interface CommentFormProps {
	sendCommentToServer: (productId: string, text: string) => Promise<void>;
}

export default function Comments({ comments, sendCommentToServer }: Props) {
	return (
		<>
			<div className="col-span-2 row-span-2">
				<div className="p-4 flex flex-col gap-4">
					{comments.length ? (
						comments.map((comment, index) => {
							return (
								<div className="bg-white rounded-lg shadow-lg" key={index}>
									<div className="p-4 col-span-2 row-span-2">
										<div className="flex items-center mb-2">
											<div className="w-10 h-10 mr-4">
												<Image
													className="rounded min-w-[50px] h-[48px]"
													src="https://img.icons8.com/ios-glyphs/100/guest-male.png"
													alt="#"
													width={100}
													height={100}
												/>
											</div>
											<div>
												<h2 className="text-lg font-medium text-gray-900">
													{comment.username}
												</h2>
												<p className="text-sm text-gray-500">
													{new Date(comment.published_date).toLocaleString()}
												</p>
											</div>
										</div>
										<p className="text-gray-700 leading-6 break-words">
											{comment.text}
										</p>
									</div>
								</div>
							);
						})
					) : (
						<div className="flex justify-center">
							No comments for this product
						</div>
					)}
				</div>
				<div className="p-4">
					<CommentForm sendCommentToServer={sendCommentToServer} />
				</div>
			</div>
		</>
	);
}

function CommentForm({ sendCommentToServer }: CommentFormProps) {
	const { productId }: { productId: string } = useParams();

	const isUserAuthorized = !!store.getState().user?.sessionId;
	const inputNewCommentRef = useRef<HTMLTextAreaElement>();
	const sendNewCommentButtonRef = useRef<HTMLButtonElement>();

	const removeFocusFromNewCommentInput = () => {
		inputNewCommentRef.current?.blur();
	};

	useEffect(() => {
		const textarea = inputNewCommentRef.current!;
		if (!textarea) return;

		textarea.addEventListener('keyup', () => {
			if (textarea?.scrollTop! > 0) {
				textarea.style.height = textarea.scrollHeight + 'px';
			} else {
				textarea.style.height = '100%';
			}
		});
	}, [inputNewCommentRef]);

	useEffect(() => {
		if (sendNewCommentButtonRef.current)
			sendNewCommentButtonRef.current.disabled = !isUserAuthorized;
		if (inputNewCommentRef.current)
			inputNewCommentRef.current.disabled = !isUserAuthorized;
	}, [isUserAuthorized]);

	return (
		<Formik
			initialValues={{
				newCommentText: '',
			}}
			validationSchema={newCommentValidateSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				setTimeout(async () => {
					await sendCommentToServer(productId, values.newCommentText);

					resetForm();
					removeFocusFromNewCommentInput();
					setSubmitting(false);
				}, 400);
			}}>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
			}) => (
				<form className="flex flex-col gap-2" onSubmit={handleSubmit}>
					<div className="flex flex-row px-2 py-1">
						<textarea
							className="resize-none overflow-hidden py-2 px-4 border border-gray-300 rounded-l-md flex-1 dark:text-black"
							name="newCommentText"
							placeholder={
								isUserAuthorized
									? 'Enter comment'
									: 'Not available to unauthorized users'
							}
							ref={inputNewCommentRef as LegacyRef<HTMLTextAreaElement>}
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.newCommentText}
						/>
						<button
							className="disabled:opacity-40 text-white font-bold py-2 px-4 rounded-r-md bg-[orange] hover:bg-orange-400"
							type="submit"
							disabled={isSubmitting}
							ref={sendNewCommentButtonRef as LegacyRef<HTMLButtonElement>}>
							<Image
								className="w-[32px] h-[32px]"
								src="https://img.icons8.com/windows/32/ffffff/sent.png"
								alt="#"
								width={100}
								height={100}
							/>
						</button>
					</div>
					<p className="error">
						{errors.newCommentText &&
							touched.newCommentText &&
							errors.newCommentText}
					</p>
				</form>
			)}
		</Formik>
	);
}
