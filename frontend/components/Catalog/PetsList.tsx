import { Pet } from '@/types/catalog';

interface Props {
	pets: Pet[];
}

export default function PetsList({ pets }: Props) {
	return <div className="w-[75%] break-words">{JSON.stringify(pets)}</div>;
}
