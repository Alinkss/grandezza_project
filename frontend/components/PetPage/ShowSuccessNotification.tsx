import { createPortal } from 'react-dom';
import SuccessNotification from './SuccessNotification';

export interface Props {
	successText: string;
}

export const ShowSuccessNotification = (props: Props) => {
	return createPortal(
		<SuccessNotification {...props} />,
		document.querySelector('#portal')!
	);
};
