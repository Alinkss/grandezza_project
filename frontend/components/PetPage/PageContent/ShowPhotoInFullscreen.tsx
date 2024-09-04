import { createPortal } from 'react-dom';
import FullscreenPhotoCarousel from './FullscreenPhotoCarousel';

export interface Props {
	handleClose: () => void;
	imagePath: string;
}

export const ShowPhotoInFullscreen = (props: Props) => {
	return createPortal(
		<FullscreenPhotoCarousel {...props} />,
		document.querySelector('#portal')!
	);
};
