"use client";

import React, { useState } from "react";
import styles from "./SecondaryCategories.module.scss";
import { Title } from "@/shared";
import Link from "next/link";
import Image from "next/image";
import { categories } from "@/mock";

interface Props {
	title: string;
	description: string;
}

const SecondaryCategories = ({ title, description }: Props) => {
	return (
		<section className={styles.section}>
			<Title title={title} description={description} className={styles.title} />
			<div className={styles.row}>
				{categories.map((category: any, index: number) => (
					<Box props={category} key={index} />
				))}
			</div>
		</section>
	);
};

export default SecondaryCategories;

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
