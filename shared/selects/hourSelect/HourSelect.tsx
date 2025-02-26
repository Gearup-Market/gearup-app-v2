"use client";

import React, { useState, useEffect } from "react";
import styles from "./HourSelect.module.scss";
import Image from "next/image";
import SmallLoader from "@/shared/loaders/smallLoader/SmallLoader";
import { shortenTitle } from "@/utils";
import { Hour, hours } from "@/mock/hours";

export interface OptionProps {
	label: string;
	icon: string;
}

export interface SelectProps {
	label?: string;
	onOptionChange?: (milliSecond: number, identifier: string) => void;
	className?: string;
	identifier: string;
	error?: string;
	value?: number;
}

const HourSelect: React.FunctionComponent<SelectProps> = ({
	onOptionChange,
	className,
	label,
	identifier,
	error,
	value
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(
		value !== undefined ? hours.findIndex(hour => hour.time === value) : -1
	);

	const toggling = () => {
		setIsOpen(prev => !prev);
	};

	const onOptionClicked = (selectedIndex: number) => () => {
		setSelectedOptionIndex(selectedIndex);
		setIsOpen(false);

		if (onOptionChange) {
			const selectedTime = hours[selectedIndex].time; // Get the time value
			onOptionChange(selectedTime, identifier); // Pass the selected time
		}
	};

	useEffect(() => {
		if (value !== undefined) {
			const index = hours.findIndex(hour => hour.time === value);
			if (index !== -1) {
				setSelectedOptionIndex(index);
			}
		}
	}, [value]);

	return (
		<div className={styles.select_wrapper}>
			{!!label && <label className={styles.input_label}>{label}</label>}
			<div className={`${styles.select} ${className}`}>
				<div className={styles.select_header} onClick={toggling}>
					<div className={styles.select_smallRow}>
						<div className={styles.flex}>
							<p>
								<span>
									{selectedOptionIndex === -1
										? "Select a time"
										: hours[selectedOptionIndex].label}
								</span>
							</p>
						</div>
						<div
							className={`${styles.select_dropDownImage}`}
							style={{ rotate: isOpen ? "180deg" : "0deg" }}
						>
							<Image
								src="/svgs/chevron-down.svg"
								fill
								sizes="100vw"
								alt=""
							/>
						</div>
					</div>
				</div>

				{isOpen && (
					<div className={styles.select_body}>
						<ul className={styles.select_listContainer}>
							{hours.map((hour, index) =>
								index !== selectedOptionIndex ? (
									<li
										onClick={onOptionClicked(index)}
										key={index}
										className={styles.select_listItem}
									>
										<div className={styles.select_row}>
											<p>{hour.label}</p>
										</div>
									</li>
								) : null
							)}
						</ul>
					</div>
				)}
			</div>
			{!!error && (
				<label className={styles.input_label} style={{ color: "#FC0000" }}>
					{error}
				</label>
			)}
		</div>
	);
};

export default HourSelect;
