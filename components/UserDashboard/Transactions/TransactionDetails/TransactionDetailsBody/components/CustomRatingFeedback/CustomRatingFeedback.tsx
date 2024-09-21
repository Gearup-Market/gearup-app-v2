"use client";
import React, { useState } from "react";
import styles from "./CustomRatingFeedback.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { Button, Ratings, StarRating, TextArea } from "@/shared";
import CustomTransactionSuccess from "../CustomTransactionSuccess/CustomTransactionSuccess";

interface Props {
	onSkip?: () => void;
	onSubmit?: () => void;
	showSuccessWarning?: boolean;
}

const CustomRatingFeedback = ({
	onSkip,
	onSubmit,
	showSuccessWarning = false
}: Props) => {
	const [rating, setRating] = useState(0);
	const [showSuccess, setShowSuccess] = useState(false);

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

	const handleSubmitRating = () => {
		if (onSubmit) {
			onSubmit();
		}
		setShowSuccess(true);
	};

	const handleSkip = () => {
		if (onSkip) {
			onSkip();
		}
		setShowSuccess(true);
	};

	return (
		<div className={styles.wrapper}>
			{showSuccess ? (
        <div className={styles.success}>
					<CustomTransactionSuccess showWarning={showSuccessWarning} />
				</div>
			) : (
        <>
        <div className={styles.container}>
					<div className={styles.container_top}>
						<HeaderSubText
							title="Rating and feedback"
							description="Please tell us about your lending experience and rate the services"
						/>
						<Ratings />
						<TextArea
							placeholder="Write your feedback here..."
							rows={7}
							className={styles.textarea}
						/>
					</div>
					<div className={styles.btn_container}>
						<Button
							onClick={handleSkip}
							buttonType="transparent"
							className={styles.skip_btn}
						>
							Skip
						</Button>
						<Button onClick={handleSubmitRating}>Submit</Button>
					</div>
      </div>
				</>
			)}
		</div>
	);
};

export default CustomRatingFeedback;
