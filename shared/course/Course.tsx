"use client";

import React from "react";
import styles from "./Course.module.scss";
import { Courses } from "@/interfaces";
import Image from "next/image";
import { Button, Ratings } from "..";
import { Course } from "@/store/slices/coursesSlice";
import { formatNum, shortenTitle } from "@/utils";
import Link from "next/link";

interface Props {
	props: Course;
	className?: string;
}

const CourseCard = ({ props, className }: Props) => {
	return (
		<Link
			href={`/courses/${props._id}`}
			className={`${styles.container} ${className}`}
		>
			<div className={styles.image}>
				<Image src={props.cover} alt={props.title} fill sizes="100vw" />
				<Button className={styles.button}>{props.courseType}</Button>
			</div>
			<div className={styles.text}>
				<h2>{shortenTitle(props.title, 50)}</h2>
			</div>
			<div className={styles.small_row} style={{ marginBottom: "1.2rem" }}>
				<div className={styles.text}>
					<h4>{props.author.rating}</h4>
				</div>
				<Ratings readOnly rating={props.author.rating} />
				<div className={styles.text}>
					<span>
						({/* {props.reviews}  */}
						reviews)
					</span>
				</div>
			</div>
			<div className={styles.text}>
				<h3>₦{formatNum(props.price)}</h3>
			</div>
			<div className={styles.divider}></div>
			<div className={styles.row}>
				<div className={styles.small_row}>
					<div className={styles.avatar}>
						<Image
							src={props.author.avatar || "/svgs/user.svg"}
							alt={props.author.userName}
							fill
							sizes="100vw"
						/>
					</div>
					<div className={styles.text} style={{ marginBottom: 0 }}>
						<p>
							{props.author.userName ||
								props.author.firstName ||
								props.author.lastName ||
								"user"}
						</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default CourseCard;
