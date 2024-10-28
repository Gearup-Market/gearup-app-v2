"use client";

import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import styles from "./InputField.module.scss";

import Image from "next/image";
interface Props extends InputHTMLAttributes<HTMLInputElement> {
	icon?: string;
	name?: string;
	label?: string;
	isPassword?: boolean;
	className?: string;
	iconPosition?: "prefix" | "suffix";
	prefix?: string;
	suffix?: React.ReactNode;
	iconTitle?: string;
	error?: string | ReactNode;
	customPrefix?: React.JSX.Element;
	register?: any;
	handleSuffixClick?: () => void;
	inputClassName?: string;
}

const InputField = ({
	name,
	type = "text",
	icon,
	label,
	className,
	isPassword,
	iconPosition = "prefix",
	prefix,
	suffix,
	iconTitle,
	customPrefix,
	handleSuffixClick,
	error,
	register,
	inputClassName,
	...options
}: Props) => {
	let localType = isPassword ? (type = "password") : type;
	const [inputType, setInputType] = useState<string>(localType);
	const [inputFocus, setInputFocus] =useState(false)
	const handleShowPassword = () => {
		if (inputType === "text") {
			setInputType("password");
		}
		if (inputType === "password") {
			setInputType("text");
		}
	};
	return (
		<div className={`${styles.input} ${className}`} >
			{!!label && (
				<label className={styles.input_label} htmlFor={name}>
					{label}
				</label>
			)}

			<div className={`${styles.input_wrapper} ${inputClassName}`} data-error={!!error} data-focus={inputFocus}>
				{!!icon && iconPosition === "prefix" && (
					<figure className={styles.input_icon}>
						<Image src={icon} fill sizes="100vw" title={iconTitle} alt="" />
					</figure>
				)}
				{!!prefix && <label className={styles.input_label}>{prefix}</label>}
				{customPrefix && <>{customPrefix}</>}
				<input
					className={styles.input_field}
					type={inputType}
					data-icon={!!icon}
					name={name}
					autoComplete="off"
					onFocus={()=>setInputFocus(true)}
					onBlur={()=>setInputFocus(false)}
					{...register}
					{...options}

				/>
				{isPassword && (
					<div className={styles.icon} onClick={handleShowPassword}>
						<Image
							src={
								inputType !== "password"
									? "/svgs/eye.svg"
									: "/svgs/eye-off.svg"
							}
							fill
							sizes="100vw"
							alt=""
							title="password"
						/>
					</div>
				)}
				{!!icon && iconPosition === "suffix" && (
					<figure
						className={styles.input_icon}
						onClick={handleSuffixClick}
						data-click={!!handleSuffixClick}
					>
						<Image src={icon} fill sizes="100vw" alt="" title={iconTitle} />
					</figure>
				)}
				{!!suffix && (
					<label className={styles.input_label} htmlFor={name}>
						{suffix}
					</label>
				)}
			</div>
			{!!error && <label className={styles.error}>{error}</label>}
		</div>
	);
};

export default InputField;
