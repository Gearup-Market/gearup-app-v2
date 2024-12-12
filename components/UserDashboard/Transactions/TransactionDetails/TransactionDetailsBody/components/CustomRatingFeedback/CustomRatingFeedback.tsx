"use client";
import React, { useState } from "react";
import styles from "./CustomRatingFeedback.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { Button, Ratings, StarRating, TextArea } from "@/shared";
import CustomTransactionSuccess from "../CustomTransactionSuccess/CustomTransactionSuccess";
import { usePostReview } from "@/app/api/hooks/users";
import { useAppSelector } from "@/store/configureStore";
import { iTransactionDetails } from "@/interfaces";
import toast from "react-hot-toast";

interface Props {
	item: iTransactionDetails;
	onSkip?: () => void;
	onSubmit?: () => void;
	showSuccessWarning?: boolean;
}

const CustomRatingFeedback = ({
	item,
	onSkip,
	onSubmit,
	showSuccessWarning = false
}: Props) => {
	const [rating, setRating] = useState(1);
	const [comment, setComment] = useState("");
	const { userId } = useAppSelector(s => s.user);
	const [showSuccess, setShowSuccess] = useState(showSuccessWarning);
	const { mutateAsync: postReview, isPending } = usePostReview();
	const { isBuyer, buyer, seller, id } = item;

	const handleRatingChange = (newRating: number) => {
		setRating(newRating);
	};

	const handleSubmitRating = async () => {
		try {
			if (!rating) {
				toast.error("Please provide rating");
				return;
			}
			if (onSubmit) {
				onSubmit();
				setShowSuccess(true);
			} else {
				const res = await postReview({
					reviewer: userId,
					reviewed: isBuyer ? buyer.userId : seller.userId,
					rating,
					comment,
					transaction: id
				});

				if (res.data) {
					setShowSuccess(true);
				}
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.error || "An error occurred");
		}
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
							<Ratings onChange={handleRatingChange} rating={rating} />
							<TextArea
								placeholder="Write your feedback here..."
								rows={7}
								onChange={e => setComment(e.target.value)}
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
							<Button onClick={handleSubmitRating} disabled={isPending}>
								Submit
							</Button>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default CustomRatingFeedback;
