"use client";

import React from "react";
import styles from "./ListingView.module.scss";
import {
	ImageSlider,
	PriceContainer,
	SpecCard,
	DescriptionCard,
	Map,
	ProfileCard
} from "@/components/listing";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { useParams } from "next/navigation";
import { useSingleListing } from "@/hooks/useListings";
import { getIdFromSlug } from "@/utils";
import { PageLoader } from "@/shared/loaders";
import { Listing } from "@/shared";

const ListingView = () => {
	const { currentListing } = useAppSelector(s => s.listings);
	const dispatch = useAppDispatch();
	const { productSlug } = useParams();
	const productId = getIdFromSlug(productSlug.toString());
	const { refetch, isFetching } = useSingleListing(productId);

	if (!currentListing && isFetching) return <PageLoader />;
	if (!currentListing) return null;

	console.log(currentListing);

	const { offer, listingPhotos, ownerOtherListings } = currentListing;
	const forSale = !!offer?.forSell;
	const forRent = !!offer?.forRent;

	return (
		<section className={styles.section}>
			<div className={styles.row}>
				<div className={styles.large_block}>
					<ImageSlider images={listingPhotos} />
					<div className={styles.block_mob}>
						<PriceContainer listing={currentListing} />
					</div>
					<SpecCard listing={currentListing} />
					<DescriptionCard description={currentListing.description} />
					{currentListing.location && (
						<Map location={currentListing.location} />
					)}
					<ProfileCard listing={currentListing} />
				</div>
				<div className={styles.block_desk}>
					<PriceContainer listing={currentListing} />
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
