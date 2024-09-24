import React, { useState } from "react";
import styles from "./RentTransactions.module.scss";
import DetailsSummary from "../DetailsSummary/DetailsSummary";
import { LendersTimeline, RentersTimeline } from "./TimeLines";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { iTransactionDetails } from "@/interfaces";
import { UserRole } from "@/app/api/hooks/transactions/types";
import useTimeline from "@/hooks/useTimeline";

interface Props {
	item: iTransactionDetails;
}

const RentTransactions = ({ item }: Props) => {
	const [openModal, setOpenModal] = useState(false);
	const timeline = item.userRole;

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
					<LendersTimeline item={item} openModal={openModal} setOpenModal={setOpenModal} />
				) : (
					<RentersTimeline item={item} openModal={openModal} setOpenModal={setOpenModal} />
				)}
			</div>
			<DetailsSummary item={item} />
		</div>
	);
};

export default RentTransactions;
