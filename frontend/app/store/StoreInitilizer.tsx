'use client';
import { useRef } from 'react';
import { getAndStoreCart, getAndStoreUserSessionId } from './storeUtils';

const StoreInitializer = () => {
	const initialized = useRef(false);
	if (!initialized.current) {
		getAndStoreUserSessionId();
		getAndStoreCart();
		initialized.current = true;
	}

	return null;
};

export default StoreInitializer;
