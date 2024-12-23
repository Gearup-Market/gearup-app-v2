"use client";

import React, { useEffect, useState } from "react";
import styles from "./ListingView.module.scss";
import {
	ImageSlider,
	PriceContainer,
	SpecCard,
	DescriptionCard,
	Map,
	ProfileCard
} from "@/components/listing";
import { useAppSelector } from "@/store/configureStore";
import { useParams } from "next/navigation";
import { useSingleListing } from "@/hooks/useListings";
import { getIdFromSlug } from "@/utils";
import { BackNavigation, Listing } from "@/shared";
import BuyPriceContainer from "@/components/listing/BuyPriceContainer/BuyPriceContainer";
import { Box, CircularProgress } from "@mui/material";

const typeView = ["rent", "buy"];

const ListingView = () => {
	const { currentListing } = useAppSelector(s => s.listings);
	const { productSlug } = useParams();
	const productId = getIdFromSlug(productSlug.toString());
	const { isFetching } = useSingleListing(productId);
	
	const [activeType, setActiveType] = useState("");

	useEffect(() => {
		if (currentListing) {
			// If the listingType is "rent" or "buy", set it as the active type
			if (currentListing.listingType === "rent" || currentListing.listingType === "buy") {
				setActiveType(currentListing?.listingType);
			}
			// If listingType is "both", set the initial activeType to "rent" or any default
			else if (currentListing.listingType === "both") {
				setActiveType("rent");
			}
		}
	}, [currentListing]);

	if (isFetching) {
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
        )
	}
	if (!currentListing) return null;
	
	const { offer, listingPhotos, ownerOtherListings, listingType } = currentListing;
	const forSale = !!offer?.forSell;
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// const type = listingType === ListingType.Buy

	return (
		<section className={styles.section}>
			<BackNavigation />
			<div className={styles.row}>
				<div className={styles.large_block}>
					{listingType === "both" && (
						<ul className={styles.type_container}>
							{typeView.map(filter => (
								<li
									data-active={filter === activeType}
									onClick={() => {
										setActiveType(filter);
									}}
									key={`${filter}`}
									className={styles.type}
								>
									<p>{filter}</p>
								</li>
							))}
						</ul>
					)}
					<ImageSlider images={listingPhotos} type={activeType} />
					<div className={styles.block_mob}>
						{activeType === "rent" ? (
							<PriceContainer listing={currentListing} />
						) : (
							<BuyPriceContainer listing={currentListing} />
						)}
					</div>
					<SpecCard listing={currentListing} />
					<DescriptionCard description={currentListing.description} />
					{currentListing.location && (
						<Map location={currentListing.location} />
					)}
					<ProfileCard listing={currentListing} />
				</div>
				<div className={styles.block_desk}>
					{activeType === "rent" ? (
						<PriceContainer listing={currentListing} />
					) : (
						<BuyPriceContainer listing={currentListing} />
					)}
				</div>
			</div>
			<div className={styles.divider}></div>

			{ownerOtherListings && ownerOtherListings.length > 0 && (
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
			)}
		</section>
	);
};

export default ListingView;
