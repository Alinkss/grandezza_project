import { Pet, Product } from '@/types/catalog';
import { store } from './store';

export const getAndStoreUserSessionId = () => {
	if (
		process.env.NODE_ENV === 'production' &&
		(typeof window === 'undefined' || !window.localStorage)
	) {
		return;
	}

	const sessionId = localStorage.getItem('sessionId');
	store.setState({ user: { sessionId } });
};

export const getAndStoreCart = () => {
	if (
		process.env.NODE_ENV === 'production' &&
		(typeof window === 'undefined' || !window.localStorage)
	) {
		return;
	}

	const cart = JSON.parse(localStorage.getItem('cart') || '[]');
	store.setState({ cart });
};

export const storeJwtToken = (token: string) => {
	localStorage.setItem('sessionId', token);
	store.setState({ user: { sessionId: token } });
};

export const logOutUser = () => {
	localStorage.removeItem('sessionId');
	localStorage.removeItem('cart');
	store.getState().setInitialValues();
};

export const addToCart = (product: Pet | Product) => {
	const currentCart = store.getState().cart;
	const newCart = [...currentCart!, product];

	localStorage.setItem('cart', JSON.stringify(newCart));
	store.setState({ cart: newCart });
};

export const removeFromCart = (index: number) => {
	const cart = store.getState().cart;
	cart?.splice(index, 1);

	localStorage.setItem('cart', JSON.stringify(cart));
	store.setState({ cart });
};

export const clearCart = () => {
	localStorage.setItem('cart', '[]');
	store.setState({ cart: [] });
};
