"use client";
import React, { useState } from "react";
import styles from "./TransactionDetailsHeader.module.scss";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { iTransactionDetails } from "@/interfaces";
import { formatNumber } from "@/utils";
import { useAppSelector } from "@/store/configureStore";
import { DetailsView } from "@/views/UserDashboardViews/Dashboard/Transactions/TransactionDetails/TransactionDetails";

interface Props {
	item?: iTransactionDetails;
	activeView: string;
	setActiveView: React.Dispatch<React.SetStateAction<DetailsView>>
}

const list = [
	{ id: 1, name: "Overview" },
	{ id: 2, name: "Messages" },
	{ id: 3, name: "Details" }
];

const TransactionDetailsHeader = ({activeView,setActiveView}:Props) => {
	const { transaction } = useAppSelector(s => s.transaction);
	const router = useRouter();
	const search = useSearchParams();

	const handleBack = () => {
		router.back();
	};

	if(!transaction) return null;

	return (
		<div className={styles.container}>
			<div className={styles.nav_container} onClick={handleBack}>
				<span className={styles.icon}>
					<ChevronIcon color="#4E5054" />
				</span>
				<p>Back</p>
			</div>
			<div className={styles.item_details}>
				<div className={styles.left}>
					<Image
						src={transaction.gearImage}
						alt={transaction.gearName}
						width={16}
						height={16}
					/>
					<span className={styles.right}>
						<h2>{transaction.gearName}</h2>
						<p>NGN{formatNumber(transaction.amount || 0)}</p>
					</span>
				</div>
				<div className={styles.status} data-status={transaction.transactionStatus}>
					{transaction.transactionStatus}
				</div>
			</div>
			{transaction.transactionType !== "courses" && (
				<ul className={styles.container__children_container}>
					{list.map(item => (
						<li
							onClick={() => setActiveView(item?.name?.toLowerCase() as DetailsView)}
							key={item.id}
							className={styles.container__children_container__filter}
							data-active={activeView === item.name.toLowerCase()}
						>
							<p>{item.name}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TransactionDetailsHeader;
