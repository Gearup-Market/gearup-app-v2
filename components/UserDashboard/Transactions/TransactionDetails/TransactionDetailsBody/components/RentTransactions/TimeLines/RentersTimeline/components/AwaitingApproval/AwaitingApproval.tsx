"use client";
import React, { useMemo, useState } from "react";
import styles from "./AwaitingApproval.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import Link from "next/link";
import { Button } from "@/shared";
import { iTransactionDetails, TransactionStage, TransactionStatus } from "@/interfaces";
import { useAppSelector } from "@/store/configureStore";
import { usePostTransactionStatus } from "@/app/api/hooks/transactions";
import toast from "react-hot-toast";
import { formatDate, getDaysDifference, getLastRentalDate } from "@/utils";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
interface Props {
	handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
	item: iTransactionDetails;
}
const AwaitingApproval = ({ handleNext, item }: Props) => {
	const { userId } = useAppSelector(s => s.user);
	const { currentStage } = useAppSelector(s => s.transaction);
	const { mutateAsync: postTransactionStatus, isPending } = usePostTransactionStatus();
	const {
		isBuyer,
		id,
		amount,
		transactionStatus,
		listing,
		rentalBreakdown,
		buyer,
		itemType
	} = item;

	const isCancelled = useMemo(
		() => transactionStatus === TransactionStatus.Cancelled,
		[transactionStatus]
	);
	const isDeclined = useMemo(
		() => transactionStatus === TransactionStatus.Declined,
		[transactionStatus]
	);

	const onClickCancel = async () => {
		try {
			const authority = {
				id: userId,
				role: isBuyer ? "buyer" : ("seller" as "buyer" | "seller")
			};

			if (transactionStatus !== TransactionStatus.Pending) {
				toast.error("Transaction not in cancellation state");
				return;
			}
			const res = await postTransactionStatus({
				id,
				status: TransactionStatus.Cancelled,
				authority
			});

			if (res.data) {
				toast.success("You have declined this request");
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "An error occurred");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.container_top}>
				<HeaderSubText
					title={
						currentStage?.stage === TransactionStage.AwaitingPayment
							? "Awaiting payment confirmation"
							: "Awaiting approval"
					}
				/>
				{currentStage?.stage === TransactionStage.AwaitingPayment ? (
					<>
						<div className={styles.details_container}>
							<p className={styles.details}>
								You have made payment but we are still confirming the
								transaction status. This view will be updated immediately
								your payment is received and verified
							</p>
						</div>
					</>
				) : (
					<>
						{isCancelled || isDeclined ? (
							<div className={styles.details_container}>
								<p className={styles.details}>
									This transaction was declined, your money in escrow
									protection will be refunded to you
								</p>
							</div>
						) : (
							<>
								<div className={styles.details_container}>
									<p className={styles.details}>
										You have successfully paid the sum of{" "}
										<span className={styles.bold}>₦{amount}</span> for
										the rental of{" "}
										<span className={styles.bold}>
											{listing
												? isListing(listing, itemType as string)
													? listing.productName
													: listing.title
												: "Listing not available"}
										</span>{" "}
										from{" "}
										<span className={styles.bold}>
											{formatDate(rentalBreakdown[0].date)} to{" "}
											{formatDate(
												getLastRentalDate(rentalBreakdown)
											)}{" "}
											({rentalBreakdown.length}
											days{" "}
											{rentalBreakdown[0].duration === "hour"
												? `for ${rentalBreakdown.reduce(
														(total, period) =>
															total + period.quantity,
														0
												  )} hours`
												: null}
											)
										</span>{" "}
										and the money is in escrow protection .{" "}
									</p>
								</div>
								<div className={styles.details_container}>
									<p className={styles.details}>
										Please make sure you review the renter agreement
										documents, overtime payment policies etc, before
										proceeding to this transaction. If you are not
										satisfied with the conditions, cancel the
										transaction and your money will be refunded to you{" "}
									</p>
								</div>
								<div className={styles.details_container}>
									<p className={styles.details}>
										Once the lender accepts the transaction, the
										handover process will be initiated, and your
										client is expected to deliver the gear within
										12-24hours to your shooting date else the money
										will be refunded to you
									</p>
								</div>
								<div className={styles.details_container}>
									<p className={styles.details}>
										Gearup Global Insurance coverage starts from 17:00
										the day before the shoot and ends at 10:00 the day
										after the shoot..{" "}
										<Link href="#" className={styles.learn_more}>
											Learn more
										</Link>
									</p>
								</div>
								<div className={styles.details_container}>
									<p className={styles.details}>
										If the transaction is not approved by the lender,
										your money will be refunded to you.
									</p>
								</div>
								<div className={styles.details_container}>
									<p className={styles.details}>
										You have 12-24hours from when payment was made to
										cancel the transaction and request for a refund
									</p>
								</div>
							</>
						)}
					</>
				)}
			</div>
			{!isCancelled &&
				!isDeclined &&
				currentStage?.stage !== TransactionStage.AwaitingPayment && (
					<div className={styles.btn_container}>
						<Button
							className={styles.cancel_btn}
							onClick={onClickCancel}
							buttonType="secondary"
						>
							Cancel transaction
						</Button>
						{/* <Button onClick={handleNext}>Proceed</Button> */}
					</div>
				)}
		</div>
	);
};

export default AwaitingApproval;
