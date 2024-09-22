"use client";

import React from "react";
import styles from "./Listing.module.scss";
import Image from "next/image";
import { Button } from "..";
import { formatLink, formatNumber, shortenTitle } from "@/utils";
import Link from "next/link";
import { Listing as iListing, setListings } from "@/store/slices/listingsSlice";
import { useAppDispatch } from "@/store/configureStore";
import { ListingType } from "@/interfaces";

interface Props {
	props: iListing;
	className?: string;
	actionType?: string;
}

const Listing = ({ props, className, actionType }: Props) => {
	const dispatch = useAppDispatch();
	const {
		_id: id,
		offer,
		listingPhotos,
		productName,
		productSlug,
		listingType,
		user,
		totalReviews,
		averageRating
	} = props;
	const forSale = !!offer?.forSell;
	const forRent = !!offer?.forRent;

	const onClickListing = () => {
		dispatch(
			setListings({
				currentListing: props
			})
		);
	};
	const listingUrl = actionType
		? `/listings/${productSlug}?type=${actionType}`
		: `/listings/${productSlug}`;

	return (
		<Link
			href={listingUrl}
			className={`${styles.container} ${className}`}
			onClick={onClickListing}
		>
			<div className={styles.image}>
				<Image
					src={listingPhotos[0]}
					alt={productName || ""}
					fill
					sizes="100vw"
				/>
				<div className={styles.button_container} data-active={forSale}>
					{forSale && <Button className={styles.button}>Buy</Button>}
					{forRent && <Button className={styles.button}>Rent</Button>}
				</div>
			</div>
			<div className={styles.row} style={{ alignItems: "flex-start" }}>
				<div className={styles.text}>
					<h2>{shortenTitle(productName, 50)}</h2>
				</div>
				<div className={styles.chevron}>
					<Image src="/svgs/chevron-yellow.svg" alt="" fill sizes="100vw" />
				</div>
			</div>
			<div className={styles.pricing_container}>
				{forRent && (
					<div className={styles.pricing}>
						<p>
							{offer.forRent?.currency}
							{formatNumber(offer.forRent?.day1Offer || 0)}
							<span>/Day</span>
						</p>
					</div>
				)}
				{forSale && (
					<div className={styles.pricing}>
						<p>
							{offer.forSell?.currency}
							{formatNumber(offer.forSell?.pricing || 0)}
						</p>
					</div>
				)}
			</div>
			<div className={styles.row}>
				<div className={styles.small_row}>
					{user?.avatar && (
						<div className={styles.avatar}>
							<Image
								src={user.avatar}
								alt={user.userName || ""}
								fill
								sizes="100vw"
							/>
						</div>
					)}
					<div className={styles.text} style={{ marginBottom: 0 }}>
						<p>{user?.name || user?.userName}</p>
					</div>
				</div>
				<div className={styles.small_row}>
					<div className={styles.verified}>
						<Image
							src={`/svgs/icon-${
								averageRating ? "filled-star" : "star"
							}.svg`}
							alt=""
							fill
							sizes="100vw"
						/>
					</div>
					<div className={styles.text} style={{ marginBottom: 0 }}>
						<span>({totalReviews || 0} reviews)</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Listing;
