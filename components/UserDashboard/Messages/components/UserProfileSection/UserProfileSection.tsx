import React from "react";
import styles from "./UserProfileSection.module.scss";
import Image from "next/image";
import { CustomImage, Ratings } from "@/shared";
import { VerifyIcon } from "@/shared/svgs/dashboard";
import { useSearchParams } from "next/navigation";
import { Box } from "@mui/material";
import { CircularProgressLoader } from "@/shared/loaders";
import { useGetUserDetails } from "@/app/api/hooks/users";
import { useSingleListing } from "@/hooks/useListings";
import { useGetListingById } from "@/app/api/hooks/listings";

const UserProfileSection = () => {
	const searchParams = useSearchParams();
	const participantId = searchParams.get("participantId");
	const listingId = searchParams.get("listingId");
	const { isFetching: fetchingUser, data } = useGetUserDetails({
		userId: participantId as string
	});
	const {
		data: listing,
		isFetching: fetchingListing,
		refetch,
		error
	} = useGetListingById(listingId as string);

	const isRent = !!listing?.data?.offer
	const isBuy = !!listing?.data?.offer?.forSell
	const price = listing?.data?.offer?.forSell?.pricing || listing?.data?.offer?.forRent?.day1Offer;
	const isBoth = isRent && isBuy;
	const currency = listing?.data?.offer?.forSell?.currency || listing?.data?.offer?.forRent?.currency;

	return (
		<div className={styles.container}>
			{fetchingUser || fetchingListing ? (
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					height="30rem"
				>
					<CircularProgressLoader color="#ffb30f" size={30} />
				</Box>
			) : (
				<>
					<div className={styles.profile_details}>
						<h4 className={styles.title}>PROFILE</h4>
						<div className={styles.profile_image}>
							<CustomImage
								src="/svgs/avatar.svg"
								height={150}
								width={150}
								alt="avatar"
							/>
						</div>
						<p className={styles.name}>
							{data?.data?.name || data?.data?.userName}
							{
								data?.data?.isVerified &&
							<span className={styles.verfiy_icon}>
								<VerifyIcon />
							</span>
							}
						</p>
						<p className={styles.location}>Lagos, Nigeria</p>
						<div className={styles.ratings_container}>
							<Ratings rating={0} showRatingNumber={true} />
						</div>
						<p>0 deals</p>
						<div className={styles.socials_icon}>
							<span className={styles.icon}>
								<Image
									src="/svgs/twitter.svg"
									alt="twitter-icon"
									height={30}
									width={30}
								/>
							</span>
							<span className={styles.icon}>
								<Image
									src="/svgs/insta.svg"
									alt="insta-icon"
									height={30}
									width={30}
								/>
							</span>
							<span className={styles.icon}>
								<Image
									src="/svgs/linkedin.svg"
									alt="linkedin-icon"
									height={30}
									width={30}
								/>
							</span>
							<span className={styles.icon}>
								<Image
									src="/svgs/facebook.svg"
									alt="fb-icon"
									height={30}
									width={30}
								/>
							</span>
						</div>
					</div>
					<div className={styles.conversation_about}>
						<p className={styles.title}>CONVERSATION ABOUT</p>
					
								<div className={styles.conversation_image}>
									<CustomImage
										src={listing?.data.listingPhotos[0] ?? "/svgs/convo_image.svg"}
										height={150}
										width={150}
										alt="avatar"
									/>
								</div>
								<h2 className={styles.convo_name}>
									{listing?.data.productName}
								</h2>
								<p className={styles.text}>
									<span className={styles.amount}>{`${currency} ${price}`}</span>
									{
										isRent &&
									<span className={styles.day}>/Day</span>
									}
								</p>
						
					</div>
				</>
			)}
		</div>
	);
};

export default UserProfileSection;
