"use client";
import React, { useEffect, useState } from "react";
import styles from "./SellersTimeline.module.scss";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import {
	AcceptDecline,
	AwaitingConfirmation,
	AwaitingShipment,
	ConfirmShipment,
	Shipment,
	StatusReport
} from "./components";
import {
	saleSellersTimeline,
	saleSellersTimelineThirdParty,
	sellersReturnTimeline
} from "../../../utils/data";
import { useSearchParams } from "next/navigation";
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
	timelines?: any;
	openModal: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SellersTimeline = ({ openModal, setOpenModal }: Props) => {
	const [newTimelines, setNewTimelines] = useState<Timeline[]>([]);

	const { transaction } = useAppSelector(s => s.transaction);
	const { steps, handleAction } = useTimeline(transaction!);
	const { metadata, reviews } = transaction!;
	const thirdPartyVerification = !!metadata?.thirdPartyCheckup;
	const shouldReturn = false;
	const isReviewed = !!reviews.sellerReviewed;
    
	useEffect(() => {
		if (thirdPartyVerification) {
			setNewTimelines(saleSellersTimelineThirdParty);
		} else {
			setNewTimelines(saleSellersTimeline);
		}
	}, [thirdPartyVerification]);

	useEffect(() => {
		if (shouldReturn) {
			setNewTimelines(sellersReturnTimeline);
		}
	}, [shouldReturn]);

	if (!transaction) return null;

	return (
		<>
			<div className={styles.container}>
				<div className={styles.desktop_timelines}>
					<div className={styles.left}>
						<HeaderSubText title="Transaction timeline" />
						<TimeLine steps={steps} newTimelines={newTimelines} />
					</div>
				</div>
				<div className={styles.right}>
					{shouldReturn ? (
						<>
							{steps == 1 && <AwaitingShipment handleNext={handleAction} />}
							{steps === 2 && <ConfirmShipment handleNext={handleAction} />}
							{steps === 3 && (
								<CustomRatingFeedback
									item={transaction}
									showSuccessWarning={isReviewed}
								/>
							)}
						</>
					) : (
						<>
							{steps == 1 && (
								<AcceptDecline
									item={transaction}
									handleNext={handleAction}
								/>
							)}
							{steps === 2 && (
								<Shipment item={transaction} handleNext={handleAction} />
							)}
							{steps === 3 && <AwaitingConfirmation item={transaction} />}
							<>
								{thirdPartyVerification ? (
									<>
										{steps === 4 && <StatusReport />}
										{steps === 5 && (
											<CustomRatingFeedback
												item={transaction}
												showSuccessWarning={isReviewed}
											/>
										)}
									</>
								) : (
									<>
										{steps === 4 && (
											<CustomRatingFeedback
												item={transaction}
												showSuccessWarning={isReviewed}
											/>
										)}
									</>
								)}
							</>
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
		</>
	);
};

export default SellersTimeline;
