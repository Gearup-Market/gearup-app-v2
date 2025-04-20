"use client";

import React from "react";
import styles from "./CourseView.module.scss";
import { BackNavigation } from "@/shared";
import { ImageSlider, ProfileCard } from "@/components/listing";
import { useParams } from "next/navigation";
import { copyText, getIdFromSlug } from "@/utils";
import { useGetCourseById } from "@/app/api/hooks/courses";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";
import { PageLoader } from "@/shared/loaders";
import { DescriptionCard, PriceContainer } from "@/components/courses";
import { HeaderSubText } from "@/components/UserDashboard";
import Link from "next/link";
import Image from "next/image";

const CourseView = () => {
	const { course } = useParams();
	const courseId = getIdFromSlug(course.toString());
	const { isFetching, data: courseData } = useGetCourseById(courseId);
	const { data: allPricings } = useGetAllPricings();

	return (
		<section className={styles.section}>
			<BackNavigation />
			{isFetching ? (
				<PageLoader />
			) : (
				<div className={styles.row}>
					<div className={styles.large_block}>
						<ImageSlider
							images={[courseData?.data.cover || ""]}
							type={courseData?.data.courseType}
						/>
						<div className={styles.block_mob}>
							<PriceContainer
								course={courseData?.data}
								allPricings={allPricings}
							/>
						</div>
						<DescriptionCard
							description={courseData?.data.content.whatYouWillLearn || ""}
							title="YOU'LL LEARN"
						/>
						<DescriptionCard
							description={courseData?.data.content.tableOfContent || ""}
							title="CONTENT"
						/>
						<DescriptionCard
							description={courseData?.data.description || ""}
						/>
						<div className={styles.blockchain_info}>
							<HeaderSubText title="Blockchain information" />
							<div className={styles.blockchain_info_container}>
								{courseData?.data?.transactionId ? (
									<>
										<div
											className={styles.blockchain_label_container}
										>
											<p className={styles.view_explorer_title}>
												Transaction ID
											</p>
											<Link
												href={`https://stellar.expert/explorer/public/tx/${courseData?.data?.transactionId}`}
												target="_blank"
												className={styles.view_explorer}
											>
												View explorer
											</Link>
										</div>
										<div
											className={styles.blockchain_number_container}
										>
											<p className={styles.blockchain_number}>
												{courseData?.data?.transactionId}
											</p>
											<p className={styles.blockchain_copy_icon}>
												<Image
													src="/svgs/copy.svg"
													alt="copy-icon"
													width={10}
													height={10}
													onClick={() =>
														copyText(
															courseData?.data
																?.transactionId ?? ""
														)
													}
												/>
											</p>
										</div>
									</>
								) : null}
								{courseData?.data?.nftTokenId ? (
									<div className={styles.blockchain_token_container}>
										<p className={styles.token_id_title}>Token ID</p>
										<p className={styles.token_id}>
											{courseData?.data?.nftTokenId}
										</p>
									</div>
								) : null}
							</div>
						</div>
					</div>
					<div className={styles.block_desk}>
						<PriceContainer
							course={courseData?.data}
							allPricings={allPricings}
						/>
					</div>
				</div>
			)}
			<div className={styles.divider}></div>
		</section>
	);
};

export default CourseView;
