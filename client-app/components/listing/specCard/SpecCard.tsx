"use client";

import React, { useMemo } from "react";
import styles from "./SpecCard.module.scss";
import { DetailContainer } from "@/shared";
import { Listing } from "@/store/slices/listingsSlice";

const toPascalCase = (str: string): string => {
	return str.replace(/(^\w|-\w|\s\w)/g, match =>
		match.toUpperCase()
	);
};

const SpecCard = ({ listing }: { listing: Listing }) => {
	const { fieldValues } = listing;

	const [mainGroup, subGroup] = useMemo(() => {
		if (!fieldValues) return [[], []];
		const mainGroup: { key: string; value: string }[] = [];
		const subGroup: { key: string; value: string[] }[] = [];

		Object.entries(fieldValues).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				subGroup.push({ key, value });
			} else {
				mainGroup.push({ key, value });
			}
		});
		return [mainGroup, subGroup];
	}, [fieldValues]);

	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>SPECIFICATIONS</h3>
			</div>

			<DetailContainer title="Category:" value={listing.category.name} />
			{mainGroup.map(({ key, value }, index) => (
				<DetailContainer key={index} title={toPascalCase(key)} value={toPascalCase(value)} />
			))}
			<div className={styles.divider}></div>
			<DetailContainer title="Sub category:" value={listing.subCategory.name} />
			{subGroup.map(({ key, value }, index) => (
				<DetailContainer
					key={index}
					title={toPascalCase(key)}
					value={toPascalCase(value.join(", "))}
				/>
			))}
		</div>
	);
};

export default SpecCard;
