import DetailContacts from '@/components/Contact/DetailContacts';
import GoogleMapsCoordinates from '@/components/Contact/GoogleMapsCoordinates';

export default function Contact() {
	return (
		<div className="flex-[2_1_auto] flex justify-center items-center">
			<div className="w-full h-full px-[15%] py-[6%] flex flex-row gap-6">
				<GoogleMapsCoordinates />
				<DetailContacts />
			</div>
		</div>
	);
}
