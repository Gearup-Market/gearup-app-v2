"use client";
import React, { useMemo, useState } from "react";
import styles from "./AwaitingApproval.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import Link from "next/link";
import { Button } from "@/shared";
import { iTransactionDetails, TransactionStage, TransactionStatus } from "@/interfaces";
import { formatNum } from "@/utils";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
interface Props {
	handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
	item: iTransactionDetails;
	thirdPartyVerification?: boolean;
}
const AwaitingApproval = ({ handleNext, item, thirdPartyVerification }: Props) => {
	const { isBuyer, id, amount, transactionStatus, listing, itemType } = item;

	const isCancelled = useMemo(
		() => transactionStatus === TransactionStatus.Cancelled,
		[transactionStatus]
	);
	const isDeclined = useMemo(
		() => transactionStatus === TransactionStatus.Declined,
		[transactionStatus]
	);

	return (
		<div className={styles.container}>
			<HeaderSubText title="Awaiting approval" />
			{!thirdPartyVerification ? (
				<>
					<div className={styles.details_container}>
						<p className={styles.details}>
							You have successfully paid the sum of{" "}
							<span className={styles.bold}>
								₦
								{formatNum(
									isListing(item.listing, itemType as string)
										? item.listing.offer.forSell?.pricing || 0
										: item?.listing.price
								)}
							</span>{" "}
							for the purchase of{" "}
							{listing
								? isListing(listing, itemType as string)
									? listing.productName
									: listing.title
								: "Listing not available"}{" "}
							and the money is in escrow protection .
						</p>
					</div>
					<div className={styles.details_container}>
						<p className={styles.details}>
							Once the seller accepts the transaction, the shipment process
							will be initiated, and your client is expected to deliver the
							gear to you within 48 hours else the money will be refunded to
							you
						</p>
					</div>
					<div className={styles.details_container}>
						<p className={styles.details}>
							If the transaction is not approved by the seller, your money
							will be refunded to you.
						</p>
					</div>
					<div className={styles.details_container}>
						<p className={styles.details}>
							According to our{" "}
							<span className={styles.policy_text}>
								48hours return policy
							</span>
							, you have until 48 hours to initiate a return request if a
							fault(s) is identified with the equipment.d to you.
						</p>
					</div>
				</>
			) : (
				<>
					<div className={styles.details_container}>
						<p className={styles.details}>
							<span className={styles.bold}>
								{listing
									? isListing(listing, itemType as string)
										? listing.user?.name || listing.user?.userName
										: listing.author?.name || listing.author?.userName
									: "Listing not available"}
							</span>{" "}
							has successfully paid the sum of{" "}
							<span className={styles.bold}>₦{formatNum(amount)}</span> for
							the purchase of{" "}
							{listing
								? isListing(listing, itemType as string)
									? listing.productName
									: listing.title
								: "Listing not available"}
							, and the money is in escrow protection, which will be
							released to you once the transaction is completed
						</p>
					</div>
					<div className={styles.details_container}>
						<p className={styles.details}>
							You have successfully opted for the &quot;
							<span className={styles.policy_text}>Third-Party Check</span>
							&quot; service during the purchasing process. the seller will
							be required to ship the gear to Gearup service center for
							inspection
						</p>
					</div>
					<div className={styles.details_container}>
						<p className={styles.details}>
							The status of the inspection will be communicated to you after
							the inspection
						</p>
					</div>
				</>
			)}
		</div>
	);
};

export default AwaitingApproval;
