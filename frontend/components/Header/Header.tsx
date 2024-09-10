'use client';
import useIsMobileDevice from '@/hooks/useIsMobileDevice';
import ContactHeader from './ContactHeader';
import MainHeader from './MainHeader';

export default function Header() {
	const isMobileDevice = useIsMobileDevice();

	return (
		<div className="flex flex-col max-sm:justify-between">
			{!isMobileDevice && <ContactHeader />}
			<MainHeader />
		</div>
	);
}
