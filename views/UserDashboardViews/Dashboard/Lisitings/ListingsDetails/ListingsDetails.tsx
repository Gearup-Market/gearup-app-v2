"use client";
import React from "react";
import styles from "./ListingsDetails.module.scss";
import { BackNavigation } from "@/shared";
import {
	BuyRentDetailsBody,
	BuyRentDetailsHeader,
	CourseListingDetails
} from "@/components/UserDashboard/Listings/ListingDetailsComp";
import { useParams, useSearchParams } from "next/navigation";
import { useGetSingleCourse, useSingleListing } from "@/hooks/useListings";
import { PageLoader } from "@/shared/loaders";
import { useAppSelector } from "@/store/configureStore";
import { Listing } from "@/store/slices/listingsSlice";
import BuyCourseHeader from "@/components/UserDashboard/Listings/ListingDetailsComp/buyCourseHeader/BuyCourseHeader";
import { useGetCourseById } from "@/app/api/hooks/courses";
import { getIdFromSlug } from "@/utils";
import { Course } from "@/store/slices/coursesSlice";
import BuyCourseDetails from "@/components/UserDashboard/Listings/ListingDetailsComp/buyCourseDetails/BuyCourseDetails";
import { useGetListingById } from "@/app/api/hooks/listings";

const ListingsDetails = () => {
	const { listingId } = useParams();
	const { currentListing } = useAppSelector(s => s.listings);
	const { currentCourse } = useAppSelector(s => s.courses);
	const search = useSearchParams();
	const searchParams = new URLSearchParams(search.toString());
	const type = searchParams.get("type");
	const {
		data: listing,
		isFetching,
		refetch,
		error
	} = useGetListingById(type !== "courses" ? listingId.toString() : "");
	const courseId = getIdFromSlug(listingId.toString());
	const { refetch: courseRefetch, isFetching: isCourseFetching } = useGetSingleCourse(
		type === "courses" ? courseId : ""
	);

	if (!courseId || !listingId) return <PageLoader />;

	if (
		((type === "rent" || type === "buy") && !listing && isFetching) ||
		(type === "course" && !currentCourse && isCourseFetching)
	)
		return <PageLoader />;

	if (type !== "courses" && (!listing || !listing.data)) {
		return <PageLoader />; // Fallback UI
	}

	if (type === "courses" && !currentCourse) {
		return <PageLoader />; // Fallback UI
	}
	// if (!currentListing) return null;

	return (
		<div className={styles.container}>
			<BackNavigation />
			{type && type === "courses" ? (
				// <CourseListingDetails />
				<>
					<BuyCourseHeader course={currentCourse as Course} />
					<BuyCourseDetails
						refetch={courseRefetch}
						course={currentCourse as Course}
					/>
				</>
			) : (
				<>
					<BuyRentDetailsHeader
						listing={listing?.data}
						isFetching={isFetching}
						refetch={refetch}
					/>
					<BuyRentDetailsBody listing={listing?.data} />
				</>
			)}
		</div>
	);
};

export default ListingsDetails;
