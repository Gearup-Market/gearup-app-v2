import React from "react";
import styles from "./Checkbox.module.scss";

interface Props {
	label?: string;
	className?: string;
	checked?: boolean;
	onChange?: (e: any) => void;
	disabled?: boolean;

}

const CheckBox = ({ label, onChange, className, checked, disabled = false, ...options }: Props) => {
	return (
		<div className={`${styles.checkBox} ${className}`}>
			<label className={styles.container} data-type={disabled}>
				{label}
				<input type="checkbox" onChange={onChange} checked={checked} {...options} />
				<span className={styles.checkmark}></span>
			</label>
		</div>
	);
};

export default CheckBox;
