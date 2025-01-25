import React from "react";
import styles from "./GearDetailsSection.module.scss";
import { Button, DetailContainer } from "@/shared";
import { mockListing } from "@/store/slices/addListingSlice";
import { ImageSlider } from "@/components/listing";
import Image from "next/image";
import { formatNum, getDaysDifference } from "@/utils";
import { useGetSingleTransactions } from "@/app/api/hooks/transactions";
import { PageLoader } from "@/shared/loaders";
import { useAppSelector } from "@/store/configureStore";

interface Props {
	transactionId: string;
}

const GearDetailsSection = ({ transactionId }: Props) => {
	const { transaction } = useAppSelector(s => s.transaction);
	const newListing = mockListing;
	const listingData = transaction?.listing;
	const fieldValues = Object.entries(listingData!.fieldValues);

	const endDate = transaction?.rentalPeriod?.end as string;

	const startDate = transaction?.rentalPeriod?.start as string;

	const rentalPeriod = getDaysDifference(startDate, endDate);

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ImageSlider
					images={listingData?.listingPhotos}
					type={listingData?.listingType}
				/>
				<div className={styles.block}>
					<div className={styles.text}>
						{/* <h2>{newListing?.productName}</h2> */}
						<h2>{listingData?.productName}</h2>
					</div>
					<DetailContainer title="Category" value={newListing.category?.name} />
					{fieldValues?.map(([key, value]) => {
						return typeof value === "string" ? (
							<DetailContainer title={key} value={value} key={key} />
						) : null;
					})}
					<DetailContainer
						title="Description"
						description={listingData?.description}
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

					{listingData?.offer?.forSell && (
						<>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<h6
									className={styles.perks}
									style={{ marginBottom: "1rem" }}
								>
									{" "}
									FOR SALE PERKS
								</h6>
								{listingData?.offer?.forSell?.acceptOffers &&
									listingData?.offer?.forSell?.acceptOffers && (
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
								{listingData?.offer?.forSell?.shipping?.shippingOffer && (
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
								{listingData?.offer?.forSell?.shipping?.shippingCosts && (
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
								{listingData?.offer?.forSell?.shipping
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
									+(listingData?.offer?.forSell?.pricing || 0)
								)}
								prefix="₦"
							/>
							<div className={styles.divider}></div>
						</>
					)}
					{listingData?.offer?.forRent && (
						<>
							<div className={styles.text} style={{ marginTop: "3.2rem" }}>
								<h6
									className={styles.perks}
									style={{ marginBottom: "1rem" }}
								>
									{" "}
									Rental Pricing
								</h6>
								{listingData?.offer?.forRent?.rates.map(rate => (
									<DetailContainer
										title={`${rate.quantity} ${rate.duration}${
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
									+(
										listingData?.offer?.forRent
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
			{transaction?.transactionType !== "Purchase" ? (
				<div className={styles.rental_detail}>
					<div className={styles.summary_container}>
						<h3 className={styles.title}>Rental details</h3>
						<div className={styles.summary_item}>
							<h4>
								Duration({rentalPeriod} day
								{rentalPeriod > 1 ? "s" : ""})
							</h4>
							<p>
								{startDate.split("T")[0]} - {endDate.split("T")[0]}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Rental price(per day)</h4>
							<p>
								₦
								{formatNum(
									listingData?.offer.forRent?.rates.length
										? listingData?.offer.forRent?.rates[0].price
										: 0
								)}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Multiple days discount</h4>
							<p>
								₦
								{formatNum(
									listingData?.offer.forRent?.rates.length
										? listingData?.offer.forRent?.rates[0].price
										: 0
								)}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Rental price( 10 days)</h4>
							<p>₦40.00</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Gearup fee</h4>
							<p>₦40.00</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Total amount:</h4>
							<p>₦40.00</p>
						</div>
					</div>
				</div>
			) : (
				<div className={styles.rental_detail}>
					<div className={styles.summary_container}>
						<h3 className={styles.title}>SHIPMENT INFORMATION</h3>
						<div className={styles.summary_item}>
							<h4>Username:</h4>
							<p>{transaction.seller.userName}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Shipment type:</h4>
							<p>{transaction.metadata?.shippingType}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Country</h4>
							<p>{transaction.metadata?.country}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>City</h4>
							<p>{transaction.metadata?.city}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Shipping address</h4>
							<p>{transaction.metadata?.address}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Mobile number</h4>
							<p>{transaction.metadata?.phoneNumber}</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GearDetailsSection;
