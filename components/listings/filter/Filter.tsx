"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import styles from "./Filter.module.scss";
import RangeSlider from "../rangeSlider/RangeSlider";
import Image from "next/image";
import { iCategory } from "@/app/api/hooks/listings/types";
import { Accordion, CheckBox } from "@/shared";
import RadioBox from "@/shared/Radio/Radio";
import BreadCrumbSelect from "../breadCrumbSelet/BreadCrumbSelect";
import { debounce } from "lodash";

interface Props {
	hideFilters: boolean;
	setHideFilters: (e?: any) => void;
	isMobile: boolean;
	categories?: iCategory[];
	selectedCategory: iCategory | null;
	selectedSubCategory: iCategory | null;
	setSelectedSubCategory: (option: iCategory | null) => void;
	setSelectedCategory: (option: iCategory) => void;
}

const Filter = ({
	hideFilters,
	setHideFilters,
	categories,
	selectedCategory,
	selectedSubCategory,
	setSelectedSubCategory,
	setSelectedCategory,
	isMobile
}: Props) => {
	const [filterRange, setFilterRange] = useState<any>(null);
	const [selectedFields, setSelectedFields] = useState<Record<string, string[]>>(() => {
		const params = new URLSearchParams(window.location.search);
		const fields: Record<string, string[]> = {};

		Array.from(params.entries()).forEach(([key, value]) => {
			if (key.startsWith("fields[")) {
				const fieldName = key.slice(7, -1);
				fields[fieldName] = value.split(",");
			}
		});
		return fields;
	});

	const debouncedUpdateURL = useCallback((range: { min: number; max: number }) => {
		const currentUrl = new URL(window.location.href);
		if (range && (range.min > 0 || range.max > 0)) {
			currentUrl.searchParams.set("minPrice", range.min.toString());
			currentUrl.searchParams.set("maxPrice", range.max.toString());
		} else {
			currentUrl.searchParams.delete("minPrice");
			currentUrl.searchParams.delete("maxPrice");
		}
		window.history.replaceState({}, "", currentUrl.toString());
	}, []);

	const debouncedHandler = useMemo(
		() => debounce(debouncedUpdateURL, 500),
		[debouncedUpdateURL]
	);

	useEffect(() => {
		if (filterRange) {
			debouncedHandler(filterRange);
		}
		return () => {
			debouncedHandler.cancel();
		};
	}, [filterRange, debouncedHandler]);

	const formatFieldName = (name: string): string => {
		return name.toLowerCase().replace(/\s+/g, "_");
	};

	const handleRadioChange = (fieldName: string, value: string) => {
		setSelectedFields(prev => ({
			...prev,
			[formatFieldName(fieldName)]: [value]
		}));
		updateURL({ ...selectedFields, [formatFieldName(fieldName)]: [value] });
	};

	const handleCheckboxChange = (fieldName: string, value: string, checked: boolean) => {
		const formattedName = formatFieldName(fieldName);
		setSelectedFields(prev => {
			const currentValues = prev[formattedName] || [];
			const newValues = checked
				? [...currentValues, value]
				: currentValues.filter(v => v !== value);

			const updatedFields = {
				...prev,
				[formattedName]: newValues
			};

			updateURL(updatedFields);
			return updatedFields;
		});
	};

	const updateURL = (fields: Record<string, string[]>) => {
		const queryParts = Object.entries(fields)
			.map(([key, values]) => {
				if (values.length > 0) {
					const valueString = values.join(",");
					return `fields[${key}]=${valueString}`;
				}
				return null;
			})
			.filter(part => part !== null);

		const currentUrl = new URL(window.location.href);
		const existingParams = Array.from(currentUrl.searchParams.entries())
			.filter(([key]) => !key.startsWith("fields["))
			.map(([key, value]) => `${key}=${value}`);

		const allParams = [...existingParams, ...queryParts];
		const queryString = allParams.length > 0 ? `?${allParams.join("&")}` : "";

		window.history.replaceState({}, "", `${window.location.pathname}${queryString}`);
	};

	const clearAllFilters = () => {
		setFilterRange(null);
		setSelectedFields({});

		const currentUrl = new URL(window.location.href);
		Array.from(currentUrl.searchParams.keys()).forEach(key => {
			if (key.startsWith("fields[") || key === "minPrice" || key === "maxPrice") {
				currentUrl.searchParams.delete(key);
			}
		});
		window.history.replaceState({}, "", currentUrl.toString());
	};

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const fields: Record<string, string[]> = {};

		Array.from(params.entries()).forEach(([key, value]) => {
			if (key.startsWith("fields[")) {
				const fieldName = key.slice(7, -1);
				fields[fieldName] = value.split(",");
			}
		});
		setSelectedFields(fields);
	}, []);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const minPrice = params.get("minPrice");
		const maxPrice = params.get("maxPrice");

		if (minPrice && maxPrice) {
			setFilterRange({
				min: parseInt(minPrice),
				max: parseInt(maxPrice)
			});
		}
	}, []);

	const handleCategoryChange = (category: iCategory) => {
		setSelectedCategory(category);
		setSelectedSubCategory(null);

		const currentUrl = new URL(window.location.href);
		currentUrl.searchParams.set("category", category.name);
		currentUrl.searchParams.delete("subCategory");

		setFilterRange(null);
		setSelectedFields({});
		Array.from(currentUrl.searchParams.keys()).forEach(key => {
			if (key.startsWith("fields[") || key === "minPrice" || key === "maxPrice") {
				currentUrl.searchParams.delete(key);
			}
		});

		window.history.replaceState({}, "", currentUrl.toString());
	};

	const handleSubCategoryChange = (subCategory: iCategory | null) => {
		setSelectedSubCategory(subCategory);

		const currentUrl = new URL(window.location.href);
		if (subCategory) {
			currentUrl.searchParams.set("subCategory", subCategory.name);
		} else {
			currentUrl.searchParams.delete("subCategory");
		}
		window.history.replaceState({}, "", currentUrl.toString());
	};

	return (
		<div className={styles.container} data-hidden={hideFilters}>
			<div className={styles.header}>
				<div className={styles.small_row} onClick={() => setHideFilters(false)}>
					<div className={styles.icon}>
						<Image src="/svgs/icon-filter.svg" alt="" fill sizes="100vw" />
					</div>
					<div className={styles.small_row}>
						<div className={styles.text}>
							<h3>Filters</h3>
						</div>
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
				<div className={styles.clear_all} onClick={clearAllFilters}>
					<h3>Clear all</h3>
				</div>
			</div>
			<div className={styles.body}>
				<BreadCrumbSelect
					className={styles.desk_breadcrumb}
					isMobile={isMobile}
					categories={categories}
					selectedCategory={selectedCategory}
					selectedSubCategory={selectedSubCategory}
					setSelectedCategory={handleCategoryChange}
					setSelectedSubCategory={handleSubCategoryChange}
				/>
				<RangeSlider
					min={filterRange ? filterRange.minPrice : 0}
					max={filterRange ? filterRange.maxPrice : 0}
					onChange={setFilterRange}
				/>
				{selectedSubCategory &&
					selectedSubCategory.fields.map((subCategories: any) => (
						<Accordion
							title={subCategories.name.toUpperCase()}
							key={subCategories.name}
						>
							{subCategories.fieldType === "single"
								? subCategories.values.map((item: any) => (
										<RadioBox
											key={item.name}
											label={item.name}
											active={
												selectedFields[
													formatFieldName(subCategories.name)
												]?.[0] === item.name
											}
											onChange={() =>
												handleRadioChange(
													subCategories.name,
													item.name
												)
											}
										/>
								  ))
								: subCategories.values.map((item: any) => (
										<CheckBox
											key={item.name}
											label={item.name}
											checked={selectedFields[
												formatFieldName(subCategories.name)
											]?.includes(item.name)}
											onChange={e =>
												handleCheckboxChange(
													subCategories.name,
													item.name,
													e.target.checked
												)
											}
										/>
								  ))}
						</Accordion>
					))}
			</div>
		</div>
	);
};

export default Filter;
