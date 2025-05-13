import React, { TextareaHTMLAttributes } from "react";
import styles from "./InputField.module.scss";

import Image from "next/image";
interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name?: string;
	label?: React.ReactNode;
	className?: string;
	error?: string;
}

const TextArea = ({ name, label, className, error, ...options }: Props) => {
	return (
		<div className={`${styles.input} ${className}`}>
			{!!label && (
				<label className={styles.input_label} htmlFor={name}>
					{label}
				</label>
			)}

			<div className={styles.input_wrapper} data-error={!!error}>
				<textarea
					className={styles.text_area}
					name={name}
					autoComplete="off"
					{...options}
				/>
			</div>
			{!!error && <label className={styles.error}>{error}</label>}
		</div>
	);
};

export default TextArea;
