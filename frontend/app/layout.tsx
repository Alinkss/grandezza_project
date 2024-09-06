import type { Metadata } from 'next';
import '/styles/globals.css';
import '/styles/header.css';
import '/styles/linklist.css';
import '/styles/animations.css';
import '/styles/contactForm.css';
import '/styles/footer.css';
import '/styles/authorizingForm.css';
import '/styles/contact.css';
import Header from '@/components/Header/Header';
import StoreInitializer from './store/StoreInitilizer';

export const metadata: Metadata = {
	title: 'Grandezza',
	icons: { icon: '/cat_icon.png' },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	//TODO:
	//? make comments
	//? hosting
	//? make confirm purchase
	//? make responsive design

	return (
		<html lang="en">
			<body className="h-screen flex flex-col">
				<div id="portal" className="fixed z-50" />
				<StoreInitializer />
				<Header />
				{children}
			</body>
		</html>
	);
}
