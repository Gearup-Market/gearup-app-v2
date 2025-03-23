import React from "react";
import styles from "./UserProfileSection.module.scss";
import Image from "next/image";
import { CustomImage, Ratings } from "@/shared";
import { VerifyIcon } from "@/shared/svgs/dashboard";
import { useRouter, useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { CircularProgressLoader } from "@/shared/loaders";
import { useGetUserDetails } from "@/app/api/hooks/users";
import { useSingleListing } from "@/hooks/useListings";
import { useGetListingById } from "@/app/api/hooks/listings";
import UserSocials from "@/shared/userSocials/UserSocials";
import { UserUpdateResp } from "@/app/api/hooks/users/types";
import { formatNum, shortenTitle } from "@/utils";

const UserProfileSection = () => {
	const searchParams = useSearchParams();
	const participantId = searchParams.get("participantId");
	const listingId = searchParams.get("listingId");
	const router = useRouter();
	const { isFetching: fetchingUser, data } = useGetUserDetails({
		userId: participantId as string
	});
	const {
		data: listing,
		isFetching: fetchingListing,
		refetch,
		error
	} = useGetListingById(listingId as string);

	const isRent = !!listing?.data?.offer;
	const isBuy = !!listing?.data?.offer?.forSell;
	const price =
		listing?.data?.offer?.forSell?.pricing ||
		(listing?.data?.offer?.forRent?.rates.length
			? listing?.data?.offer?.forRent?.rates[0].price
			: 0);
	const isBoth = isRent && isBuy;
	const currency =
		listing?.data?.offer?.forSell?.currency ||
		listing?.data?.offer?.forRent?.currency;

	return (
		<div className={styles.container}>
			{fetchingUser || fetchingListing ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="30rem"
				>
					<CircularProgressLoader color="#F76039" size={30} />
				</Box>
			) : (
				<>
					<div className={styles.profile_details}>
						<h4 className={styles.title}>PROFILE</h4>
						<div className={styles.profile_image}>
							<CustomImage
								src={
									!!data?.data?.avatar
										? data?.data?.avatar
										: "/svgs/avatar-user.svg"
								}
								height={150}
								width={150}
								alt="avatar"
								style={{ borderRadius: "50%" }}
							/>
						</div>
						<p className={styles.name}>
							{shortenTitle(data?.data?.name || "", 20) ||
								shortenTitle(data?.data?.userName || "", 20)}
							{data?.data?.isVerified && (
								<span className={styles.verfiy_icon}>
									<VerifyIcon />
								</span>
							)}
						</p>
						<p className={styles.location}>{data?.data.address ?? "N//A"}</p>
						<div className={styles.ratings_container}>
							<Ratings
								rating={data?.data?.rating || 0}
								showRatingNumber={true}
								readOnly
							/>
						</div>
						<p>{data?.data?.totalDeals} deals</p>
						<UserSocials user={data?.data as UserUpdateResp} />
					</div>
					{listing?.data && (
						<div className={styles.conversation_about}>
							<p className={styles.title}>CONVERSATION ABOUT</p>

							<div className={styles.conversation_image}>
								<CustomImage
									src={
										listing?.data.listingPhotos[0] ??
										"/svgs/convo_image.svg"
									}
									height={150}
									width={150}
									alt="avatar"
								/>
							</div>
							<h2
								className={styles.convo_name}
								style={{ cursor: "pointer" }}
								onClick={() =>
									router.push(`/listings/${listing?.data.productSlug}`)
								}
							>
								{listing?.data.productName}
							</h2>
							<p className={styles.text}>
								<span className={styles.amount}>{`${currency} ${formatNum(
									price
								)}`}</span>
								{isRent && (
									<span className={styles.day}>
										/{listing.data.offer.forRent?.rates[0].duration}
									</span>
								)}
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default UserProfileSection;
