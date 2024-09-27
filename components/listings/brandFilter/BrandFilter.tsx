"use client";

import { Accordion, CheckBox } from "@/shared";
import React from "react";
import styles from "./BrandFilter.module.scss";

const BrandFilter = () => {
	return (
		<Accordion title="BRAND">
			{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: number) => (
				<CheckBox label="Canon" key={item} />
			))}
		</Accordion>
	);
};

export default BrandFilter;
