import React from "react";
import styles from "./GearDetailsSection.module.scss";
import { Button, DetailContainer } from "@/shared";
import { ImageSlider } from "@/components/listing";
import Image from "next/image";
import { formatDate, formatNum, getDaysDifference, getLastRentalDate } from "@/utils";
import { useGetSingleTransactions } from "@/app/api/hooks/transactions";
import { PageLoader } from "@/shared/loaders";
import { useAppSelector } from "@/store/configureStore";
import { useGetAllPricings } from "@/app/api/hooks/Admin/pricing";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";

interface Props {
	transactionId: string;
}

const GearDetailsSection = ({ transactionId }: Props) => {
	const { transaction } = useAppSelector(s => s.transaction);
	const { data: allPricings } = useGetAllPricings();
	const listingData = transaction?.listing;
	const fieldValues = Object.entries(
		isListing(listingData, transaction?.itemType as string)
			? listingData!.fieldValues
			: {}
	);

	const rentalPeriod = transaction!.rentalBreakdown.reduce(
		(total, period) => total + period.quantity,
		0
	);

	const pricing = +(transaction?.transactionType === "Rental"
		? transaction!.rentalBreakdown.reduce(
				(total, period) => total + period.quantity * period.price,
				0
		  )
		: isListing(listingData, transaction?.itemType as string)
		? listingData?.offer?.forSell?.pricing || 0
		: 0);

	const serviceFeePercentage = () => {
		if (transaction?.userRole === "seller") return allPricings?.gearSellerFee;
		if (transaction?.userRole === "buyer") return allPricings?.gearBuyerFee;
		if (transaction?.userRole === "renter") {
			if (
				isListing(listingData, transaction?.itemType as string) &&
				!listingData?.offer.forRent
			)
				return 0;
			return isListing(listingData, transaction?.itemType as string) &&
				listingData?.offer.forRent?.rates[0].duration === "hour"
				? allPricings?.studioRenterFee
				: allPricings?.gearRenterFee;
		}
		if (transaction?.userRole === "lender") {
			if (
				isListing(listingData, transaction?.itemType as string) &&
				!listingData?.offer.forRent
			)
				return 0;
			return isListing(listingData, transaction?.itemType as string) &&
				listingData?.offer.forRent?.rates[0].duration === "hour"
				? allPricings?.studioLeaseFee
				: allPricings?.gearLeaseFee;
		}
	};

	const vat = (allPricings?.valueAddedTax! / 100) * pricing || 0;
	const serviceFee = (serviceFeePercentage()! / 100) * pricing || 0;
	const total = (transaction?.amount || 0) + serviceFee + vat;

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<ImageSlider
					images={
						isListing(listingData, transaction?.itemType as string)
							? listingData?.listingPhotos || []
							: []
					}
					type={
						isListing(listingData, transaction?.itemType as string)
							? listingData?.listingType
							: ""
					}
				/>
				<div className={styles.block}>
					<div className={styles.text}>
						{/* <h2>{newListing?.productName}</h2> */}
						<h2>
							{isListing(listingData, transaction?.itemType as string)
								? listingData?.productName
								: ""}
						</h2>
					</div>
					<DetailContainer
						title="Category"
						value={
							isListing(listingData, transaction?.itemType as string)
								? listingData?.category?.name
								: ""
						}
					/>
					{fieldValues?.map(([key, value]) => {
						return typeof value === "string" ? (
							<DetailContainer title={key} value={value} key={key} />
						) : null;
					})}
					<DetailContainer
						title="Description"
						description={
							isListing(listingData, transaction?.itemType as string)
								? listingData?.description
								: ""
						}
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

					{isListing(listingData, transaction?.itemType as string) &&
						listingData?.offer?.forSell && (
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
									{isListing(
										listingData,
										transaction?.itemType as string
									) &&
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
									{isListing(
										listingData,
										transaction?.itemType as string
									) &&
										listingData?.offer?.forSell?.shipping
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
									{isListing(
										listingData,
										transaction?.itemType as string
									) &&
										listingData?.offer?.forSell?.shipping
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
									{isListing(
										listingData,
										transaction?.itemType as string
									) &&
										listingData?.offer?.forSell?.shipping
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
									<h6 style={{ marginBottom: "1rem" }}>Sale PRICING</h6>
								</div>
								<DetailContainer
									title="Amount (including VAT and Service Fee)"
									value={formatNum(pricing + vat + serviceFee)}
									prefix="₦"
								/>
								<div className={styles.divider}></div>
							</>
						)}
					{isListing(listingData, transaction?.itemType as string) &&
						listingData?.offer?.forRent && (
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
									{isListing(
										listingData,
										transaction?.itemType as string
									) &&
										listingData?.offer?.forRent?.rates.map(rate => (
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
									title="Total replacement amount (Including VAT and Service Fee):"
									value={formatNum(
										+(
											(isListing(
												listingData,
												transaction?.itemType as string
											) &&
												listingData?.offer?.forRent
													?.totalReplacementValue) ||
											0
										) +
											serviceFee +
											vat
									)}
									prefix="₦"
								/>
							</>
						)}
					<div className={styles.divider}></div>
				</div>
			</div>
			{transaction?.transactionType === "Rental" ? (
				<div className={styles.rental_detail}>
					<div className={styles.summary_container}>
						<h3 className={styles.title}>Rental details</h3>
						<div className={styles.summary_item}>
							<h4>
								Duration(
								{rentalPeriod} {transaction!.rentalBreakdown[0].duration}
								s)
							</h4>
							<p style={{ textAlign: "right" }}>
								{formatDate(transaction!.rentalBreakdown[0].date)} -{" "}
								{formatDate(
									getLastRentalDate(transaction!.rentalBreakdown)
								)}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>
								Rental price(per{" "}
								{transaction!.rentalBreakdown[0].duration})
							</h4>
							<p>
								₦
								{formatNum(
									isListing(
										listingData,
										transaction?.itemType as string
									) && listingData?.offer?.forRent?.rates.length
										? listingData?.offer?.forRent?.rates[0].price
										: 0
								)}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Multiple days discount</h4>
							<p>
								₦
								{formatNum(
									isListing(
										listingData,
										transaction?.itemType as string
									) && listingData?.offer?.forRent?.rates.length
										? listingData?.offer?.forRent?.rates[0].price
										: 0
								)}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>
								Rental price({transaction.rentalBreakdown.length} days{" "}
								{transaction.rentalBreakdown[0].duration === "hour"
									? `for ${transaction.rentalBreakdown.reduce(
											(total, period) => total + period.quantity,
											0
									  )} hours`
									: null}
								)
							</h4>
							<p>₦{formatNum(transaction.amount)}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Gearup fee</h4>
							<p>₦{formatNum(serviceFee)}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>VAT</h4>
							<p>₦{formatNum(vat)}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Total amount:</h4>
							<p>₦{formatNum(total)}</p>
						</div>
					</div>
				</div>
			) : transaction?.itemType === "Listing" ? (
				<div className={styles.rental_detail}>
					<div className={styles.summary_container}>
						<h3 className={styles.title}>SHIPMENT INFORMATION</h3>
						<div className={styles.summary_item}>
							<h4>Username:</h4>
							<p>{transaction?.seller.userName}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Shipment type:</h4>
							<p>{transaction?.metadata?.shippingType}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Country</h4>
							<p>{transaction?.metadata?.country}</p>
						</div>
						<div className={styles.summary_item}>
							<h4>City</h4>
							<p>
								{isListing(
									transaction?.listing,
									transaction?.itemType as string
								) && transaction?.listing?.location?.city}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Shipping address</h4>
							<p>
								{isListing(
									transaction?.listing,
									transaction?.itemType as string
								) && transaction?.listing?.location?.address}
							</p>
						</div>
						<div className={styles.summary_item}>
							<h4>Mobile number</h4>
							<p>{transaction?.metadata?.phoneNumber}</p>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default GearDetailsSection;
