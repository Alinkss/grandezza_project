import LinkList from './LinkList';
import SiteLogo from './SiteLogo';

export default function MainHeader() {
	return (
		<div className="p-6 px-12 flex flex-row justify-between max-sm:p-4">
			<SiteLogo />
			<LinkList />
		</div>
	);
}
