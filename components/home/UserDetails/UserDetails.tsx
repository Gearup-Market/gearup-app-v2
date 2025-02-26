"use client";
import React, { useMemo } from "react";
import styles from "./UserDetails.module.scss";
import { BackNavigation, InputField } from "@/shared";
import UserDetailsProfile from "./UserProfile/UserProfile";
import { HeaderSubText } from "@/components/UserDashboard";
import NoListings from "@/components/UserDashboard/Listings/NoListings/NoListings";
import { ListingCard } from "@/components/UserDashboard/Listings/components";
import Image from "next/image";
import { useGetUserDetails, useGetUserReviews } from "@/app/api/hooks/users";
import { Box, CircularProgress } from "@mui/material";
import LatestReviews from "./LatestReviews/LatestReviews";
import { useFetchUserDetailsById } from "@/hooks/useUsers";
import { useGetListingsByUser } from "@/app/api/hooks/listings";

interface Props {
	userId: string;
}

const UserDetails = ({ userId }: Props) => {
	// get user details
	const { fetchingUser, user } = useFetchUserDetailsById(userId);
	const { data: userReviews, isLoading } = useGetUserReviews({ userId });

	// get user listings using id
	const { data, isFetching, refetch } = useGetListingsByUser({
		userId: user?.userId
	});

	const mappedListings = useMemo(() => {
		if (!data?.data) return [];
		return data?.data?.map(
			({
				_id,
				productName,
				offer,
				createdAt,
				listingType,
				status,
				listingPhotos,
				category
			}) => {
				const type = listingType === "both" ? "rent | sell" : listingType;
				const price =
					type === "rent"
						? offer?.forRent?.rates.length
							? offer?.forRent?.rates[0].price
							: 0
						: offer?.forSell?.pricing;
				const image = listingPhotos?.[0] || null;
				return {
					id: _id,
					title: productName,
					price,
					transaction_date: createdAt,
					type,
					status,
					image,
					availability: status === "available" ? "active" : "inactive",
					date: createdAt,
					sold_count: 0,
					revenue: 0,
					category: category?.name?.toLowerCase() || null
				};
			}
		);
	}, [data]);

	if (fetchingUser) {
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh"
				}}
			>
				<CircularProgress style={{ color: "#FFB30F" }} />
			</Box>
		);
	}

	// if(user?.data) return null

	return (
		<div className={styles.container}>
			<BackNavigation />
			<div className={styles.details_body}>
				<div>
					<UserDetailsProfile user={user} />
				</div>
				<div>
					{!!user?.about && (
						<div className={styles.about_container}>
							<HeaderSubText title="About" variant="medium" />
							<div className={styles.about}>
								<p>{user?.about}</p>
							</div>
						</div>
					)}
					<div className={styles.listing_container}>
						<HeaderSubText title="Listings" variant="medium" />
						{isFetching ? (
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									height: "400px"
								}}
							>
								<CircularProgress style={{ color: "#FFB30F" }} />
							</Box>
						) : (
							<>
								{mappedListings?.length < 1 ? (
									<div className={styles.listing_bg}>
										<NoListings
											showCreateButton={false}
											description="No Listings To Show"
										/>
									</div>
								) : (
									<>
										<div
											className={
												styles.container__input_filter_container
											}
										>
											<InputField
												placeholder="Search"
												icon="/svgs/icon-search-dark.svg"
												iconTitle="search-icon"
											/>
											<div className={styles.filter_icon_container}>
												<Image
													src="/svgs/icon-filter.svg"
													alt="filter"
													width={16}
													height={16}
												/>
												<p>Filter</p>
											</div>
										</div>
										<div className={styles.container__grid}>
											{mappedListings?.map(item => (
												<ListingCard
													key={item.id}
													props={item}
													showMoreIcon={false}
													showStatusIcon={false}
												/>
											))}
										</div>
									</>
								)}
							</>
						)}
					</div>
					<LatestReviews reviews={userReviews?.data || []} />
				</div>
			</div>
		</div>
	);
};

export default UserDetails;
