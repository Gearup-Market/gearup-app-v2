import React from "react";
import styles from "./GearDetailsSection.module.scss";
import { Button, DetailContainer } from "@/shared";
import { mockListing } from "@/store/slices/addListingSlice";
import { ImageSlider } from "@/components/listing";
import Image from "next/image";
import { formatNum } from "@/utils";

const GearDetailsSection = () => {
	const newListing = mockListing;
	const fieldValues = Object.entries(newListing?.fieldValues);

	const images = [
		"https://plus.unsplash.com/premium_photo-1721133227473-55856ce60871?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2FtZXJhJTIwZ2VhcnN8ZW58MHx8MHx8fDA%3D",
		"https://images.unsplash.com/photo-1593935308260-d47509d56370?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FtZXJhJTIwZ2VhcnN8ZW58MHx8MHx8fDA%3D",
		"https://images.unsplash.com/photo-1627987992810-7b6ddae33a93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhbWVyYSUyMGdlYXJzfGVufDB8fDB8fHww",
		"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhbWVyYSUyMGdlYXJzfGVufDB8fDB8fHww"
	];

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ImageSlider
					images={images as unknown as string[]}
					type={newListing.listingType}
				/>
				<div className={styles.block}>
					<div className={styles.text}>
						<h2>{newListing?.productName}</h2>
						<h2>{newListing?.productName}</h2>
					</div>
					<DetailContainer title="Category" value={newListing.category?.name} />
					{fieldValues?.map(([key, value]) => {
						return typeof value === "string" ? (
							<DetailContainer title={key} value={value} key={key} />
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

					{newListing.offer?.forSell && (
						<>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<h6
									className={styles.perks}
									style={{ marginBottom: "1rem" }}
								>
									{" "}
									FOR SALE PERKS
								</h6>
								{newListing.offer?.forSell?.acceptOffers &&
									newListing.offer?.forSell?.acceptOffers && (
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
								{newListing.offer?.forSell?.shipping?.shippingOffer && (
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
								{newListing.offer?.forSell?.shipping?.shippingCosts && (
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
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<h6 style={{ marginBottom: "1rem" }}>Sale PRICING</h6>
							</div>
							<DetailContainer
								title="Amount(including VAT)"
								value={formatNum(
									+(newListing.offer?.forSell?.pricing || 0)
								)}
								prefix="₦"
							/>
							<div className={styles.divider}></div>
						</>
					)}
					{newListing.offer?.forRent && (
						<>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
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
									+(
										newListing.offer?.forRent
											?.totalReplacementValue || 0
									)
								)}
								prefix="₦"
							/>
						</>
					)}
					<div className={styles.divider}></div>
				</div>
			</div>
			<div className={styles.rental_detail}>
				<div className={styles.summary_container}>
					<h3 className={styles.title}>Rental details</h3>
					<div className={styles.summary_item}>
						<h4>Duration(10days)</h4>
						<p>15 Dec 2023 - 19 Dec 2023</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Rental price(per day)</h4>
						<p>$40.00</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Multiple days discount</h4>
						<p>-$40.00</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Rental price( 10 days)</h4>
						<p>$40.00</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Gearup fee</h4>
						<p>$40.00</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Total amount:</h4>
						<p>$40.00</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GearDetailsSection;
