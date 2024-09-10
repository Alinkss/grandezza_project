import SectionTitle from './SectionTitle';
import MomPhoto from './MomPhoto';

export default function AboutUs() {
	return (
		<div
			className="w-full py-16 px-20 bg-[#f7d5bf] flex flex-col gap-16 max-sm:py-12 max-sm:px-4 max-sm:gap-8"
			id="about-us-section">
			<SectionTitle />
			<div className="m-auto flex flex-row gap-8 max-sm:flex-col">
				<MomPhoto />
				<div className="w-full flex flex-row">
					<div className="min-w-[0.5rem] bg-[#ffa500]" />
					<div className="w-full p-2 sm:pl-4 bg-[#fabfa3]">
						<p className="indent-6 text-lg font-medium w-[450px] max-h-[500px] max-sm:w-[350px] max-sm:text-base">
							Looking for a British and Scottish kitten? Then you are on the
							right way. We have been breeding British and Scottish cats since
							2017. Owner of the cattery is Klimenko Lyubov. The cattery is
							registered in the APFC club on 10.11.2017, registration number
							WCF-UA-0120 and is part of the DRPFC "Alisa". The catteryname
							within the World Cat Federation (WCF) doesn't transferable, and it
							is protected. Specialization of the cattery - breeding of British
							and Scottish cats, colors Ny11, ny1133, ns12, ns1233, ns11,
							ns1133, ny25, ay11, ay12. We select producers not only according
							to the standard of development and health, but also according to
							their character. Our cats love affection and attention, but at the
							same time they do not exclude their pedigree feature - the British
							and Scots are not intrusive animals. Kittens of our breeding are
							traced in Europe, Asia, America, Australia and Japan
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
