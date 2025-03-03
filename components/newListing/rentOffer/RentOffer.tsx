import { InputField } from "@/shared";
import styles from "./RentOffer.module.scss";
import React from "react";

export interface RentOfferProps {
	value: number;
	enabled: boolean;
}

interface Props {
	title: 1 | 3 | 7 | 30 | 24;
	value?: number;
	onChange?: (e?: any) => void;
	toggleInput?: (field: number) => void;
	checked?: boolean;
	name: number;
	priceStructure?: string;
}

const RentOffer = ({
	title,
	value,
	onChange,
	toggleInput,
	checked = false,
	name,
	priceStructure
}: Props) => {
	const handleToggle = () => {
		if (toggleInput) {
			toggleInput(name);
		}
	};
	return (
		<div className={styles.container} data-disabled={!checked}>
			<div className={styles.header}>
				<div className={styles.text}>
					<h3>
						{title} {!priceStructure ? "" : priceStructure}
						{!priceStructure ? "" : title !== 1 ? "s" : ""} offer
					</h3>
				</div>
				{title !== 1 ? (
					<label className={styles.switch}>
						<input
							type="checkbox"
							onChange={handleToggle}
							checked={checked}
						/>
						<span className={styles.slider}></span>
					</label>
				) : null}
			</div>
			{checked && (
				<div className={styles.input_container}>
					<InputField
						prefix="₦"
						placeholder="0"
						value={value}
						onChange={onChange}
						label="Price"
						disabled={!checked}
						type="number"
					/>
				</div>
			)}
		</div>
	);
};

export default RentOffer;
