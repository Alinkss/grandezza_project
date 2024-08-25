import type { Metadata } from 'next';
import '/styles/globals.css';
import '/styles/header.css';
import '/styles/linklist.css';
import '/styles/animations.css';

export const metadata: Metadata = {
	title: 'Grandezza',
	icons: { icon: '/cat_icon.png' },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
