"use client";
import React, { useMemo, useState } from "react";
import styles from "./AcceptDecline.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { Button } from "@/shared";
import { iTransactionDetails, TransactionStage, TransactionStatus } from "@/interfaces";
import { formatNum } from "@/utils";
import { useAppSelector } from "@/store/configureStore";
import { usePostTransactionStatus } from "@/app/api/hooks/transactions";
import toast from "react-hot-toast";

interface Props {
	item: iTransactionDetails;
	handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
}
const AcceptDecline = ({ handleNext, item }: Props) => {
	const { mutateAsync: postTransactionStatus, isPending } = usePostTransactionStatus();
	const { userId } = useAppSelector(s => s.user);

	const { metadata, isBuyer, id, amount, transactionStatus, listing } = item;
	const thirdPartyVerification = !!metadata?.thirdPartyCheckup;

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
				role: (isBuyer ? "buyer" : "seller") as "buyer" | "seller"
			};

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
				<HeaderSubText title="Awaiting approval" />
				{isCancelled || isDeclined ? (
					<div className={styles.details_container}>
						<p className={styles.details}>
							This transaction has been cancelled by{" "}
							{isDeclined ? "you" : "the user"} and the funds in the escrow
							protection will be refunded to the buyer
						</p>
					</div>
				) : (
					<>
						<div className={styles.details_container}>
							<p className={styles.details}>
								<span className={styles.bold}>
									{listing.user?.name || listing.user?.userName}
								</span>{" "}
								has successfully paid the sum of{" "}
								<span className={styles.bold}>₦{formatNum(amount)}</span>{" "}
								for the purchase of{" "}
								{listing ? listing.productName : "Listing not available"},
								and the money is in escrow protection, which will be
								released to you once the transaction is completed{" "}
							</p>
						</div>
						{thirdPartyVerification ? (
							<div className={styles.details_container}>
								<p className={styles.details}>
									The buyer has opted for the &apos;&apos;
									<span className={styles.learn_more}>
										Third-Party Check
									</span>
									&apos;&apos; service during the purchasing process.
									You will be required to ship the gear to Gearup
									service center for inspection
								</p>
							</div>
						) : (
							<>
								<div className={styles.details_container}>
									<p className={styles.details}>
										Buyers have the right to Return policy and the
										choice to opt for Third-Party Verification when
										making a purchase. Hence, we mandate that by
										accepting this transaction, you are agreeing to
										the 48-hour return policy
									</p>
								</div>
								<div className={styles.details_container}>
									<p className={styles.details}>
										Your payment will be processed after the 48hours
										return period has elapsed, if the buyer did not
										initiate a return request
									</p>
								</div>
							</>
						)}
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
