"use client";

import React, { useState, useEffect } from "react";
import styles from "./AdvancedSelect.module.scss";
import Image from "next/image";
import SmallLoader from "@/shared/loaders/smallLoader/SmallLoader";
import { shortenTitle } from "@/utils";

export interface SelectProps {
	options: any[];
	onOptionChange: (option?: any) => void;
	label?: string;
	objectOption?: string;
	defaultOptionIndex?: number;
	className?: string;
	iconClass?: string;
	icon?: string;
	title?: string;
	isTransparent?: boolean;
	defaultOption?: string;
	valueType?: string;
	titleClassName?: string;
	optionClassName?: string;
	bodyClassName?: string;
}

const AdvanceSelect: React.FunctionComponent<SelectProps> = ({
	options,
	onOptionChange,
	defaultOptionIndex = -1,
	className,
	iconClass,
	title,
	isTransparent = false,
	defaultOption = "Select an Option",
	objectOption,
	valueType = "value",
	titleClassName,
	optionClassName,
	bodyClassName,
	label,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptionIndex, setSelectedOptionIndex] =
		useState<number>(defaultOptionIndex);

	const toggling = (event: React.MouseEvent<HTMLDivElement>) => {
		setIsOpen(!isOpen);
		event.nativeEvent.stopImmediatePropagation();
		event.stopPropagation();
	};
	const onOptionClicked = (selectedIndex: number) => () => {
		setSelectedOptionIndex(selectedIndex);
		setIsOpen(false);
		if (!!objectOption) {
			onOptionChange({
				name: objectOption,
				selectedValues: [options![selectedIndex]],
				fieldType: "single",
			});
			return;
		}
		onOptionChange(options![selectedIndex]);
	};

	useEffect(() => {
		setSelectedOptionIndex(-1);
	}, [options]);

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
			{!!label && <label className={styles.input_label}>{label}</label>}
			<div className={`${styles.select} ${className}`} data-type={isTransparent}>
				{!options.length ? (
					<SmallLoader />
				) : (
					<div className={styles.select_header} onClick={toggling}>
						<div className={styles.select_smallRow}>
							<div className={styles.flex}>
								{selectedOptionIndex === -1
									? null
									: options[selectedOptionIndex]?.icon && (
											<div
												className={`${styles.icon} ${iconClass}`}
											>
												<Image
													src={
														options[selectedOptionIndex].icon
													}
													fill
													sizes="100vw"
													alt=""
												/>
											</div>
									  )}
								<p>
									{title ? title + ":" : ""}{" "}
									<span className={titleClassName}>
										{selectedOptionIndex === -1
											? defaultOption
											: shortenTitle(
													options![selectedOptionIndex][
														valueType
													],
													42
											  )}
									</span>
								</p>
							</div>
							<div className={`${styles.select_dropDownImage}`}>
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
							{options!.map((option: any, index) =>
								index !== selectedOptionIndex ? (
									<li
										onClick={onOptionClicked(index)}
										key={index}
										className={styles.select_listItem}
									>
										<div className={styles.select_row}>
											<p className={optionClassName}>
												{option[valueType]}
											</p>
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

export default AdvanceSelect;
