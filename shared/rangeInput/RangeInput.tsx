"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./RangeInput.module.scss";

const RangeInput = ({
	label,
	min,
	max,
	value,
	onChange,
}: {
	label?: string;
	min: number;
	max: number;
	value?: number;
	onChange?: (event?: any) => void;
}) => {
	const ref = useRef<any>(null);
	useEffect(() => {
		ref.current.style.backgroundSize =
			((value! - min) * 100) / (max - min) + "% 100%";
	});
	return (
		<div className={styles.container}>
			{!!label && <label htmlFor="range">{label}</label>}
			<input
				type="range"
				min={min}
				max={max}
				className={styles.slider}
				id="range"
				value={value}
				onChange={onChange}
				ref={ref}
			/>
		</div>
	);
};

export default RangeInput;
