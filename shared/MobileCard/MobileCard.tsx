"use client";
import React, { useState } from "react";
import styles from "./MobileCard.module.scss";
import Image from "next/image";
import CustomImage from "../customImage/CustomImage";
import { formatNum } from "@/utils";

interface Props {
	mainHeaderText?: string;
	subHeaderText?: string;
	mainHeaderImage?: string;
	lastEle?: boolean;
	ind?: number;
	children?: React.ReactNode;
}

const MobileCard = ({
	mainHeaderImage,
	mainHeaderText,
	subHeaderText,
	lastEle,
	ind,
	children
}: Props) => {
	const [showDetails, setShowDetails] = React.useState<boolean>(false);
	return (
		<div className={styles.container}>
			<div
				className={styles.container__header}
				data-index={ind}
				data-lastele={lastEle && !showDetails}
			>
				<div className={styles.container__header__left}>
					<div className={styles.avatar}>
						<CustomImage
							src={mainHeaderImage || "/images/admin-img.jpg"}
							alt={mainHeaderText || "custom-image"}
							fill
							// width={16}
							// height={16}
							className={styles.image}
						/>
					</div>
					<div
						className={styles.container__header__left__name_amount}
						data-pos={!subHeaderText ? "center" : "apart"}
					>
						<p className={styles.name}>{mainHeaderText}</p>
						{!!subHeaderText && (
							<p className={styles.amount}>{subHeaderText}</p>
						)}
					</div>
				</div>
				<span
					className={styles.container__header__icon}
					data-rotate={showDetails}
					onClick={() => setShowDetails(prev => !prev)}
				>
					<Image
						src={"/svgs/new-chevron.svg"}
						alt={"toggle-icon"}
						width={12}
						height={12}
					/>
				</span>
			</div>
			{showDetails && (
				<div className={styles.container__details} data-lastEle={lastEle}>
					{children}
				</div>
			)}
		</div>
	);
};

export default MobileCard;
