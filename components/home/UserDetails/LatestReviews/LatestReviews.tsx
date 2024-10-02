import React, { useState } from "react";
import styles from "./LatestReviews.module.scss";
import { HeaderSubText } from "@/components/UserDashboard";
import { Button, CustomImage, Ratings } from "@/shared";

const LatestReviews = () => {
	const [activeReview, setActiveReview] = useState(1);
	const [animationDirection, setAnimationDirection] = useState(""); // Track animation direction
	const reviews = [1, 2, 3, 4, 5, 6, 7, 8];

	const nextReview = () => {
		if (activeReview < reviews.length) {
			setAnimationDirection("next");
			setActiveReview(prev => prev + 1);
		}
	};

	const prevReview = () => {
		if (activeReview > 1) {
			setAnimationDirection("prev");
			setActiveReview(prev => prev - 1);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header_container}>
				<HeaderSubText title="Latest reviews" variant="medium" />
				<div className={styles.button_container}>
					<Button
						onClick={prevReview}
						disabled={activeReview === 1}
						iconPrefix="/svgs/chevron-left.svg"
					>
					<p>	Previous</p>
					</Button>
					<Button
						onClick={nextReview}
						disabled={activeReview === reviews.length}
						iconSuffix="/svgs/chevron-rightbtn.svg"
					>
					<p>	Next</p>
					</Button>
				</div>
			</div>
			<div>
				{reviews.map((item) => (
					<div
						className={`${styles.review_body} ${item === activeReview
							? animationDirection === "next"
								? styles.slide_in_right
								: styles.slide_in_left
							: animationDirection === "next"
							? styles.slide_out_left
							: styles.slide_out_right
						}`}
						key={item}
						data-active={item === activeReview}
					>
						<div className={styles.review_body__top}>
							<div className={styles.avatar}>
								<CustomImage
									src="/images/admin-img.jpg"
									height={40}
									width={40}
									alt="reviewer-img"
								/>
							</div>
							<div>
								<h3>Kelly Williams {item}</h3>
								<Ratings rating={4} />
							</div>
						</div>
						<p>
							Everything went as it should. You can therefore safely rent
							out your equipment to Fantom Film.
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default LatestReviews;
