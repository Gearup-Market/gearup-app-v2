"use client";

import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import styles from "./Rating.module.scss";

interface Props {
	readOnly?: boolean;
	rating?: number;
	showRatingNumber?: boolean;
}

const Ratings = ({ readOnly = false, rating = 5, showRatingNumber = false }: Props) => {
	const [localRating, setLocalRating] = useState<number>(rating);

	return (
		<div className={styles.container}>
			<Rating value={localRating} onChange={setLocalRating} readOnly={readOnly} />
			{showRatingNumber && (
				<div className={styles.text}>
					<h5>{localRating}</h5>
				</div>
			)}
		</div>
	);
};

export default Ratings;
