"use client";

import React, { InputHTMLAttributes, useState } from "react";
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
<<<<<<< HEAD
	suffix?: React.ReactNode;
	iconTitle?: string;
	error?: string;
	customPrefix?: React.JSX.Element;
	register?: any;
	handleSuffixClick?: () => void;
	inputClassName?: string;
=======
	suffix?: string;
	iconTitle?: string;
	error?: string;
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
	customPrefix,
	handleSuffixClick,
	error,
	register,
	inputClassName,
=======
	error,
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
	...options
}: Props) => {
	let localType = isPassword ? (type = "password") : type;
	const [inputType, setInputType] = useState<string>(localType);
	const handleShowPassword = () => {
		if (inputType === "text") {
			setInputType("password");
		}
		if (inputType === "password") {
			setInputType("text");
		}
	};
	return (
		<div className={`${styles.input} ${className}`}>
			{!!label && (
				<label className={styles.input_label} htmlFor={name}>
					{label}
				</label>
			)}

<<<<<<< HEAD
			<div className={`${styles.input_wrapper} ${inputClassName}`} data-error={!!error}>
=======
			<div className={styles.input_wrapper} data-error={!!error}>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
				{!!icon && iconPosition === "prefix" && (
					<figure className={styles.input_icon}>
						<Image src={icon} fill sizes="100vw" title={iconTitle} alt="" />
					</figure>
				)}
				{!!prefix && <label className={styles.input_label}>{prefix}</label>}
<<<<<<< HEAD
				{customPrefix && <>{customPrefix}</>}
=======
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
				<input
					className={styles.input_field}
					type={inputType}
					data-icon={!!icon}
					name={name}
					autoComplete="off"
<<<<<<< HEAD
					{...register}
=======
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
<<<<<<< HEAD
					<figure
						className={styles.input_icon}
						onClick={handleSuffixClick}
						data-click={!!handleSuffixClick}
					>
=======
					<figure className={styles.input_icon}>
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
