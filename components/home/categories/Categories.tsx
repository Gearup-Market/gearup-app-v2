"use client";

import React, { useState } from "react";
import styles from "./Categories.module.scss";
import { Title } from "@/shared";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/mock";

const Categories = () => {
	const [activeNumber, setActiveNumber] = useState<number>(1);
	return (
		<section className={styles.section}>
			<Title title="Explore Our Categories" className={styles.title} />
			<div className={styles.row}>
				{categories.map((category: any, index: number) => (
					<Box props={category} key={index} />
				))}
			</div>
		</section>
	);
};

export default Categories;

const Box = ({ props }: any) => {
	return (
		<div className={styles.box}>
			<Link href={props.url}>
				<div className={styles.image}>
					<Image src={props.image} fill alt={props.title} sizes="100vw" />
				</div>
				<div className={styles.small_title}>
					<h3>{props.title}</h3>
					<div className={styles.icon}>
						<Image src="/svgs/chevron-yellow.svg" fill alt="" sizes="100vw" />
					</div>
				</div>
			</Link>
		</div>
	);
};
