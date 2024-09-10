import { useRouter } from 'next/navigation';

export default function UserIsNotAuthorized() {
	const router = useRouter();

	const handleLogInButtonClick = () => {
		router.push('/login');
	};

	return (
		<div className="flex-[2_1_auto] flex flex-col justify-center items-center gap-8">
			<p className="font-semibold text-4xl text-red-600 max-sm:text-center">
				You cannot use a cart without being authorized
			</p>
			<button
				className="flex w-fit items-center justify-center rounded-md border border-transparent px-3 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
				onClick={handleLogInButtonClick}>
				Log In
			</button>
		</div>
	);
}
