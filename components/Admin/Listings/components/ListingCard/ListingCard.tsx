"use client";

import React from "react";
import styles from "./ListingCard.module.scss";
import Image from "next/image";
import { shortenTitle } from "@/utils";
import { EllipseIcon } from "@/shared/svgs/dashboard";
import { CustomImage } from "@/shared";

interface Props {
	props: any;
	className?: string;
	activeFilter?: string;
	activeRow?: number;
	setActiveRow?: React.Dispatch<React.SetStateAction<number>>;
}

const ListingCard = ({ props, className, activeFilter }: Props) => {
	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.image}>
				<CustomImage
					src={props?.image || ""}
					alt={props?.title}
					fill
					sizes="100vw"
				/>
			</div>
			<div className={styles.row} style={{ alignItems: "flex-start" }}>
				<div className={styles.text}>
					<h2>{shortenTitle(props?.title, 50)}</h2>
				</div>
				<div className={styles.chevron}>
					<EllipseIcon color="#F76039" />
				</div>
			</div>
			<div className={styles.pricing_container}>
				<div className={styles.pricing}>
					<p>{props.price}</p>
				</div>
			</div>
		</div>
	);
};

export default ListingCard;
