"use client";
import React, { useState } from "react";
import styles from "./DetailsSummary.module.scss";
import { CopyIcon } from "@/shared/svgs/dashboard";
import { PersonalDetails, ReceiptDetails, WarningContainer } from "./components";
import { iTransactionDetails } from "@/interfaces";
import { TransactionType } from "@/app/api/hooks/transactions/types";
import { formatNum, getDaysDifference } from "@/utils";

const DetailsSummary = ({ item }: { item: iTransactionDetails }) => {
	const { isBuyer, amount, listing, transactionType, id, buyer, seller, rentalPeriod } =
		item;
	const { offer } = listing;
	const forSale = !!offer?.forSell;
	const user = isBuyer ? seller : buyer;
	const duration =
		transactionType === TransactionType.Rental
			? getDaysDifference(rentalPeriod?.start, rentalPeriod?.end)
			: 0;
	const unitPrice = forSale ? offer.forSell?.pricing : offer.forRent?.day1Offer;
	return (
		<div className={styles.container}>
			<div className={styles.container__summary_container}>
				<h3 className={styles.title}>Summary</h3>
				<div className={styles.summary_item}>
					<h4>{isBuyer ? "Paid" : "Received"}</h4>
					<p>₦{formatNum(amount)}</p>
				</div>
				{/* <div className={styles.summary_item}>
					<h4>Funded( Escrow Protection)</h4>
					<p>$400.0</p>
				</div> */}
				{duration > 0 ? (
					<div className={styles.summary_item}>
						<h4>Durations(Days)</h4>
						<p>{duration} days</p>
					</div>
				) : null}
				<div className={styles.summary_item}>
					<h4>Price</h4>
					<p>₦{formatNum(unitPrice)}</p>
				</div>
				<div className={styles.summary_item}>
					<h4>Transaction ID</h4>
					<span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
						<p>{id}</p>
						<span className={styles.icon}>
							<CopyIcon />
						</span>
					</span>
				</div>
			</div>
			<PersonalDetails
				name={user.name || user.userName}
				subText="Lagos, Nigeria"
				profileLink="/user/settings/profile"
			/>
			<ReceiptDetails />
			<WarningContainer />
		</div>
	);
};

export default DetailsSummary;
