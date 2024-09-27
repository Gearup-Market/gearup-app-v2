import { formatNum } from "@/utils";
import Image from "next/legacy/image";
import React from "react";
import styles from "./DetailContainer.module.scss";

interface Props {
	title?: string;
	value?: string | number;
	prefix?: string;
	suffix?: string;
	description?: string;
	className?: string;
	textClassName?: string;
	textType?: "gain" | "loss";
}

const DetailContainer = ({
	title,
	value,
	description,
	prefix,
	suffix,
	className,
	textClassName,
	textType,
}: Props) => {
	return (
		<>
			<div className={`${styles.container} ${className}`}>
				<div className={styles.row}>
					<div className={styles.text}>
						<p>{title}</p>
					</div>
				</div>
				<div
					className={`${styles.text} ${textClassName}`}
					style={{ maxWidth: "70%", textAlign: "right" }}
					data-type={textType}
				>
					<h5>
						{prefix}
						{typeof value === "number" ? formatNum(value) : value} {suffix}
					</h5>
				</div>
			</div>
			{description && (
				<div className={`${styles.text} ${styles.description}`}>
					<h6>{description}</h6>
				</div>
			)}
		</>
	);
};

export default DetailContainer;
