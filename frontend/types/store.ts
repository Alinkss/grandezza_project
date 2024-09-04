import { User } from './user';
import { Cart } from './cart';

export interface Store {
	user: User | null;
	cart: Cart | null;
	setInitialValues: () => void;
}
