"use client";
import React, { useState } from "react";
import styles from "./DetailsSummary.module.scss";
import { CopyIcon } from "@/shared/svgs/dashboard";
import { PersonalDetails, ReceiptDetails, WarningContainer } from "./components";
import { iTransactionDetails } from "@/interfaces";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import {
	copyText,
	formatNum,
	getDaysDifference,
	getLastRentalDate,
	shortenTitle
} from "@/utils";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
import Link from "next/link";
const DetailsSummary = ({ item }: { item: iTransactionDetails }) => {
	const {
		isBuyer,
		listing,
		transactionType,
		id,
		buyer,
		seller,
		rentalBreakdown,
		itemType,
		stages
	} = item;
	const offer = listing
		? isListing(listing, itemType as string)
			? listing.offer
			: null
		: null;
	const forSale = !!offer?.forSell;
	const amount = isListing(item.listing, itemType as string)
		? item.listing.listingType === "rent"
			? item.rentalBreakdown.reduce(
					(total, period) => total + period.price * period.quantity,
					0
			  )
			: offer?.forSell?.pricing
		: item.listing.price;
	const user = isBuyer ? seller : buyer;
	const duration =
		transactionType === TransactionType.Rental
			? item.rentalBreakdown.reduce((total, period) => total + period.quantity, 0)
			: 0;
	const unitPrice = listing
		? forSale
			? offer.forSell?.pricing
			: offer?.forRent?.rates.length
			? offer?.forRent?.rates[0].price
			: 0
		: 0;

	const rentStage = stages.find(item => item.stage === "payment_received");
	const recievedStage = stages.find(item => item.stage === "rental_ongoing");
	return (
		<div className={styles.container}>
			<div className={styles.container__summary_container}>
				<h3 className={styles.title}>Summary</h3>
				<div className={styles.summary_item}>
					<h4>{isBuyer ? "Paid" : "Received"}</h4>
					<p>₦{formatNum(amount, true, 2)}</p>
				</div>
				{/* <div className={styles.summary_item}>
					<h4>Funded( Escrow Protection)</h4>
					<p>$400.0</p>
				</div> */}
				{duration > 0 ? (
					<div className={styles.summary_item}>
						<h4>
							Durations({offer?.forRent?.rates[0].duration}
							{item.rentalBreakdown.length > 1 ? "s" : ""})
						</h4>
						<p>
							{duration} {offer?.forRent?.rates[0].duration}
							{item.rentalBreakdown.length > 1 ? "s" : ""}
						</p>
					</div>
				) : null}
				<div className={styles.summary_item}>
					<h4>Price</h4>
					<p>₦{formatNum(unitPrice)}</p>
				</div>
				<h3 className={styles.title}>Blockchain transaction Summary</h3>
				{listing?.transactionId && (
					<div className={styles.summary_item}>
						<h4>Listing Creation Transaction</h4>
						<span
							style={{ display: "flex", alignItems: "center", gap: "10px" }}
						>
							<Link
								href={`https://stellar.expert/explorer/public/tx/${listing.transactionId}`}
								target="_blank"
								className={styles.link}
							>
								{shortenTitle(listing.transactionId as string)}
							</Link>
							<span
								className={styles.icon}
								onClick={() => copyText(listing.transactionId ?? "")}
							>
								<CopyIcon />
							</span>
						</span>
					</div>
				)}
				{rentStage && (
					<div className={styles.summary_item}>
						<h4>{forSale ? "Purchase" : "Rent"} Transaction</h4>
						<span
							style={{ display: "flex", alignItems: "center", gap: "10px" }}
						>
							<Link
								href={`https://stellar.expert/explorer/public/tx/${rentStage?.transactionHash}`}
								target="_blank"
								className={styles.link}
							>
								{shortenTitle(rentStage?.transactionHash as string)}
							</Link>
							<span
								className={styles.icon}
								onClick={() => copyText(rentStage?.transactionHash ?? "")}
							>
								<CopyIcon />
							</span>
						</span>
					</div>
				)}
				{recievedStage && (
					<div className={styles.summary_item}>
						<h4>Asset received Transaction</h4>
						<span
							style={{ display: "flex", alignItems: "center", gap: "10px" }}
						>
							<Link
								href={`https://stellar.expert/explorer/public/tx/${recievedStage?.transactionHash}`}
								target="_blank"
								className={styles.link}
							>
								{shortenTitle(recievedStage?.transactionHash as string)}
							</Link>
							<span
								className={styles.icon}
								onClick={() =>
									copyText(recievedStage?.transactionHash ?? "")
								}
							>
								<CopyIcon />
							</span>
						</span>
					</div>
				)}
			</div>
			<PersonalDetails
				name={user.name || user.userName}
				// subText="Lagos, Nigeria"
				profilePhoto={user.avatar || "/svgs/user.svg"}
				profileLink={`/users/${user._id}`}
				forSale={forSale}
				isBuyer={isBuyer}
			/>
			<ReceiptDetails />
			<WarningContainer />
		</div>
	);
};

export default DetailsSummary;
