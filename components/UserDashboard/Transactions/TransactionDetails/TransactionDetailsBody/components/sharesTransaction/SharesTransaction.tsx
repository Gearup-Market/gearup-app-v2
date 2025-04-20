"use client";

import { CopyIcon } from "@/shared/svgs/dashboard";
import { Ratings } from "@/shared";
import { PersonalDetails, ReceiptDetails } from "../DetailsSummary/components";
import { iTransactionDetails } from "@/interfaces";
import { formatHyphenText } from "@/utils/formatHyphenText";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
import { formatDate, formatNum } from "@/utils";
import { useCopy } from "@/hooks";
import format from "date-fns/format";
import { shortenTitle } from "@/utils";
import Link from "next/link";
import styles from "./SharesTransaction.module.scss";
interface Props {
	transaction?: iTransactionDetails;
}

const SharesTransaction = ({ transaction }: Props) => {
	const handleCopy = useCopy();
	const completedStage = transaction?.stages?.find(item => item.stage === "completed");
	const offers = isListing(transaction?.listing, transaction?.itemType as string)
		? transaction?.listing.offer.forRent
		: null;
	return (
		<div className={styles.container}>
			<div className={styles.container__left}>
				<div className={styles.container__left__summary_container}>
					<h3 className={styles.title}>Summary</h3>
					<div className={styles.summary_item}>
						<h4>Transaction type</h4>
						<p>
							{formatHyphenText(
								!isListing(
									transaction?.listing,
									transaction?.itemType as string
								)
									? (transaction?.transactionType as string)
									: transaction?.transactionType
							)}
						</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Listing type</h4>
						<p>
							{formatHyphenText(
								!isListing(
									transaction?.listing,
									transaction?.itemType as string
								)
									? (transaction?.itemType as string)
									: transaction?.listing.listingType
							)}
						</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Transaction date</h4>
						<p>{formatDate(transaction?.createdAt)}</p>
					</div>
					<div className={styles.summary_item}>
						<h4>Shares Purchased</h4>
						<p>{formatNum(transaction?.amount)}</p>
					</div>
					{isListing(transaction?.listing, transaction?.itemType as string) &&
						transaction?.listing.listingType === "rent" &&
						offers?.rates.map((rate, index) => (
							<div className={styles.summary_item} key={index}>
								<h4>
									{rate.quantity} {rate.duration} offer
								</h4>
								<p>₦{formatNum(rate.price)}</p>
							</div>
						))}
					{isListing(transaction?.listing, transaction?.itemType as string) && (
						<div className={styles.summary_item}>
							<h4>Listing</h4>
							<span
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px"
								}}
							>
								<Link
									href={`/listings/${transaction?.listing?.productSlug}`}
									target="_blank"
								>
									{shortenTitle(`${transaction?.listing?.productSlug}`)}
								</Link>
							</span>
						</div>
					)}
					{transaction?.listing?.transactionId && (
						<div className={styles.summary_item}>
							<h4>Listing Creation Transaction</h4>
							<span
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px"
								}}
							>
								<Link
									href={`https://stellar.expert/explorer/public/tx/${transaction?.listing?.transactionId}`}
									target="_blank"
								>
									{shortenTitle(
										transaction?.listing?.transactionId as string
									)}
								</Link>
								<span
									className={styles.icon}
									onClick={() =>
										handleCopy(
											transaction?.listing?.transactionId as string
										)
									}
								>
									<CopyIcon />
								</span>
							</span>
						</div>
					)}
					{completedStage?.transactionHash && (
						<div className={styles.summary_item}>
							<h4>Shares Purchase Transaction</h4>
							<span
								style={{
									display: "flex",
									alignItems: "center",
									gap: "10px"
								}}
							>
								<Link
									href={`https://stellar.expert/explorer/public/tx/${completedStage?.transactionHash}`}
									target="_blank"
								>
									{shortenTitle(
										transaction?.listing?.transactionId as string
									)}
								</Link>
								<span
									className={styles.icon}
									onClick={() =>
										handleCopy(
											transaction?.listing?.transactionId as string
										)
									}
								>
									<CopyIcon />
								</span>
							</span>
						</div>
					)}
				</div>
			</div>
			<div className={styles.container__right}>
				{transaction?.isBuyer && (
					<PersonalDetails
						showTitle={false}
						name={transaction?.seller?.userName as string}
						subText="Owner"
						profileLink={`/users/${transaction?.seller?._id}`}
						profilePhoto={transaction?.seller?.avatar || "/svgs/user.svg"}
						forSale={false}
					/>
				)}
				<ReceiptDetails />
			</div>
		</div>
	);
};

export default SharesTransaction;
