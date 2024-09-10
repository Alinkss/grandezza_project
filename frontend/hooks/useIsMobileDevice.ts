'use client';
import { useEffect, useState } from 'react';

const regexp = /android|iphone|kindle|ipad/i;

const useIsMobileDevice = () => {
	const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

	useEffect(() => {
		const details = navigator.userAgent;
		setIsMobileDevice(regexp.test(details));
	}, []);

	return isMobileDevice;
};

export default useIsMobileDevice;
