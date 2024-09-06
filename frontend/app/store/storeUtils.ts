import { Pet, Product } from '@/types/catalog';
import { store } from './store';

export const getAndStoreUserSessionId = () => {
	const sessionId = localStorage.getItem('sessionId');
	store.setState({ user: { sessionId } });
};

export const storeJwtToken = (token: string) => {
	localStorage.setItem('sessionId', token);
	store.setState({ user: { sessionId: token } });
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

export const addToCart = (product: Pet | Product) => {
	const currentCart = store.getState().cart;
	const newCart = [...currentCart!, product];

	localStorage.setItem('cart', JSON.stringify(newCart));
	store.setState({ cart: newCart });
};

export const removeFromCart = (id: number) => {
	const cart = store.getState().cart;
	const indexForRemoving = cart?.findIndex((pet) => pet.id === id);

	if (indexForRemoving || indexForRemoving === 0) {
		cart?.splice(indexForRemoving, 1);
	}

	localStorage.setItem('cart', JSON.stringify(cart));
	store.setState({ cart });
};

export const clearCart = () => {
	localStorage.setItem('cart', '[]');
	store.setState({ cart: [] });
};
