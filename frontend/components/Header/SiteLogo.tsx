import Link from 'next/link';

export default function SiteLogo() {
	return (
		<div className="ml-4">
			<Link href="/">
				<p className="text-4xl text-orange-500 font-semibold">Grandezza</p>
			</Link>
		</div>
	);
}
