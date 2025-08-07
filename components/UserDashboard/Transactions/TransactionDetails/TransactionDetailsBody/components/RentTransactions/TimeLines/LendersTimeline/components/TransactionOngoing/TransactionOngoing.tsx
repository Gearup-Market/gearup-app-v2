"use client";
import React, { useState } from "react";
import styles from "./TransactionOngoing.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import Image from "next/image";
import { Button } from "@/shared";
import PaymentRequestForm from "./components/PaymentRequestForm/PaymentRequestForm";
import { TransactionStage, TransactionStatus } from "@/interfaces";

interface Props {
	isTimeElapsed?: boolean;
	handleNext: (stage: TransactionStage, status?: TransactionStatus) => Promise<void>;
}
const TransactionOngoing = ({ isTimeElapsed, handleNext }: Props) => {
	const [openPaymentForm, setOpenPaymentForm] = useState<boolean>(false);

	const showPaymentForm = () => {
		setOpenPaymentForm(true);
	};

	return (
		<div className={styles.container}>
			<div className={styles.container_top}>
				<HeaderSubText title="Transaction ongoing" />
				{isTimeElapsed ? (
					<>
						<div className={styles.details_container}>
							<p className={styles.details}>
								You’ll be requested to confirm this transaction as
								complete once your gear has been returned.
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
								Transaction is overdue, request payment for any additional
								gear usage beyond the agreed-upon period. Ensure you are
								compensated for the extra time your gear is in use. Click
								on the Send payment request button to initiate the
								transaction
							</p>
						</div>
					</>
				) : (
					<>
						<div className={styles.details_container}>
							<p className={styles.details}>
								Transaction is currently ongoing
							</p>
						</div>
						<div className={styles.details_container}>
							<p className={styles.details}>
								You’ll be requested to confirm this transaction as
								complete once your gear has been returned.
							</p>
						</div>
					</>
				)}
			</div>
			{isTimeElapsed ? (
				<div className={styles.btn_container}>
					<Button onClick={showPaymentForm}>Send Payment Request</Button>
				</div>
			) : (
				<div className={styles.btn_container}>
					<Button
						onClick={() =>
							handleNext(TransactionStage.AwaitingLenderConfirmation)
						}
					>
						Complete Transaction
					</Button>
				</div>
			)}
			<PaymentRequestForm
				openPaymentForm={openPaymentForm}
				setOpenPaymentForm={setOpenPaymentForm}
			/>
		</div>
	);
};

export default TransactionOngoing;
