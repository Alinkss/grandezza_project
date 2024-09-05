'use client';
import Error from 'next/error';
import { useRouter } from 'next/navigation';

interface Props {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
	const router = useRouter();

	const handleLogInButtonClick = () => {
		router.push('/login');
	};

	if (error.props?.statusCode === 401) {
		return (
			<div className="flex-[2_1_auto] flex flex-col justify-center items-center gap-10">
				<p className="font-semibold text-4xl text-red-600">
					{error.props.title}
				</p>
				<button
					className="flex w-fit items-center justify-center rounded-md border border-transparent px-3 py-2 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
					onClick={handleLogInButtonClick}>
					Log In
				</button>
			</div>
		);
	}

	return <p>Shit happens</p>;
}
