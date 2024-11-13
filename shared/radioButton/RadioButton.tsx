import React from "react";

type RadioButtonProps = {
	label: string;
	name: string;
	value: string;
	checked: boolean;
	onChange: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
	label,
	name,
	value,
	checked,
	onChange
}) => {
	return (
		<label>
			<input
				type="radio"
				name={name}
				value={value}
				checked={checked}
				onChange={() => onChange(value)}
			/>
			{label}
		</label>
	);
};

export default RadioButton;
