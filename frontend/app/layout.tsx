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
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body className="h-screen flex flex-col">
				<div id="portal" className="fixed z-50" />
				<StoreInitializer />
				<Header />
				{children}
			</body>
		</html>
	);
}
