"use client";

import React, { useState } from "react";
import styles from "./Filter.module.scss";
import RangeSlider from "../rangeSlider/RangeSlider";
import BrandFilter from "../brandFilter/BrandFilter";
import ProductionTypeFilter from "../productionTypeFilter/ProductionTypeFilter";
import SensorSizeFilter from "../sensorSizeFilter/SensorSizeFilter";
import ResolutionFilter from "../resolutionFilter/ResolutionFilter";
import Image from "next/image";

interface Props {
	hideFilters: boolean;
	setHideFilters: (e?: any) => void;
	isMobile: boolean;
}

const Filter = ({ hideFilters, setHideFilters, isMobile }: Props) => {
	const [filterRange, setFilterRange] = useState<any>(null);
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
				<BrandFilter />
				<ProductionTypeFilter />
				<SensorSizeFilter />
				<ResolutionFilter />
			</div>
		</div>
	);
};

export default Filter;
