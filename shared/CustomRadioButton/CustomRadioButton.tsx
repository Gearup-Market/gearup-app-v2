import React, { FC } from "react";
import { InputHTMLAttributes } from "react";
import styles from "./CustomRadioButton.module.scss";

// Define the props for the CustomRadioButton
interface CustomRadioButtonProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	addPadding?: boolean;
}

const CustomRadioButton: FC<CustomRadioButtonProps> = ({
	addPadding = true,
	label,
	...props
}) => {
	return (
		<label className={styles.radioLabel} data-padding={addPadding}>
			<input type="checkbox" className={styles.radioInput} {...props} />
			<span className={styles.radioCustom}></span>
			{label}
		</label>
	);
};

export default CustomRadioButton;
