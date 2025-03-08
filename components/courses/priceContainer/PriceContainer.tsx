import React from "react";
import styles from "./PriceContainer.module.scss";
import { Course } from "@/store/slices/coursesSlice";
import { PricingData } from "@/app/api/hooks/Admin/pricing/types";
import { formatNumber } from "@/utils";
import { Button, Ratings } from "@/shared";
import { CourseType } from "@/views/CourseListingView/CourseListingView";
import format from "date-fns/format";
import Image from "next/image";

const PriceContainer = ({
	course,
	allPricings
}: {
	course?: Course;
	allPricings?: PricingData;
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.price_card}>
				<div className={styles.card_header}>
					<div className={styles.text} style={{ marginBottom: "1.6rem" }}>
						<h2>{course?.title}</h2>
					</div>
					<div className={styles.small_row} style={{ marginBottom: "1.2rem" }}>
						<div className={styles.text}>
							<h4>4.54</h4>
						</div>
						<Ratings readOnly />
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
									src={"/svgs/user.svg"}
									alt={course?.author || ""}
									fill
									sizes="100vw"
								/>
							</div>
							<div className={styles.text} style={{ marginBottom: 0 }}>
								<p>user</p>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.buttons}>
					<Button className={styles.button}>Add to cart</Button>
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
								<h3>{course?.ebooks?.size}</h3>
							</li>
						</>
					)}
					{course?.courseType === CourseType.Live && (
						<>
							<li className={styles.offer}>
								<p>Start Date</p>
								<h3>
									{format(
										course?.liveTutorials?.startDate as Date,
										"MM/dd/yyyy"
									)}
								</h3>
							</li>
							<li className={styles.offer}>
								<p>End Date</p>
								<h3>
									{format(
										course?.liveTutorials?.endDate as Date,
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
								<h3>{course?.videoTutorials?.duration}</h3>
							</li>
							<li className={styles.offer}>
								<p>Size</p>
								<h3>{course?.videoTutorials?.size}</h3>
							</li>
						</>
					)}
					{course?.courseType === CourseType.Audio && (
						<>
							<li className={styles.offer}>
								<p>Duration</p>
								<h3>{course?.audioTutorials?.duration}</h3>
							</li>
							<li className={styles.offer}>
								<p>Size</p>
								<h3>{course?.audioTutorials?.size}</h3>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default PriceContainer;
