"use client";

import React from "react";
import styles from "./ConfirmHandover.module.scss";
import { Button } from "@/shared";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { iTransactionDetails, TransactionStage, TransactionStatus } from "@/interfaces";
import { useAppSelector } from "@/store/configureStore";
interface Props {
	handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
	item: iTransactionDetails;
}

const ConfirmHandover = ({ handleNext }: Props) => {
	const { currentStage } = useAppSelector(s => s.transaction);
	return (
		<div className={styles.container}>
			<div className={styles.container_top}>
				<HeaderSubText
					title={
						currentStage?.stage === TransactionStage.SellerPreparingDelivery
							? "Order processing by Lender..."
							: "Confirm handover"
					}
				/>

				{currentStage?.stage === TransactionStage.SellerPreparingDelivery ? (
					<>
						<div className={styles.details_container}>
							<p className={styles.details}>
								Your order request is under processing by the Lender. You
								are required to confirm receipt of the order immediately
								it is received by you.
							</p>
						</div>
					</>
				) : (
					<>
						<div className={styles.details_container}>
							<p className={styles.details}>
								Please make sure you have received the gear from the
								lender and in good condition before confirming handover
							</p>
						</div>
						<div className={styles.details_container}>
							<p className={styles.details}>
								Shipping can be made either in person (local pick-up) or
								shipped to an address agreed upon by you and the lender
							</p>
						</div>
						<div className={styles.details_container}>
							<p className={styles.details}>
								After you’ve confirmed handover, the transaction will be
								initiated
							</p>
						</div>
					</>
				)}
			</div>
			{currentStage?.stage !== TransactionStage.SellerPreparingDelivery && (
				<div className={styles.btn_container}>
					<Button onClick={() => handleNext(TransactionStage.RentalOngoing)}>
						Confirm handover
					</Button>
				</div>
			)}
		</div>
	);
};

export default ConfirmHandover;
