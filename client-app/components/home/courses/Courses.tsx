import React from "react";
import styles from "./Courses.module.scss";
import { Button, Course, Title } from "@/shared";
import { Courses as iCourses } from "@/interfaces";
import Link from "next/link";
import Image from "next/image";
import { courses } from "@/mock";

const Courses = () => {
	return (
		<section className={styles.section}>
			<div className={styles.flex_row}>
				<Title
					title="Elevate your craft by learning from industry experts"
					className={styles.title}
				/>
				<Link href="#">
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
			<div className={styles.row}>
				{courses.slice(0, 4).map((listing: iCourses, index: number) => (
					<Course className={styles.course} props={listing} key={index} />
				))}
			</div>
		</section>
	);
};

export default Courses;
