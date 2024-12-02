"use client";

import React from "react";
import styles from "./ProfileCard.module.scss";
import Image from "next/image";
import { Button, Ratings } from "@/shared";
import { Listing } from "@/store/slices/listingsSlice";
import Link from "next/link";
import { AppRoutes } from "@/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useAppSelector } from "@/store/configureStore";

const ProfileCard = ({ listing }: { listing: Listing }) => {
	const {userId} = useAppSelector(state => state.user);
	const { location, user, reviews, averageRating, ownerTotalListings } = listing;
	return (
		<div className={styles.card}>
			<div className={styles.text}>
				<h3>LENDER&apos;S PROFILE</h3>
			</div>
			<div className={styles.row}>
				<div className={styles.small_row}>
					<div className={styles.avatar}>
						<Image
							src={user.avatar || "/svgs/user.svg"}
							alt={user.userName!}
							fill
							sizes="100vw"
						/>
					</div>
					<div className={styles.block}>
						<div
							className={styles.small_row}
							style={{ marginBottom: "1rem" }}
						>
							<div className={styles.text} style={{ marginBottom: 0 }}>
								<h3>{user.name || user.userName}</h3>
							</div>
							{user.isVerified && (
								<div className={styles.verified}>
									<Image
										src="/svgs/icon-verify.svg"
										alt=""
										fill
										sizes="100vw"
									/>
								</div>
							)}
						</div>
						{location && location.state && (
							<div className={styles.text} style={{ marginBottom: 0 }}>
								<p>{location.state}, Nigeria</p>
							</div>
						)}
						<Ratings rating={averageRating || 0} showRatingNumber readOnly />
						<div className={styles.text} style={{ marginBottom: 0 }}>
							<p>{ownerTotalListings || 0} deals</p>
						</div>
					</div>
				</div>
				{userId !== user._id && (
					<Link
						href={`${AppRoutes.userDashboard.messages}?participantId=${user?._id}&listingId=${listing?._id}`}
					>
						<Button className={styles.button} buttonType="transparent">
							<div className={styles.icon}>
								<Image src="/svgs/send.svg" alt="" fill sizes="100vw" />
							</div>
							<h5>Send a message</h5>
						</Button>
					</Link>
				)}
			</div>
			{user?.about && (
				<div className={styles.text}>
					<p>{user.about}</p>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;
