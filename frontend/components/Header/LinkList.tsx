import links from '@/assets/headerLinks';

export default function LinkList() {
	return (
		<div className="flex flex-row gap-10">
			{links.map((link, index) => (
				<a className="header-list-link" href={link.link} key={index}>
					{link.title}
				</a>
			))}
		</div>
	);
}
