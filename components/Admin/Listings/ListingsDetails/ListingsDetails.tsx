"use client";
import React from "react";
import styles from "./ListingsDetails.module.scss";
import { BackNavigation, Button } from "@/shared";
import { HeaderSubText } from "@/components/UserDashboard";
import PersonalDetails from "../../Transactions/TransactionDetails/TransactionDetailsBody/components/PersonalDetails/PersonalDetails";
import BuyRentListing from "./components/BuyRentListing/BuyRentListing";
import CourseListing from "./components/CourseListing/CourseListing";
import { PageLoader } from "@/shared/loaders";
import { useSingleListing } from "@/hooks/useListings";
import { useAppSelector } from "@/store/configureStore";
import { useParams } from "next/navigation";
import { useFetchUserDetailsById } from "@/hooks/useUsers";

const ListingsDetails = () => {
	const listingType: string = "buy-rent";
	const { listingId } = useParams();
	const { currentListing } = useAppSelector(s => s.listings);
	const { refetch, isFetching } = useSingleListing(listingId.toString());
	const { fetchingUser, user } = useFetchUserDetailsById(
		currentListing?.user._id ?? ""
	);

	if (!currentListing && isFetching) return <PageLoader />;
	if (!currentListing) return null;

	return (
		<div className={styles.container}>
			<BackNavigation />
			<div className={styles.header_container}>
				<HeaderSubText title="Review listing" variant="main" />
				<div className={styles.btn_container}>
					<Button className={styles.decline_btn}>Decline</Button>
					<Button className={styles.accept_btn}>Approve</Button>
				</div>
			</div>
			<main className={styles.main_container}>
				<div className={styles.left_container}>
					{listingType === "courses" ? (
						<CourseListing />
					) : (
						<>
							<BuyRentListing listing={currentListing} />
						</>
					)}
				</div>
				<div className={styles.right_container}>
					<PersonalDetails
						profileLink={`/admin/users/${user?.userId}`}
						title="Merchant"
						name={user?.userName}
						subText={user?.address || "Nigeria"}
					/>
				</div>
			</main>
			<div className={styles.btn_container_mob}>
				<Button className={styles.decline_btn}>Decline</Button>
				<Button className={styles.accept_btn}>Approve</Button>
			</div>
		</div>
	);
};

export default ListingsDetails;
