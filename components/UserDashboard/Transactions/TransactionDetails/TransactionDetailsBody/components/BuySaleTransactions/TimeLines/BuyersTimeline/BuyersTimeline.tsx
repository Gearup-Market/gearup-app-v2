"use client";
import React, { useState, useEffect } from "react";
import styles from "./BuyersTimeline.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import { AwaitingApproval, ConfirmShipment, StatusReport } from "./components";
import { saleBuyersTimeline, saleBuyersTimelineThirdParty } from "../../../utils/data";
import TimeLine from "./components/TimeLine/TimeLine";
import Modal from "@/shared/modals/modal/Modal";
import { CustomRatingFeedback } from "../../..";
import { useAppSelector } from "@/store/configureStore";
import useTimeline from "@/hooks/useTimeline";
interface Timeline {
	id: number;
	name: string;
}
interface Props {
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BuyersTimeline = ({ openModal, setOpenModal }: Props) => {
	const [newTimelines, setNewTimelines] = useState<Timeline[]>([]);
	const { transaction } = useAppSelector(s => s.transaction);
	const { steps, handleAction } = useTimeline(transaction!);

	const { metadata, reviews } = transaction!;
	const thirdPartyVerification = !!metadata?.thirdPartyCheckup;

    const isReviewed = !!reviews.buyerReviewed;

	useEffect(() => {
		if (thirdPartyVerification) {
			setNewTimelines(saleBuyersTimelineThirdParty);
		} else {
			setNewTimelines(saleBuyersTimeline);
		}
	}, [thirdPartyVerification]);

	if (!transaction) return null;
	return (
		<div className={styles.container}>
			<div className={styles.desktop_timelines}>
				<div className={styles.left}>
					<HeaderSubText title="Transaction timeline" />
					<TimeLine steps={steps} newTimelines={newTimelines} />
				</div>
			</div>
			<div className={styles.right}>
				{thirdPartyVerification ? (
					<>
						{steps == 1 && (
							<AwaitingApproval
								item={transaction}
								handleNext={handleAction}
							/>
						)}
						{steps === 2 && <StatusReport handleNext={handleAction} />}
						{steps === 3 && (
							<ConfirmShipment
								handleNext={handleAction}
								thirdPartyVerification={true}
							/>
						)}
						{steps === 4 && <CustomRatingFeedback item={transaction} showSuccessWarning={isReviewed} />}
					</>
				) : (
					<>
						{steps == 1 && (
							<AwaitingApproval
								item={transaction}
								handleNext={handleAction}
							/>
						)}
						{steps === 2 && <ConfirmShipment handleNext={handleAction} />}
						{steps === 3 && <CustomRatingFeedback item={transaction} showSuccessWarning={isReviewed} />}
					</>
				)}
			</div>
			<Modal
				openModal={openModal}
				setOpenModal={() => setOpenModal(false)}
				title="Transaction timeline"
			>
				<TimeLine steps={steps} newTimelines={newTimelines} />
			</Modal>
		</div>
	);
};

export default BuyersTimeline;
