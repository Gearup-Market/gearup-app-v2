"use client";
import React, { useState } from "react";
import styles from "./TransactionDetailsHeader.module.scss";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { iTransactionDetails } from "@/interfaces";
import { formatNumber } from "@/utils";
interface Props {
	item: iTransactionDetails;
}

const list = [
	{ id: 1, name: "Overview" },
	{ id: 2, name: "Messages" },
	{ id: 3, name: "Details" }
];

const TransactionDetailsHeader = ({ item }: Props) => {
	const [activeId, setActiveId] = useState(1);
	const router = useRouter();
	const search = useSearchParams();

	const handleBack = () => {
		router.back();
	};

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
						src={item.gearImage}
						alt={item.gearName}
						width={16}
						height={16}
					/>
					<span className={styles.right}>
						<h2>{item.gearName}</h2>
						<p>NGN{formatNumber(item.amount || 0)}</p>
					</span>
				</div>
				<div className={styles.status} data-status={item.transactionStatus}>
					{item.transactionStatus}
				</div>
			</div>
			{item.transactionType !== "courses" && (
				<ul className={styles.container__children_container}>
					{list.map(item => (
						<li
							onClick={() => setActiveId(item.id)}
							key={item.id}
							className={styles.container__children_container__filter}
							data-active={activeId === item.id}
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
