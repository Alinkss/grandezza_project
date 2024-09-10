import Image from 'next/image';

export default function DetailContacts() {
	return (
		<div className="w-[40%] my-auto flex flex-col gap-8 max-sm:w-full max-sm:items-center max-sm:my-0">
			<div className="contact-info">
				<div className="contact-icon-wrapper">
					<Image
						src="https://img.icons8.com/ios-filled/100/address--v1.png"
						alt="#"
						width={40}
						height={40}
					/>
				</div>
				<div className="contact-text-wrapper">
					<b>Address</b>
					<p>вулиця Марії Кюрі, 5, Дніпро, Дніпропетровська область, 49000</p>
				</div>
			</div>
			<div className="contact-info">
				<div className="contact-icon-wrapper">
					<Image
						src="https://img.icons8.com/ios-filled/100/phone.png"
						alt="#"
						width={40}
						height={40}
					/>
				</div>
				<div className="contact-text-wrapper">
					<b>Phone Number</b>
					<div>
						<p>+380 (67) 944 97 56</p>
						<p>+380 (50) 456 38 77</p>
					</div>
				</div>
			</div>
			<div className="contact-info">
				<div className="contact-icon-wrapper">
					<Image
						src="https://img.icons8.com/ios-filled/100/new-post.png"
						alt="#"
						width={40}
						height={40}
					/>
				</div>
				<div className="contact-text-wrapper">
					<b>Email</b>
					<p>alinka30.007@gmail.com</p>
				</div>
			</div>
			<div className="contact-info">
				<div className="contact-icon-wrapper">
					<Image
						src="https://img.icons8.com/ios/100/overtime--v1.png"
						alt="#"
						width={40}
						height={40}
					/>
				</div>
				<div className="contact-text-wrapper">
					<b>Work schedule</b>
					<div>
						<p>Mon - Fri: 08:00 - 20:00</p>
						<p>Sat - Sun: 09:00 - 18:00</p>
					</div>
				</div>
			</div>
		</div>
	);
}
