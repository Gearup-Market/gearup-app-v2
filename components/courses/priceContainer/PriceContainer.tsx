"use client";

import React from "react";
import styles from "./PriceContainer.module.scss";
import { Course } from "@/store/slices/coursesSlice";
import { PricingData } from "@/app/api/hooks/Admin/pricing/types";
import { AppRoutes, formatNumber } from "@/utils";
import { Button, Ratings } from "@/shared";
import { CourseType } from "@/views/CourseListingView/CourseListingView";
import format from "date-fns/format";
import Image from "next/image";
import useCart from "@/hooks/useCart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/configureStore";
import toast from "react-hot-toast";
import { TransactionType } from "@/app/api/hooks/transactions/types";

const PriceContainer = ({
	course,
	allPricings
}: {
	course?: Course;
	allPricings?: PricingData;
}) => {
	const { addItemToCart } = useCart();
	const search = useSearchParams();
	const router = useRouter();
	const user = useAppSelector(state => state.user);
	const pathname = usePathname();

	const pricing = course?.price || 0;

	const vat = (allPricings?.valueAddedTax! / 100) * pricing || 0;
	const serviceFee = (allPricings?.courseBuyerFee! / 100) * pricing || 0;

	const total = pricing + serviceFee + vat;

	const handleAddToCart = () => {
		if (!user.kyc) {
			toast.error("Please complete kyc");
			router.push("/verification");
			return;
		}
		if (user._id === course?.author._id) return toast.error("Can not buy own course");
		try {
			addItemToCart({
				listing: course as Course,
				type: TransactionType.Sale,
				listingModelType: "Course"
			});
		} catch (error) {
			console.log(error);
		}
	};

	const goToChat = () => {
		if (user._id === course?.author._id)
			return toast.error("Can not buy own course?");
		router.push(
			user.isAuthenticated
				? `${AppRoutes.userDashboard.messages}?participantId=${course?.author?._id}&courseId=${course?._id}&fromListing=true`
				: `/signup`
		);
	};

	// console.log(course);

	return (
		<div className={styles.container}>
			<div className={styles.price_card}>
				<div className={styles.card_header}>
					<div className={styles.text} style={{ marginBottom: "1.6rem" }}>
						<h2>{course?.title}</h2>
					</div>
					<div className={styles.small_row} style={{ marginBottom: "1.2rem" }}>
						<div className={styles.text}>
							<h4>{course?.author.rating}</h4>
						</div>
						<Ratings readOnly rating={course?.author.rating} />
						<div className={styles.text}>
							<span>
								({/* {props.reviews}  */}
								reviews)
							</span>
						</div>
					</div>
					<div className={styles.text}>
						<h1>₦{formatNumber(course?.price || 0)}</h1>
					</div>
					<div className={styles.divider}></div>
					<div className={styles.row}>
						<div className={styles.small_row}>
							<div className={styles.avatar}>
								<Image
									src={course?.author.avatar || "/svgs/user.svg"}
									alt={course?.author.userName || ""}
									fill
									sizes="100vw"
								/>
							</div>
							<div className={styles.text} style={{ marginBottom: 0 }}>
								<p>
									{course?.author.userName ||
										course?.author.firstName ||
										course?.author.lastName ||
										"user"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button className={styles.button} onClick={handleAddToCart}>
						Add to cart
					</Button>
					<Button
						buttonType="secondary"
						className={`${styles.button} ${styles.ask_question}`}
						onClick={goToChat}
					>
						Ask a question
					</Button>
				</div>
			</div>
			<div className={styles.additional_offers_container}>
				<h2 className={styles.title}>{course?.subtitle}</h2>
				<ul className={styles.offers_container}>
					{course?.courseType === CourseType.Ebook && (
						<>
							<li className={styles.offer}>
								<p>Pages</p>
								<h3>{course?.ebooks?.pages}</h3>
							</li>
							<li className={styles.offer}>
								<p>Size</p>
								<h3>{course?.ebooks?.size}MB</h3>
							</li>
						</>
					)}
					{course?.courseType === CourseType.Live && (
						<>
							<li className={styles.offer}>
								<p>Start Date</p>
								<h3>
									{format(
										course?.liveSessionDetails?.dateRange
											.startDate as Date,
										"MM/dd/yyyy"
									)}
								</h3>
							</li>
							<li className={styles.offer}>
								<p>End Date</p>
								<h3>
									{format(
										course?.liveSessionDetails?.dateRange
											.endDate as Date,
										"MM/dd/yyyy"
									)}
								</h3>
							</li>
						</>
					)}
					{course?.courseType === CourseType.Video && (
						<>
							<li className={styles.offer}>
								<p>Duration</p>
								<h3>{course?.videoTutorials?.duration} mins</h3>
							</li>
							<li className={styles.offer}>
								<p>Size</p>
								<h3>{course?.videoTutorials?.size}MB</h3>
							</li>
						</>
					)}
					{course?.courseType === CourseType.Audio && (
						<>
							<li className={styles.offer}>
								<p>Duration</p>
								<h3>{course?.audioTutorials?.duration} mins </h3>
							</li>
							<li className={styles.offer}>
								<p>Size</p>
								<h3>{course?.audioTutorials?.size}MB</h3>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default PriceContainer;
