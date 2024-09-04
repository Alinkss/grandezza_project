import { Category } from '@/types/catalog';

interface Props {
	catagories: Category[];
}

export default function Catagories({ catagories }: Props) {
	return <div className="w-[25%]">{JSON.stringify(catagories)}</div>;
}
