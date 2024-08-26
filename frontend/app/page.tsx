import Header from '@/components/Header/Header';
import Banner from '@/components/Banner/Banner';
import AboutUs from '@/components/AboutUs/AboutUs';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

export default function Home() {
	return (
		<>
			<Header />
			<Banner />
			<AboutUs />
			<Contact />
			{/* <Footer /> */}
		</>
	);
}
