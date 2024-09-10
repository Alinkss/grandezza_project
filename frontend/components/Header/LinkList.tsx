'use client';
import { useRouter } from 'next/navigation';
import { store } from '@/app/store/store';
import { logOutUser } from '@/app/store/storeUtils';
import links from '@/assets/headerLinks';
import Image from 'next/image';
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from '@nextui-org/react';
import useIsMobileDevice from '@/hooks/useIsMobileDevice';
import { useEffect, useRef } from 'react';

export default function LinkList() {
	const didMount = useRef(false);
	const isUserAuthorized = !!store.getState().user?.sessionId;
	const router = useRouter();

	const goToPage = (link: string) => router.push(link);

	const logOutUserAndRerenderHeader = () => {
		logOutUser();
		router.refresh();
	};

	useEffect(() => {
		if (!didMount.current && isUserAuthorized) {
			links.push({ link: '', title: 'LOG OUT' });
			didMount.current = true;
		}
	}, []);

	if (useIsMobileDevice()) {
		return (
			<Dropdown>
				<DropdownTrigger>
					<button className="focus:outline-none">
						<Image
							src={'https://img.icons8.com/ios-filled/100/menu--v6.png'}
							alt="#"
							width={30}
							height={30}
						/>
					</button>
				</DropdownTrigger>
				<DropdownMenu className="relative top-1 bottom-6 bg-gray-300 p-2 rounded-lg">
					{links.map(({ link, title }, index) => (
						<DropdownItem
							onAction={
								index === links.length - 1
									? logOutUserAndRerenderHeader
									: () => goToPage(link)
							}
							key={index}>
							<p className="header-list-link text-right text-lg">{title}</p>
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		);
	}

	return (
		<div className="flex flex-row gap-10">
			{links.map(({ link, title }, index) => (
				<a className="header-list-link" href={link} key={index}>
					{title}
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
