"use client";
import React from "react";
import styles from "./RentersTimeline.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import {
	AwaitingApproval,
	AwaitingConfirmation,
	ConfirmHandover,
	InitiateReturn,
	TransactionOngoing
} from "./components";
import Modal from "@/shared/modals/modal/Modal";
import TimeLine from "./components/TimeLine/TimeLine";
import { CustomRatingFeedback } from "../../..";
import useTimeline from "@/hooks/useTimeline";
import { useAppSelector } from "@/store/configureStore";

interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RentersTimeline = ({ openModal, setOpenModal }: Props) => {
	const { transaction } = useAppSelector(s => s.transaction);
	const { steps, handleAction } = useTimeline(transaction!);
	if (!transaction) return null;

	const isReviewed = !!transaction.reviews.buyerReviewed;
	// const isTimeElapsed = transaction?.rentalPeriod ? Date.now() > new Date(transaction.rentalPeriod.end).getTime() : false

	return (
		<div className={styles.container}>
			<div className={styles.desktop_timelines}>
				<div className={styles.left}>
					<HeaderSubText title="Transaction timeline" />
					<TimeLine steps={steps} />
				</div>
			</div>
			<div className={styles.right}>
				{steps == 1 && (
					<AwaitingApproval item={transaction} handleNext={handleAction} />
				)}
				{steps === 2 && (
					<ConfirmHandover item={transaction} handleNext={handleAction} />
				)}
				{steps === 3 && (
					<TransactionOngoing
						item={transaction}
						handleNext={handleAction}
						isTimeElapsed={false}
					/>
				)}
				{steps === 4 && <InitiateReturn handleNext={handleAction} />}
				{steps === 5 && <AwaitingConfirmation />}
				{steps === 6 && (
					<CustomRatingFeedback
						item={transaction}
						showSuccessWarning={isReviewed}
					/>
				)}
			</div>
			<Modal
				openModal={openModal}
				setOpenModal={() => setOpenModal(false)}
				title="Transaction timeline"
			>
				<TimeLine steps={steps} />
			</Modal>
		</div>
	);
};

export default RentersTimeline;
