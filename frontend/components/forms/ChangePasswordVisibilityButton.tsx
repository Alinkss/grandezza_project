import { Dispatch, SetStateAction } from 'react';

interface Props {
	isPasswordVisible: boolean;
	setIsPasswordVisible: Dispatch<SetStateAction<boolean>>;
}

const ChangePasswordVisibilityButton = ({
	isPasswordVisible,
	setIsPasswordVisible,
}: Props) => {
	const togglePasswordVisible = (event: any) => {
		event.preventDefault();
		setIsPasswordVisible((prevValue) => !prevValue);
	};

	return (
		<button
			tabIndex={-1}
			className="w-[40px] h-[40px] rounded-md bg-white border-2 p-[0.3rem]"
			onClick={togglePasswordVisible}>
			<img
				width="24"
				height="24"
				src={`https://img.icons8.com/material-outlined/100/${
					isPasswordVisible ? 'invisible.png' : 'visible--v1.png'
				}`}
				alt="#"
			/>
		</button>
	);
};

export default ChangePasswordVisibilityButton;
