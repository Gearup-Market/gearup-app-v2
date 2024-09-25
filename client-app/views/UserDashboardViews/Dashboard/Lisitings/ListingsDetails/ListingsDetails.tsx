"use client";
import React from "react";
import styles from "./ListingsDetails.module.scss";
import { BackNavigation } from "@/shared";
import {
	BuyRentDetailsBody,
	BuyRentDetailsHeader,
	CourseListingDetails
} from "@/components/UserDashboard/Listings/ListingDetailsComp";
import { useParams } from "next/navigation";
import { useSingleListing } from "@/hooks/useListings";
import { PageLoader } from "@/shared/loaders";
import { useAppSelector } from "@/store/configureStore";

const ListingsDetails = () => {
	const { listingId } = useParams();
	const { currentListing } = useAppSelector(s => s.listings);
	const { refetch, isFetching } = useSingleListing(listingId.toString());

	if (!currentListing && isFetching) return <PageLoader />;
	if (!currentListing) return null;

	return (
		<div className={styles.container}>
			<BackNavigation />
			{currentListing.listingType === "course" ? (
				<CourseListingDetails />
			) : (
				<>
					<BuyRentDetailsHeader listing={currentListing}/>
					<BuyRentDetailsBody listing={currentListing}/>
				</>
			)}
		</div>
	);
};

export default ListingsDetails;
