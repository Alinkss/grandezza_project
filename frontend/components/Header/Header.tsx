import ContactHeader from './ContactHeader';
import MainHeader from './MainHeader';

export default function Header() {
	return (
		<div className="flex flex-col">
			<ContactHeader />
			<MainHeader />
		</div>
	);
}
