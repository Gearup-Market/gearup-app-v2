"use client";

import React, { useMemo, useState } from "react";
import styles from "./BreadCrumbSelect.module.scss";
import { Select, AdvanceSelect } from "@/shared";
import { _category } from "@/mock/data.mock";

interface Props {
	isMobile?: boolean;
	className?: string;
}

const BreadCrumbSelect = ({ isMobile, className }: Props) => {
	const [filter, setFilter] = useState<any>({
		category: "Camera",
	});

	const [subFilters, setSubFilters] = useState<any>();
	const subCategoryArr = useMemo(
		() => _category?.filter((item: any) => item.name === filter.category),
		[filter]
	);
	// const subCategoryArr = category.filter((item: any) => item.name === filter.category);
	const subCategory = subCategoryArr[0]?.subCategories;
	// console.log(filter, subCategory, subFilters);
	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.row}>
				<div className={styles.select_container}>
					<div className={styles.text_light}>
						<p>Location</p>
					</div>
					<div className={styles.row}>
						<Select
							options={["lagos state", "abuja city", "Benin City"]}
							defaultOptionIndex={0}
							titleClassName={styles.titleClassName_light}
							bodyClassName={styles.select_body}
							optionClassName={styles.option_text}
							isTransparent={isMobile ? false : true}
							className={styles.select}
						/>
					</div>
				</div>
				<div className={styles.slash}>/</div>
				<div className={styles.select_container}>
					<div className={styles.text_light}>
						<p>Category</p>
					</div>
					<div className={styles.row}>
						<AdvanceSelect
							options={_category}
							defaultOptionIndex={0}
							titleClassName={styles.titleClassName_light}
							bodyClassName={styles.select_body}
							optionClassName={styles.option_text}
							isTransparent={isMobile ? false : true}
							className={styles.select}
							onOptionChange={setFilter}
							objectOption={"category"}
							valueType="name"
						/>
					</div>
				</div>
				<div className={styles.slash}>/</div>
				<div className={styles.select_container}>
					<div className={styles.text}>
						<p>Sub-category</p>
					</div>
					<AdvanceSelect
						options={subCategory}
						defaultOptionIndex={0}
						titleClassName={styles.titleClassName}
						bodyClassName={styles.select_body}
						optionClassName={styles.option_text}
						isTransparent={isMobile ? false : true}
						className={styles.select}
						onOptionChange={setSubFilters}
						objectOption={"subCategory"}
						valueType="name"
					/>
				</div>
			</div>
		</div>
	);
};

export default BreadCrumbSelect;
