'use client';
import { useRouter } from 'next/navigation';
import { store } from '@/app/store/store';
import { logOutUser } from '@/app/store/storeUtils';
import links from '@/assets/headerLinks';

export default function LinkList() {
	const isUserAuthorized = !!store.getState().user?.sessionId;
	const router = useRouter();

	const logOutUserAndRerenderHeader = () => {
		logOutUser();
		router.refresh();
	};

	return (
		<div className="flex flex-row gap-10">
			{links.map((link, index) => (
				<a className="header-list-link" href={link.link} key={index}>
					{link.title}
				</a>
			))}
			{isUserAuthorized && (
				<>
					<div className="header-list-separator" />
					<button
						className="header-list-link"
						onClick={logOutUserAndRerenderHeader}>
						LOG OUT
					</button>
				</>
			)}
		</div>
	);
}
