import type { Metadata } from 'next';
import '/styles/globals.css';
import '/styles/header.css';
import '/styles/linklist.css';
import '/styles/animations.css';
import '/styles/contactForm.css';
import '/styles/footer.css';
import '/styles/authorizingForm.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
			<body className="h-screen flex flex-col">
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
