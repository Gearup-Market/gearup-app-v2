"use client";

import React, { useMemo } from "react";
import styles from "./BuyRentListing.module.scss";
import { Button, DetailContainer } from "@/shared";
import Image from "next/image";
import { ImageSlider } from "@/components/listing";
import { copyText, formatNum } from "@/utils";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { Listing } from "@/store/slices/listingsSlice";
import { ListingType } from "@/interfaces";
import Link from "next/link";
import { getExplorerUrl } from "@/utils/stellar";

interface Props {
	listing: Listing;
}

const BuyRentDetailsBody = ({ listing }: Props) => {
	const {
		offer,
		listingPhotos,
		listingType,
		fieldValues,
		description,
		productName,
		category,
		subCategory
	} = listing;

	const [mainGroup, subGroup] = useMemo(() => {
		if (!fieldValues) return [[], []];
		const mainGroup: { key: string; value: string }[] = [];
		const subGroup: { key: string; value: string[] }[] = [];

		Object.entries(fieldValues).forEach(([key, value]) => {
			if (Array.isArray(value)) {
				subGroup.push({ key, value });
			} else {
				mainGroup.push({ key, value });
			}
		});
		return [mainGroup, subGroup];
	}, [fieldValues]);

	return (
		<div className={styles.section}>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.container}>
						<ImageSlider images={listingPhotos} type={listingType} />
						<div className={styles.block}>
							<div className={styles.text}>
								<h2>{productName}</h2>
							</div>
							<DetailContainer title="Category" value={category?.name} />
							<DetailContainer
								title="Sub category"
								value={subCategory?.name}
							/>
							{mainGroup?.map(({ key, value }) => (
								<DetailContainer title={key} value={value} key={key} />
							))}
							<DetailContainer
								title="Description"
								description={description}
							/>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								{subGroup.map(({ key, value }) => (
									<div key={key}>
										<p>{key}</p>
										<div className={styles.row}>
											{value.map((val: string, index: number) => (
												<Button
													key={`${key}-${index}`}
													className={styles.button}
												>
													{val}
													<Image
														src="/svgs/field-values-check.svg"
														alt="checks"
														width={10}
														height={10}
													/>
												</Button>
											))}
										</div>
									</div>
								))}
							</div>

							{(listingType === ListingType.Buy ||
								listingType === ListingType.Both) && (
								<>
									<div
										className={styles.text}
										style={{ marginTop: "3.2rem" }}
									>
										<h6
											className={styles.perks}
											style={{ marginBottom: "1rem" }}
										>
											{" "}
											FOR SALE PERKS
										</h6>
										{offer?.forSell?.acceptOffers ? (
											<p
												className={styles.perks}
												style={{ marginBottom: "0.6rem" }}
											>
												<Image
													className={styles.check}
													src="/svgs/check-icon.svg"
													alt="check"
													height={10}
													width={10}
												/>
												Accepts offers
											</p>
										) : null}
										{offer?.forSell?.shipping?.shippingOffer ? (
											<p
												className={styles.perks}
												style={{ marginBottom: "0.6rem" }}
											>
												<Image
													className={styles.check}
													src="/svgs/check-icon.svg"
													alt="check"
													height={10}
													width={10}
												/>
												Offers shipping
											</p>
										) : null}
										{offer?.forSell?.shipping?.shippingCosts ? (
											<p
												className={styles.perks}
												style={{ marginBottom: "0.6rem" }}
											>
												<Image
													className={styles.check}
													src="/svgs/check-icon.svg"
													alt="check"
													height={10}
													width={10}
												/>
												Cover shipping costs
											</p>
										) : null}
										{offer?.forSell?.shipping?.offerLocalPickup ? (
											<p
												className={styles.perks}
												style={{ marginBottom: "0.6rem" }}
											>
												<Image
													className={styles.check}
													src="/svgs/check-icon.svg"
													alt="check"
													height={10}
													width={10}
												/>
												Offer local pick up
											</p>
										) : null}
									</div>
									<div
										className={styles.text}
										style={{ marginTop: "3.2rem" }}
									>
										<h6 style={{ marginBottom: "1rem" }}>
											Sale PRICING
										</h6>
									</div>
									<DetailContainer
										title="Amount(including VAT)"
										value={formatNum(offer?.forSell?.pricing ?? 0)}
										prefix="₦"
									/>
									<div className={styles.divider}></div>
								</>
							)}
							{(listingType === ListingType.Rent ||
								listingType === ListingType.Both) && (
								<>
									<div
										className={styles.text}
										style={{ marginTop: "3.2rem" }}
									>
										<h6
											className={styles.perks}
											style={{ marginBottom: "1rem" }}
										>
											{" "}
											Rental Pricing
										</h6>
										{offer?.forRent?.rates.map(rate => (
											<DetailContainer
												title={`${rate.quantity} ${
													rate.duration
												}${
													rate.quantity > 1 ? "s" : ""
												} price(including VAT)`}
												value={formatNum(+rate.price)}
												prefix="₦"
												key={rate.quantity}
											/>
										))}
									</div>
									<DetailContainer
										title="Total replacement amount (Including VAT):"
										value={formatNum(
											offer?.forRent?.totalReplacementValue
										)}
										prefix="₦"
									/>
									<div className={styles.divider}></div>
								</>
							)}
						</div>
					</div>

					<HeaderSubText title="Blockchain information" />
					<div className={styles.blockchain_info_container}>
						{listing?.transactionId ? (
							<>
								<div className={styles.blockchain_label_container}>
									<p className={styles.view_explorer_title}>
										Transaction ID
									</p>
									<Link
										href={`https://stellar.expert/explorer/public/tx/${listing.transactionId}`}
										target="_blank"
										className={styles.view_explorer}
									>
										View explorer
									</Link>
								</div>
								<div className={styles.blockchain_number_container}>
									<p className={styles.blockchain_number}>
										{listing.transactionId}
									</p>
									<p className={styles.blockchain_copy_icon}>
										<Image
											src="/svgs/copy.svg"
											alt="copy-icon"
											width={10}
											height={10}
											onClick={() =>
												copyText(listing?.transactionId ?? "")
											}
										/>
									</p>
								</div>
							</>
						) : null}
						{listing?.nftTokenId ? (
							<div className={styles.blockchain_token_container}>
								<p className={styles.token_id_title}>Token ID</p>
								<p className={styles.token_id}>{listing?.nftTokenId}</p>
							</div>
						) : null}
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default BuyRentDetailsBody;
