"use client";

import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import styles from "./Rating.module.scss";

interface Props {
	readOnly?: boolean;
	rating?: number;
	showRatingNumber?: boolean;
	onChange?: (rating: number) => void;
}

const Ratings = ({ readOnly = false, rating = 5, showRatingNumber = false, onChange }: Props) => {
	const [localRating, setLocalRating] = useState<number>(rating);

	const handleChange = (rating: number) => {
		if(onChange){
			onChange(rating);
		}
		setLocalRating(rating)
	}
	return (
		<div className={styles.container}>
			<Rating value={localRating} onChange={handleChange} readOnly={readOnly} />
			{showRatingNumber && (
				<div className={styles.text}>
					<h5>{localRating}</h5>
				</div>
			)}
		</div>
	);
};

export default Ratings;
