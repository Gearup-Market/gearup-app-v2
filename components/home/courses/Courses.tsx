"use client";

import React from "react";
import styles from "./Courses.module.scss";
import { Button, CourseCard, NoSearchResult, Title } from "@/shared";
import { Courses as iCourses } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
// import { courses } from "@/mock";
import { useCourses } from "@/hooks/useListings";
import { useAppSelector } from "@/store/configureStore";
import { Course } from "@/store/slices/coursesSlice";
import { PageLoader } from "@/shared/loaders";

const Courses = () => {
	const { isFetching } = useCourses();
	const { courses } = useAppSelector(state => state.courses);
	return (
		<section className={styles.section}>
			<div className={styles.flex_row}>
				<Title
					title="Elevate your craft by learning from industry experts"
					className={styles.title}
				/>
				<Link href="/courses">
					<Button buttonType="secondary" className={styles.button}>
						<p>Explore All Courses</p>
						<div className={styles.icon}>
							<Image
								src="/svgs/chevron-yellow.svg"
								fill
								alt=""
								sizes="100vw"
							/>
						</div>
					</Button>
				</Link>
			</div>
			{isFetching ? (
				<PageLoader />
			) : !courses.length ? (
				<NoSearchResult
					title="No Courses Available"
					description="No Courses Available"
				/>
			) : (
				<div className={styles.row}>
					{courses.slice(0, 4).map((course: Course, index: number) => (
						<CourseCard
							className={styles.course}
							props={course}
							key={index}
						/>
					))}
				</div>
			)}
		</section>
	);
};

export default Courses;
