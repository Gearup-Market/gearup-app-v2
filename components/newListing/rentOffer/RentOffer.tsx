import { InputField } from "@/shared";
import styles from "./RentOffer.module.scss";
import React from "react";

export interface RentOfferProps {
	value: number;
	enabled: boolean;
}

interface Props {
	title: 1 | 3 | 7 | 30;
	value: number; 
	onChange?: (e?: any) => void;
	toggleInput?: React.Dispatch<React.SetStateAction<RentOfferProps>>;
	checked?: boolean;
	name: string;
	updateFieldPrice?: (name: string) => void;
}

const RentOffer = ({ title, value, onChange , toggleInput, checked=false ,name, updateFieldPrice}: Props) => {

	const handleToggle = () => {
		if(toggleInput) {
			toggleInput((prev) => ({ value, enabled: !prev.enabled
			}));
			updateFieldPrice && updateFieldPrice(name);
		}
	}

	return (
		<div className={styles.container} data-disabled={!checked}>
			<div className={styles.header}>
				<div className={styles.text}>
					<h3>
						{title} Day{title !== 1 ? "s" : ""} offer
					</h3>
				</div>
				{title !== 1 ? (
					<label className={styles.switch}>
						<input type="checkbox" onChange={handleToggle} checked={checked}/>
						<span className={styles.slider}></span>
					</label>
				) : null}
			</div>
			<InputField
				prefix="N"
				placeholder="0"
				value={value}
				onChange={onChange}
				disabled={!checked}
			/>
			<div className={styles.footer}>
				{title !== 1 && (
					<div className={styles.text}>
						<p>BASED ON FORMULAR</p>
					</div>
				)}
				{title === 1 ? (
					<div className={styles.details}>Custom</div>
				) : (
					<div className={styles.details}>
						{title === 3 ? 2 : title === 7 ? 3 : title === 30 ? 9 : null} X 1
						Day price
					</div>
				)}
			</div>
		</div>
	);
};

export default RentOffer;
