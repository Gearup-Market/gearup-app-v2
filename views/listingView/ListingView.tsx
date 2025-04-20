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
import { copyText, getIdFromSlug } from "@/utils";
import { BackNavigation, Listing } from "@/shared";
import BuyPriceContainer from "@/components/listing/BuyPriceContainer/BuyPriceContainer";
import { Box, CircularProgress } from "@mui/material";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";
import Image from "next/image";
import Link from "next/link";
import { HeaderSubText } from "@/components/UserDashboard";

const typeView = ["rent", "buy"];

const ListingView = () => {
	const { currentListing } = useAppSelector(s => s.listings);
	const { productSlug } = useParams();
	const productId = getIdFromSlug(productSlug.toString());
	const { isFetching } = useSingleListing(productId);
	const { data: allPricings } = useGetAllPricings();

	const [activeType, setActiveType] = useState("");

	useEffect(() => {
		if (currentListing) {
			// If the listingType is "rent" or "buy", set it as the active type
			if (
				currentListing.listingType === "rent" ||
				currentListing.listingType === "buy"
			) {
				setActiveType(currentListing?.listingType);
			}
			// If listingType is "both", set the initial activeType to "rent" or any default
			else if (currentListing.listingType === "sell") {
				setActiveType("buy");
			} else if (currentListing.listingType === "both") {
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
				<CircularProgress style={{ color: "#F76039" }} />
			</Box>
		);
	}
	if (!currentListing) return null;

	const { offer, listingPhotos, ownerOtherListings, listingType } = currentListing;
	const forSale = !!offer?.forSell;
	// eslint-disable-next-line react-hooks/rules-of-hooks
	// const type = listingType === ListingType.Buy

	return (
		<section className={styles.section}>
			<div className={styles.row}>
				<BackNavigation />
			</div>
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
					<ImageSlider
						images={listingPhotos}
						type={activeType}
						multiOwnership={currentListing.allowsMultiOwnership}
					/>
					<div className={styles.block_mob}>
						{activeType === "rent" ? (
							<PriceContainer
								allPricings={allPricings}
								listing={currentListing}
							/>
						) : (
							<BuyPriceContainer listing={currentListing} />
						)}
					</div>
					<SpecCard listing={currentListing} />
					<DescriptionCard description={currentListing.description} />
					<div className={styles.blockchain_info}>
						<HeaderSubText title="Blockchain information" />
						<div className={styles.blockchain_info_container}>
							{currentListing?.transactionId ? (
								<>
									<div className={styles.blockchain_label_container}>
										<p className={styles.view_explorer_title}>
											Transaction ID
										</p>
										<Link
											href={`https://stellar.expert/explorer/public/tx/${currentListing.transactionId}`}
											target="_blank"
											className={styles.view_explorer}
										>
											View explorer
										</Link>
									</div>
									<div className={styles.blockchain_number_container}>
										<p className={styles.blockchain_number}>
											{currentListing.transactionId}
										</p>
										<p className={styles.blockchain_copy_icon}>
											<Image
												src="/svgs/copy.svg"
												alt="copy-icon"
												width={10}
												height={10}
												onClick={() =>
													copyText(
														currentListing?.transactionId ??
															""
													)
												}
											/>
										</p>
									</div>
								</>
							) : null}
							{currentListing?.nftTokenId ? (
								<div className={styles.blockchain_token_container}>
									<p className={styles.token_id_title}>Token ID</p>
									<p className={styles.token_id}>
										{currentListing?.nftTokenId}
									</p>
								</div>
							) : null}
						</div>
					</div>
					{currentListing.location && (
						<Map location={currentListing.location} />
					)}
					<ProfileCard listing={currentListing} />
				</div>
				<div className={styles.block_desk}>
					{activeType === "rent" ? (
						<PriceContainer
							allPricings={allPricings}
							listing={currentListing}
						/>
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
