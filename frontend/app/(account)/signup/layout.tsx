import Footer from '@/components/Footer/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			{children}
			<Footer />
		</>
	);
}
