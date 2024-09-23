"use client";

import React, { useState, useEffect } from "react";
import styles from "./Select.module.scss";
import Image from "next/image";
import SmallLoader from "@/shared/loaders/smallLoader/SmallLoader";
import { shortenTitle } from "@/utils";
// import { SelectOption } from "@/interfaces";

export interface OptionProps {
	label: string;
	icon: string;
}

export interface SelectProps {
	options?: any[];
	onOptionChange?: (option?: any) => void;
	label?: string;
	defaultOptionIndex?: number;
	className?: string;
	iconClass?: string;
	icon?: string;
	title?: string;
	isTransparent?: boolean;
	defaultOption?: string;
	titleClassName?: string;
	optionClassName?: string;
	bodyClassName?: string;
	required?: boolean;
	error?: string;
}

const Select: React.FunctionComponent<SelectProps> = ({
	options,
	onOptionChange,
	defaultOptionIndex = -1,
	className,
	iconClass,
	icon,
	title,
	isTransparent = false,
	defaultOption = "Select an Option",
	titleClassName,
	optionClassName,
	bodyClassName,
	label,
	required=false,
	error
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptionIndex, setSelectedOptionIndex] =
		useState<number>(defaultOptionIndex);

	const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsOpen(!isOpen);
		// event.stopPropagation();
	};

	const onOptionClicked = (selectedIndex: number) => () => {
		setSelectedOptionIndex(selectedIndex);
		setIsOpen(false);

		if (onOptionChange) {
			onOptionChange(options![selectedIndex]);
		}
	};

	useEffect(() => {
		const handleClickOutside = () => {
			setIsOpen(false);
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.select_wrapper}>
			{!!label && <label className={styles.input_label}>{label} {required && <Image src='/svgs/required-icon.svg' alt="required" height={20} width={20}/>}</label>}
			<div
				className={`${styles.select} ${className}`}
				data-type={isTransparent}
				data-error={!!error}
				onClick={(e: React.MouseEvent<HTMLDivElement>) =>
					e.nativeEvent.stopImmediatePropagation()
				}
			>
				{!options?.length ? (
					<SmallLoader />
				) : (
					<div className={styles.select_header} onClick={toggling}>
						<div className={styles.select_smallRow}>
							<div className={styles.flex}>
								{icon && (
									<div className={`${styles.icon} ${iconClass}`}>
										<Image src={icon} fill sizes="100vw" alt="" />
									</div>
								)}
								<p>
									{title ? title + ":" : ""}{" "}
									<span className={titleClassName}>
										{selectedOptionIndex === -1
											? defaultOption
											: shortenTitle(
													options![selectedOptionIndex],
													42
											  )}
									</span>
								</p>
							</div>
							<div
								className={`${styles.select_dropDownImage}`}
								style={{ rotate: isOpen ? "180deg" : "0deg" }}
							>
								<Image
									src="/svgs/chevron.svg"
									fill
									sizes="100vw"
									alt=""
								/>
							</div>
						</div>
					</div>
				)}

				{isOpen && (
					<div className={`${styles.select_body} ${bodyClassName}`}>
						<ul className={styles.select_listContainer}>
							{options!.map((option: string, index) =>
								index !== selectedOptionIndex ? (
									<li
										onClick={onOptionClicked(index)}
										key={index}
										className={styles.select_listItem}
									>
										<div className={styles.select_row}>
											<p className={optionClassName}>{option}</p>
										</div>
									</li>
								) : null
							)}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Select;
