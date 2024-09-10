import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="text-white bg-[#212529] py-8">
			<div className="text-lg flex flex-col gap-8">
				<div className="w-3/5 sm:m-auto flex flex-row justify-around max-sm:flex-col max-sm:w-full max-sm:gap-4">
					<div className="footer-cell-wrapper">
						<div className="footer-icon-wrapper">
							<Image src="/geo.png" alt="#" width={75} height={75} />
						</div>
						<div>
							<h4 className="footer-cell-title">Address</h4>
							<div className="footer-cell-description">
								<Link
									href="https://maps.app.goo.gl/UJZUejXUN23B7Pv69"
									target="_blank">
									вулиця Марії Кюрі, 5, <br />
									Дніпро, Дніпропетровська область, 49000
								</Link>
							</div>
						</div>
					</div>

					<div className="footer-cell-wrapper">
						<div className="footer-icon-wrapper">
							<Image src="/phone.png" alt="#" width={75} height={75} />
						</div>
						<div>
							<h4 className="footer-cell-title">Phone Number</h4>
							<div>
								<Link
									href="tel:380679449756"
									className="footer-cell-description">
									+380 (67) 944 97 56
								</Link>
								<br />
								<Link
									href="tel:380504563877"
									className="footer-cell-description">
									+380 (50) 456 38 77
								</Link>
							</div>
						</div>
					</div>

					<div className="footer-cell-wrapper">
						<div className="footer-icon-wrapper">
							<Image src="/email.jpg" alt="#" width={75} height={75} />
						</div>
						<div>
							<h4 className="footer-cell-title">Email</h4>
							<div className="footer-cell-description">
								<Link href="mailto:alinka30.007@gmail.com">
									alinka30.007@gmail.com
								</Link>
							</div>
						</div>
					</div>
				</div>

				<div className="w-4/5 m-auto border-[#323639] border-2" />

				<div className="m-auto">© 2024 All Rights Reserved</div>
			</div>
		</footer>
	);
}
