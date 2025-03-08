"use client";

import React from "react";
import styles from "./CourseListingsView.module.scss";
import { Button, CourseCard, InputField } from "@/shared";
import { useCourses } from "@/hooks/useListings";
import { useAppSelector } from "@/store/configureStore";
import { courseTypes } from "../CourseListingView/CourseListingView";
import { useRouter, useSearchParams } from "next/navigation";

const CourseListingsView = () => {
	const { courses } = useAppSelector(state => state.courses);
	const router = useRouter();
	const search = useSearchParams();
	const categoryPathName = search.get("category");
	const currentParams = new URLSearchParams(search.toString());
	const queryParams = {
		category: currentParams.get("category") || undefined
	};

	const handleCategory = (category: string) => {
		currentParams.set("category", category);
		router.push(`/courses?${currentParams.toString()}`);
	};
	const { isFetching } = useCourses(1, queryParams);

	const checkActive = (category: string) => {
		return category === categoryPathName;
	};
	return (
		<div className={styles.container}>
			<div className={styles.container__hero_section}>
				<div className={styles.container__hero_section__content}>
					<h1 className={styles.container__hero_section__content__title}>
						Elevate your craft by learning from industry experts
					</h1>
					<InputField
						icon="/svgs/icon-search-dark.svg"
						placeholder="Search for courses"
						className={styles.container__hero_section__content__search_field}
					/>
				</div>
			</div>
			<div className={styles.categories}>
				<Button
					buttonType="secondary"
					data-active={!categoryPathName}
					onClick={() => {
						currentParams.delete("category");
						router.push(`/courses?${currentParams.toString()}`);
					}}
					className={styles.button}
				>
					All
				</Button>
				{courseTypes.map(type => (
					<Button
						key={type.label}
						buttonType="secondary"
						data-active={checkActive(type.label)}
						onClick={() => handleCategory(type.value)}
						className={styles.button}
					>
						{type.label.split(" ")[0]}
					</Button>
				))}
			</div>
			<div className={styles.grid}>
				{courses.map(course => (
					<CourseCard props={course} key={course._id} />
				))}
			</div>
		</div>
	);
};

export default CourseListingsView;
