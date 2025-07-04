"use client";
import React, { useMemo } from "react";
import styles from "./AcceptDecline.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { Button } from "@/shared";
import Image from "next/image";
import { iTransactionDetails, TransactionStage, TransactionStatus } from "@/interfaces";
import { usePostTransactionStatus } from "@/app/api/hooks/transactions";
import { useAppSelector } from "@/store/configureStore";
import toast from "react-hot-toast";
import { getDaysDifference, formatDate, formatNum, getLastRentalDate } from "@/utils";
import { isListing } from "@/components/CartComponent/CartItems/CartItems";
interface Props {
	handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
	item: iTransactionDetails;
}
const AcceptDecline = ({ handleNext, item }: Props) => {
	const { mutateAsync: postTransactionStatus, isPending } = usePostTransactionStatus();
	const { userId } = useAppSelector(s => s.user);
	const { isBuyer, id, amount, transactionStatus, listing, rentalBreakdown, itemType } =
		item;

	const isCancelled = useMemo(
		() => transactionStatus === TransactionStatus.Cancelled,
		[transactionStatus]
	);
	const isDeclined = useMemo(
		() => transactionStatus === TransactionStatus.Declined,
		[transactionStatus]
	);

	const onClickDecline = async () => {
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
				status: TransactionStatus.Declined,
				authority
			});

			if (res.data) {
				toast.success("You have declined this request");
				window.location.reload();
			}
		} catch (error: any) {
			toast.error(error?.response?.data?.message || "An error occurred");
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.container_top}>
				<HeaderSubText title="Accept or decline transaction" />
				{isCancelled ? (
					<div className={styles.details_container}>
						<p className={styles.details}>
							This transaction has been cancelled and the user and fund in
							the escrow protection will be refunded to them
						</p>
					</div>
				) : isDeclined ? (
					<div className={styles.details_container}>
						<p className={styles.details}>
							You have declined this transaction and funds in the escrow
							protection will be refunded to them.
						</p>
					</div>
				) : (
					<>
						<div className={styles.details_container}>
							<p className={styles.details}>
								<span className={styles.bold}>{item.buyer.userName}</span>{" "}
								has successfully paid the sum of{" "}
								<span className={styles.bold}>
									₦{formatNum(amount, true, 2)}
								</span>{" "}
								for the rental of{" "}
								{listing
									? isListing(listing, itemType as string)
										? listing.productName
										: listing.title
									: "Listing not available"}{" "}
								{rentalBreakdown?.length && (
									<span className={styles.bold}>
										from {formatDate(rentalBreakdown[0].date)} to{" "}
										{formatDate(getLastRentalDate(rentalBreakdown))}(
										{rentalBreakdown.length}
										days{" "}
										{rentalBreakdown[0].duration === "hour"
											? `for ${rentalBreakdown.reduce(
													(total, period) =>
														total + period.quantity,
													0
											  )} hours`
											: null}
										)
									</span>
								)}{" "}
								and the money is in escrow protection which will be
								released to you once the transaction is completed
							</p>
						</div>
						<div className={styles.warning_container}>
							<Image
								src="/svgs/warningIcon.svg"
								className={styles.warning_icon}
								alt="warning"
								width={10}
								height={10}
							/>
							<p className={styles.warning}>
								Please make sure you communicate or tell the renter about
								all your relevant rental agreement documents, overtime
								payment policies etc, before accepting this transaction,
								and all document must be uploaded on the file messaging
								section for transparency
							</p>
						</div>
					</>
				)}
			</div>
			{!isCancelled && !isDeclined && (
				<div className={styles.btn_container}>
					<Button
						onClick={onClickDecline}
						className={styles.cancel_btn}
						buttonType="secondary"
					>
						Decline
					</Button>
					<Button
						onClick={() =>
							handleNext(TransactionStage.SellerPreparingDelivery)
						}
					>
						Accept
					</Button>
				</div>
			)}
		</div>
	);
};

export default AcceptDecline;
