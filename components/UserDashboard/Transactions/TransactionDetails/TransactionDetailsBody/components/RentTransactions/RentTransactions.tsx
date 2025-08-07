import React, { useState } from "react";
import styles from "./RentTransactions.module.scss";
import DetailsSummary from "../DetailsSummary/DetailsSummary";
import { LendersTimeline, RentersTimeline } from "./TimeLines";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { UserRole } from "@/app/api/hooks/transactions/types";
import { useAppSelector } from "@/store/configureStore";

const RentTransactions = () => {
	const { transaction } = useAppSelector(s => s.transaction);
	const [openModal, setOpenModal] = useState(false);

	if (!transaction) return null;
	const timeline = transaction.userRole;

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title_more_icon}>
					<HeaderSubText title="Transaction Timeline" />
					<span className={styles.icon_container}>
						<MoreIcon
							onClick={e => {
								setOpenModal(true);
							}}
						/>
					</span>
				</div>
				{timeline === UserRole.Lender ? (
					<LendersTimeline openModal={openModal} setOpenModal={setOpenModal} />
				) : (
					<RentersTimeline openModal={openModal} setOpenModal={setOpenModal} />
				)}
			</div>
			<DetailsSummary item={transaction} />
		</div>
	);
};

export default RentTransactions;
