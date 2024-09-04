import { Pet } from '@/types/catalog';
import { store } from './store';

export const getAndStoreUserSessionId = () => {
	const sessionId = localStorage.getItem('sessionId');
	store.setState({ user: { sessionId } });
};

export const getAndStoreCart = () => {
	const cart = JSON.parse(localStorage.getItem('cart') || '[]');
	store.setState({ cart });
};

export const logOutUser = () => {
	localStorage.removeItem('sessionId');
	localStorage.removeItem('cart');
	store.getState().setInitialValues();
};

export const addToCart = (product: Pet) => {
	const currentCart = store.getState().cart;
	const newCart = [...currentCart!, product];

	localStorage.setItem('cart', JSON.stringify(newCart));
	store.setState({ cart: newCart });
};

export const removeFromCart = (product: Pet) => {};

export const clearCart = () => {
	localStorage.removeItem('cart');
	store.setState({ cart: null });
};
