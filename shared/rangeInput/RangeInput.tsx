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
<<<<<<< HEAD
		ref.current.style.backgroundSize =
			((value! - min) * 100) / (max - min) + "% 100%";
=======
		ref.current.style.backgroundSize = ((value - min) * 100) / (max - min) + "% 100%";
>>>>>>> ef3643d0d0927c1731578b17d8df37e087c513fe
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
