"use client";

import React, { useState } from "react";
import styles from "./Platform.module.scss";
import { Title } from "@/shared";
import Link from "next/link";
import Image from "next/image";
import { platformList } from "@/mock";
import { Platfom } from "@/interfaces";

const Platform = () => {
	const [activeNumber, setActiveNumber] = useState<number>(1);
	return (
		<section className={styles.section}>
			<Title
				title="All-in-One platform for Gears and Creative Mastery"
				description="Rent, buy, sell, and delve into courses that transform your creative landscape."
				className={styles.title}
			/>
			<div className={styles.row}>
				<div className={styles.box_container}>
					{platformList.map(
						(
							{ id, title, description, url, urlLabel }: Platfom,
							index: number
						) => (
							<Box
								id={id}
								title={title}
								description={description}
								url={url}
								urlLabel={urlLabel}
								activeNumber={activeNumber}
								setActiveNumber={setActiveNumber}
								key={index}
							/>
						)
					)}
				</div>
				<div className={styles.image}>
					<Image
						src={`/images/categories-${activeNumber}.png`}
						fill
						alt=""
						sizes="100vw"
					/>
				</div>
			</div>
		</section>
	);
};

export default Platform;

interface BoxProps extends Platfom {
	activeNumber: number;
	setActiveNumber: any;
}

const Box = ({
	id,
	title,
	description,
	url,
	urlLabel,
	activeNumber,
	setActiveNumber,
}: BoxProps) => {
	return (
		<div
			className={styles.box}
			data-active={id === activeNumber}
			onClick={() => setActiveNumber(id)}
		>
			<Title title={title} description={description} titleType="small" />
			<Link href={url}>
				<h6>{urlLabel}</h6>
				<div className={styles.icon}>
					<Image src="/svgs/chevron-yellow.svg" fill alt="" sizes="100vw" />
				</div>
			</Link>
		</div>
	);
};
