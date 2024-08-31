import DetailContacts from '@/components/Contact/DetailContacts';
import GoogleMapsCoordinates from '@/components/Contact/GoogleMapsCoordinates';

export default function Contact() {
	return (
		<div className="flex-[2_1_auto] flex flex-col justify-center items-center">
			<p className="text-3xl font-semibold mt-[3%]">Contacts</p>
			<div className="w-full h-full px-[15%] py-[6%] pt-[3%] flex flex-row gap-8">
				<GoogleMapsCoordinates />
				<DetailContacts />
			</div>
		</div>
	);
}
