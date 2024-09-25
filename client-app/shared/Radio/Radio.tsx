import React from "react";
import styles from "./Radio.module.scss";

interface Props {
	label?: string;
	className?: string;
	checked?: boolean;
	onChange?: (e: any) => void;
	disabled?: boolean;
	active?: boolean;
}

const RadioBox = ({ label, onChange, className, checked, disabled = false, active = false }: Props) => {
	return (
		<div className={`${styles.checkBox} ${className}`}>
			<label className={styles.container} data-disabled={disabled}>
				{label}
				<input type="checkbox" onChange={onChange} checked={checked} />
				<span className={styles.checkmark} data-active={active}></span>
			</label>
		</div>
	);
};

export default RadioBox;
