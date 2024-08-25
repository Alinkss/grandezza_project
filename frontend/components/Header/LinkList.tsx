import links from '@/assets/links';
import PagesDropdownMenu from './PagesDropdownMenu';

export default function LinkList() {
	return (
		<div className="flex flex-row gap-10">
			{links.map((link) => {
				if (link.title === 'PAGES') return <PagesDropdownMenu />;

				return (
					<a className="header-list-link" href={link.link}>
						{link.title}
					</a>
				);
			})}
		</div>
	);
}
