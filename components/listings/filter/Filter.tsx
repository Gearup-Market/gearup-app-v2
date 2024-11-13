"use client";

import React, { useState } from "react";
import styles from "./Filter.module.scss";
import RangeSlider from "../rangeSlider/RangeSlider";
import BrandFilter from "../brandFilter/BrandFilter";
import ProductionTypeFilter from "../productionTypeFilter/ProductionTypeFilter";
import SensorSizeFilter from "../sensorSizeFilter/SensorSizeFilter";
import ResolutionFilter from "../resolutionFilter/ResolutionFilter";
import Image from "next/image";
import { iCategory } from "@/app/api/hooks/listings/types";
import { Accordion, CheckBox, RadioButton } from "@/shared";
import RadioBox from "@/shared/Radio/Radio";

interface Props {
	hideFilters: boolean;
	setHideFilters: (e?: any) => void;
	isMobile: boolean;
	categories?: iCategory[];
	selectedCategory: iCategory | null;
	selectedSubCategory: iCategory | null;
}

const Filter = ({
	hideFilters,
	setHideFilters,
	categories,
	selectedCategory,
	selectedSubCategory
}: Props) => {
	const [filterRange, setFilterRange] = useState<any>(null);
	const [selectedValue, setSelectedValue] = useState<string>("");

	const handleChange = (value: string) => {
		setSelectedValue(value);
	};
	return (
		<div className={styles.container} data-hidden={hideFilters}>
			<div className={styles.header}>
				<div className={styles.small_row} onClick={() => setHideFilters(false)}>
					<div className={styles.icon}>
						<Image src="/svgs/icon-filter.svg" alt="" fill sizes="100vw" />
					</div>
					<div className={styles.text}>
						<h3>Filters</h3>
					</div>
				</div>
				<div
					className={styles.button_container}
					onClick={() => setHideFilters(true)}
				>
					<div className={styles["button"]}>
						<span className={styles.buttonBar}></span>
						<span className={styles.buttonBar}></span>
					</div>
				</div>
			</div>
			<div className={styles.body}>
				<RangeSlider min={0} max={1000000} onChange={setFilterRange} />
				{selectedSubCategory &&
					selectedSubCategory.fields.map((subCategories: any) => (
						<Accordion
							title={subCategories.name.toUpperCase()}
							key={subCategories.name}
						>
							{subCategories.fieldType === "single"
								? subCategories.values.map((item: any) => (
										// <RadioButton
										// 	name={item.name}
										// 	value={item.name}
										// 	checked={false}
										// 	onChange={handleChange}
										// 	label={item.name}
										// />
										<RadioBox
											label={item.name}
											active
											key={item.name}
										/>
								  ))
								: subCategories.values.map((item: any) => (
										<CheckBox label={item.name} key={item.name} />
								  ))}
						</Accordion>
					))}
			</div>
		</div>
	);
};

export default Filter;
