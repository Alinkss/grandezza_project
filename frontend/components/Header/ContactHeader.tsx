import Link from 'next/link';

export default function ContactHeader() {
	return (
		<div className="bg-[#f8f9fa] p-2 px-6 flex flex-row justify-between">
			<div className="ml-10 flex flex-row gap-8">
				<div className="flex flex-row gap-1">
					<img
						src="https://img.icons8.com/ios-filled/100/0000ff/marker.png"
						alt="#"
						className="w-[20px] h-[20px] m-auto"
					/>
					<p className="m-auto">Gagarin Street, Dnipro, Ukraine</p>
				</div>
				<div className="flex flex-row gap-2">
					<img
						src="https://img.icons8.com/ios/100/0000ff/clock--v1.png"
						alt="#"
						className="w-[20px] h-[20px] m-auto"
					/>
					<p className="m-auto">Every time!</p>
				</div>
			</div>
			<div className="flex flex-row gap-4">
				<div className="flex flex-row gap-2">
					<img
						className="w-[20px] h-[20px] m-auto"
						src="https://img.icons8.com/ios-glyphs/90/0000ff/phone--v1.png"
						alt="#"
					/>
					<div className="m-auto text-sm">
						<Link href="tel:380504563877">+38(050)456-38-77</Link>
					</div>
				</div>
				<div className="flex flex-row gap-1 justify-center items-center">
					<button className="link-list-button">
						<Link href="https://www.facebook.com/Cats.comFB/">
							<img
								className="link-list-button-icon"
								src="https://img.icons8.com/ios-glyphs/90/0000ff/facebook-new.png"
								alt="#"
							/>
						</Link>
					</button>
					<button className="link-list-button">
						<Link href="https://x.com/tweetsofcats">
							<img
								className="link-list-button-icon"
								src="https://img.icons8.com/ios-filled/100/0000ff/twitter.png"
								alt="#"
							/>
						</Link>
					</button>
					<button className="link-list-button">
						<Link href="https://www.linkedin.com/posts/azurecollier_cats-catstagram-catsofinstagram-activity-7233942584040067072--72L">
							<img
								className="link-list-button-icon"
								src="https://img.icons8.com/ios-filled/100/0000ff/linkedin.png"
								alt="#"
							/>
						</Link>
					</button>
					<button className="link-list-button">
						<Link href="https://www.instagram.com/cats_of_instagram/">
							<img
								className="link-list-button-icon"
								src="https://img.icons8.com/ios-filled/100/0000ff/instagram.png"
								alt="#"
							/>
						</Link>
					</button>
					<button className="link-list-button">
						<Link href="https://www.reddit.com/r/cats">
							<img
								className="link-list-button-icon"
								src="https://img.icons8.com/ios-filled/100/0000ff/reddit--v1.png"
								alt="#"
							/>
						</Link>
					</button>
				</div>
			</div>
		</div>
	);
}
