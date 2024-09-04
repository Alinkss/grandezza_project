import { useEffect, useState } from 'react';

interface Props {
	successText: string;
}

export default function SuccessNotification({ successText }: Props) {
	const [show, setShow] = useState<boolean | null>(null);

	useEffect(() => {
		setShow(true);
		setTimeout(() => setShow(null), 2000);
	}, []);

	return (
		<div
			className={`z-50 fixed top-[15%] right-0 bg-green-500 text-white w-fit font-semibold py-2 px-4 rounded-md shadow-md transition-all ${
				show ? 'translate-x-[0%]' : 'translate-x-[100%]'
			}`}>
			<div className="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M5 13l4 4L19 7"></path>
				</svg>
				<span className="text-lg">Success!</span>
			</div>
			<p className="mt-2">{successText}</p>
		</div>
	);
}
