import { createPortal } from 'react-dom';
import ConfirmPurchaseModal from './ConfirmPurchaseModal';

interface Props {
	handleCloseConfirmPurchaseModal: () => void;
}

export const ShowConfirmPurchaseModal = (props: Props) => {
	return createPortal(
		<ConfirmPurchaseModal {...props} />,
		document.querySelector('#portal')!
	);
};
