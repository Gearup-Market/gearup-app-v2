"use client";

import { Accordion } from "@/shared";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./RangeSlider.module.scss";
import { formatNum } from "@/utils";

interface RangeSliderProps {
	min: number;
	max: number;
	onChange?: (value?: any) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, onChange }) => {
	const [minVal, setMinVal] = useState<number>(Math.max(0, min));
	const [maxVal, setMaxVal] = useState<number>(Math.max(0, max));
	const minValRef = useRef<any>(Math.max(0, min));
	const maxValRef = useRef<any>(Math.max(0, max));
	const range = useRef<any>(null);

	// Convert to percentage
	const getPercent = useCallback(
		(value: any) => Math.round(((value - min) / (max - min)) * 100),
		[min, max]
	);

	// Set width of the range to decrease from the left side
	useEffect(() => {
		const minPercent = getPercent(minVal);
		const maxPercent = getPercent(maxValRef.current);

		if (range.current) {
			range.current.style.left = `${minPercent}%`;
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, getPercent]);

	// Set width of the range to decrease from the right side
	useEffect(() => {
		const minPercent = getPercent(minValRef.current);
		const maxPercent = getPercent(maxVal);

		if (range.current) {
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [maxVal, getPercent]);

	// Get min and max values when their state changes
	useEffect(() => {
		// Only trigger onChange if both values are greater than 0
		if (minVal > 0 || maxVal > 0) {
			onChange?.({ min: minVal, max: maxVal });
		}
	}, [minVal, maxVal, onChange]);

	return (
		<Accordion title="Price" className={styles.accordion}>
			<div className={styles.container}>
				<input
					type="range"
					min={0}
					max={max}
					value={minVal}
					onChange={event => {
						const value = Math.max(
							0,
							Math.min(Number(event.target.value), maxVal - 1)
						);
						setMinVal(value);
						minValRef.current = value;
					}}
					className={`${styles.thumb} ${styles.thumb__left}`}
					style={{ zIndex: minVal > max - 100 ? "5" : "3" }}
				/>
				<input
					type="range"
					min={0}
					max={max}
					value={maxVal}
					onChange={event => {
						const value = Math.max(minVal + 1, Number(event.target.value));
						setMaxVal(value);
						maxValRef.current = value;
					}}
					className={`${styles.thumb} ${styles.thumb__right}`}
				/>

				<div className={styles.slider}>
					<div className={styles.slider__track} />
					<div ref={range} className={styles.slider__range} />
					<div className={styles.slider__left_value}>N{formatNum(minVal)}</div>
					<div className={styles.slider__right_value}>N{formatNum(maxVal)}</div>
				</div>
			</div>
			<div className={styles.flex_container}>
				<div className={styles.input_container}>
					<div className={styles.text}>
						<p>min</p>
					</div>
					<input
						type="number"
						min={0}
						max={max}
						value={minVal}
						onChange={event => {
							const value = Math.min(
								Number(event.target.value),
								maxVal - 1
							);
							setMinVal(value);
							minValRef.current = value;
						}}
						className={styles.input}
					/>
				</div>
				<div className={styles.input_container}>
					<div className={styles.text}>
						<p>max</p>
					</div>
					<input
						type="number"
						min={min}
						max={max}
						value={maxVal}
						prefix="₦"
						onChange={event => {
							const value = Math.max(
								Number(event.target.value),
								minVal + 1
							);
							setMaxVal(value);
							maxValRef.current = value;
						}}
						className={styles.input}
					/>
				</div>
			</div>
		</Accordion>
	);
};

export default RangeSlider;
