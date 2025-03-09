"use client";

import React, { useState } from "react";
import styles from "./DescriptionCard.module.scss";

interface Props {
	description: string;
	title?: string;
	initialLength?: number;
}

// const initialLength = 250;

const DescriptionCard = ({
	description,
	title = "DESCRIPTION",
	initialLength = 250
}: Props) => {
	const [textLength, setTextLength] = useState<number>(initialLength);
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>{title}</h3>
			</div>
			<div className={styles.text}>
				<p>{description.slice(0, textLength)}</p>
			</div>
			{description.length > initialLength && (
				<div
					className={styles.button}
					onClick={() => {
						textLength === description.length
							? setTextLength(initialLength)
							: setTextLength(description.length);
					}}
				>
					<p>{textLength === description.length ? "Show Less" : "Read more"}</p>
				</div>
			)}
		</div>
	);
};

export default DescriptionCard;
