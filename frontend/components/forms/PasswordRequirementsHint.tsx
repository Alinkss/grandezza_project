import { Tooltip } from '@nextui-org/react';

const RequirementsText = () => {
	return (
		<div className="p-2 rounded-xl border-2 border-black bg-white">
			<p className="text-black">
				Password must contain at least 8 characters and at least 1 special
				symbol
			</p>
		</div>
	);
};

const PasswordRequirementsHint = () => {
	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => event.preventDefault();

	return (
		<Tooltip content={<RequirementsText />} closeDelay={0}>
			<button onClick={handleClick} tabIndex={-1}>
				<img
					width="18"
					height="18"
					src="https://img.icons8.com/material-outlined/24/808080/info--v1.png"
					alt="#"
				/>
			</button>
		</Tooltip>
	);
};

export default PasswordRequirementsHint;
