"use client";

import React, { useState } from "react";
import styles from "./BuyRentDetailsBody.module.scss";
import { Button, DetailContainer, InputField, LoadingSpinner, Logo } from "@/shared";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/configureStore";
import { mockListing, updateNewListing } from "@/store/slices/addListingSlice";
import { useRouter } from "next/navigation";
import { ImageSlider } from "@/components/listing";
import { formatNum } from "@/utils";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";

interface Props {
	detailsType: string;
}

const images = [
	"https://plus.unsplash.com/premium_photo-1721133227473-55856ce60871?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtZXJhJTIwZ2VhcnN8ZW58MHx8MHx8fDA%3D",
	"https://images.unsplash.com/photo-1593935308260-d47509d56370?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtZXJhJTIwZ2VhcnN8ZW58MHx8MHx8fDA%3D",
	"https://images.unsplash.com/photo-1627987992810-7b6ddae33a93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbWVyYSUyMGdlYXJzfGVufDB8fDB8fHww",
	"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbWVyYSUyMGdlYXJzfGVufDB8fDB8fHww"
];

const BuyRentDetailsBody = ({ detailsType }: Props) => {
	const newListing = mockListing;
	const fieldValues = Object.entries(newListing?.fieldValues);

	return (
		<div className={styles.section}>
			<div className={styles.body}>
				<div className={styles.details}>
					<div className={styles.container}>
						<ImageSlider images={images as unknown as string[]} />
						<div className={styles.block}>
							<div className={styles.text}>
								<h2>{newListing?.productName}</h2>
							</div>
							<DetailContainer
								title="Category"
								value={newListing?.category?.name}
							/>
							<DetailContainer
								title="Sub category"
								value={newListing?.subCategory?.name}
							/>
							{fieldValues?.map(([key, value]) => {
								return typeof value === "string" ? (
									<DetailContainer
										title={key}
										value={value}
										key={key}
									/>
								) : null;
							})}
							<DetailContainer
								title="Description"
								description={newListing.description}
							/>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								{fieldValues?.map(([key, value]) => {
									return typeof value === "object" ? (
										<div key={key}>
											<p>{key}</p>
											<div className={styles.row}>
												{(value as unknown as string[])?.map(
													(val: string, index: number) => (
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
													)
												)}
											</div>
										</div>
									) : null;
								})}
							</div>

							{detailsType === "gear-sale" && (
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
										{newListing.offer?.forSell?.acceptOffers && (
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
										)}
										{newListing.offer?.forSell?.shipping
											?.shippingOffer && (
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
										)}
										{newListing.offer?.forSell?.shipping
											?.shippingCosts && (
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
										)}
										{newListing.offer?.forSell?.shipping
											?.offerLocalPickup && (
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
										)}
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
										value={formatNum(
											newListing?.offer?.forSell?.pricing ?? 0
										)}
										prefix="₦"
									/>
									<div className={styles.divider}></div>
								</>
							)}
							{detailsType === "rent" && (
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
										<DetailContainer
											title="Daily price(including VAT)"
											value={formatNum(
												+newListing.offer?.forRent?.day1Offer
											)}
											prefix="₦"
										/>
										{newListing.offer?.forRent?.day3Offer && (
											<DetailContainer
												title="3 days offer(including VAT)"
												value={formatNum(
													+newListing.offer?.forRent.day3Offer
												)}
												prefix="₦"
											/>
										)}
										{newListing.offer?.forRent?.day7Offer && (
											<DetailContainer
												title="7 days offer(including VAT)"
												value={formatNum(
													+newListing.offer?.forRent.day7Offer
												)}
												prefix="₦"
											/>
										)}
										{newListing.offer?.forRent?.day30Offer && (
											<DetailContainer
												title="30 days offer(including VAT)"
												value={formatNum(
													+newListing.offer?.forRent.day30Offer
												)}
												prefix="₦"
											/>
										)}
									</div>
									<DetailContainer
										title="Total replacement amount (Including VAT):"
										value={formatNum(
											newListing.offer?.forRent
												?.totalReplacementValue
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
						<div className={styles.blockchain_label_container}>
							<p className={styles.view_explorer_title}>Transaction ID</p>
							<p className={styles.view_explorer}>View explorer</p>
						</div>
						<div className={styles.blockchain_number_container}>
							<p className={styles.blockchain_number}>
								0x3a79d68b913a5f4e5e29e24d6c5f2ff64d6eec7a39edffca23494c7b1b6e77d5
							</p>
							<p className={styles.blockchain_copy_icon}>
								<Image
									src="/svgs/copy.svg"
									alt="copy-icon"
									width={10}
									height={10}
								/>
							</p>
						</div>
						<div className={styles.blockchain_token_container}>
							<p className={styles.token_id_title}>Token ID</p>
							<p className={styles.token_id}>40</p>
						</div>
					</div>
					<div></div>
				</div>
			</div>
		</div>
	);
};

export default BuyRentDetailsBody;
