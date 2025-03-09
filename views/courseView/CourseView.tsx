"use client";

import React from "react";
import styles from "./CourseView.module.scss";
import { BackNavigation } from "@/shared";
import { ImageSlider, ProfileCard } from "@/components/listing";
import { useParams } from "next/navigation";
import { getIdFromSlug } from "@/utils";
import { useGetCourseById } from "@/app/api/hooks/courses";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";
import { PageLoader } from "@/shared/loaders";
import { DescriptionCard, PriceContainer } from "@/components/courses";

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

			{/* {ownerOtherListings && ownerOtherListings.length > 0 && (
        <>
            <div className={styles.text}>
                <h1>
                    {forSale
                        ? "Other listings from the same seller"
                        : "Other listings from the same lender"}
                </h1>
            </div>
            <div className={styles.section_grid}>
                {ownerOtherListings &&
                    ownerOtherListings
                        .slice(3)
                        .map((listing, index: number) => (
                            <Listing
                                props={listing}
                                className={styles.card}
                                key={index}
                            />
                        ))}
            </div>
        </>
    )} */}
		</section>
	);
};

export default CourseView;
