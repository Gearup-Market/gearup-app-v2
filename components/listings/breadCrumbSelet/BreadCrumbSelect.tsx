"use client";

import React from "react";
import styles from "./BreadCrumbSelect.module.scss";
import { Select, AdvanceSelect } from "@/shared";
import { useGetCategories } from "@/app/api/hooks/listings";
import { iCategory } from "@/app/api/hooks/listings/types";

interface Props {
	isMobile?: boolean;
	className?: string;
	categories?: iCategory[];
	selectedCategory: iCategory | null;
	selectedSubCategory: iCategory | null;
	setSelectedCategory: (option: iCategory) => void;
	setSelectedSubCategory: (option: iCategory) => void;
}

const BreadCrumbSelect = ({
	isMobile,
	className,
	selectedCategory,
	setSelectedCategory,
	setSelectedSubCategory,
	selectedSubCategory
}: Props) => {
	const { data: categories } = useGetCategories();

	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.row}>
				<div className={styles.select_container}>
					<div className={styles.text_light}>
						<p>Location</p>
					</div>
					<div className={styles.row}>
						<Select
							options={["All Nigeria", "Lagos", "Abuja", "Benin"]}
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
							options={categories?.data ? categories.data : []}
							defaultOptionIndex={0}
							defaultOption={selectedCategory?.name}
							titleClassName={styles.titleClassName_light}
							bodyClassName={styles.select_body}
							optionClassName={styles.option_text}
							isTransparent={isMobile ? false : true}
							className={styles.select}
							onOptionChange={setSelectedCategory}
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
						options={
							selectedCategory?.subCategories
								? selectedCategory.subCategories
								: [""]
						}
						defaultOptionIndex={0}
						defaultOption={selectedSubCategory?.name || "Select a Category"}
						titleClassName={styles.titleClassName}
						bodyClassName={styles.select_body}
						optionClassName={styles.option_text}
						isTransparent={isMobile ? false : true}
						className={styles.select}
						onOptionChange={setSelectedSubCategory}
						valueType="name"
					/>
				</div>
			</div>
		</div>
	);
};

export default BreadCrumbSelect;
