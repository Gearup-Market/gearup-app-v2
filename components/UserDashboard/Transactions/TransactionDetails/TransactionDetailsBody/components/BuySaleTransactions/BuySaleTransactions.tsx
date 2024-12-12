import React, { useState } from "react";
import styles from "./BuySaleTransactions.module.scss";
import DetailsSummary from "../DetailsSummary/DetailsSummary";
import { BuyersTimeline, SellersTimeline } from "./TimeLines";
import HeaderSubText from "@/components/UserDashboard/HeaderSubText/HeaderSubText";
import { MoreIcon } from "@/shared/svgs/dashboard";
import { useAppSelector } from "@/store/configureStore";
import { UserRole } from "@/app/api/hooks/transactions/types";

const BuySaleTransactions = () => {
	const [openModal, setOpenModal] = useState(false);
	const { transaction } = useAppSelector(s => s.transaction);

	if (!transaction) return null;
	const timeline = transaction.userRole;

	return (
		<div className={styles.container}>
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
			{timeline === UserRole.Buyer ? (
				<BuyersTimeline openModal={openModal} setOpenModal={setOpenModal} />
			) : (
				<SellersTimeline openModal={openModal} setOpenModal={setOpenModal} />
			)}
			<DetailsSummary item={transaction} />
		</div>
	);
};

export default BuySaleTransactions;
