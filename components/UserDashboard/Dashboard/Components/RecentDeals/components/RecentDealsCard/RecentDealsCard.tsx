"use client";
import React from "react";
import styles from "./RecentDealsCard.module.scss";
import { Button, MobileCard } from "@/shared";

interface Props {
	item: any;
	ind?: number;
	lastEle?: boolean;
}
const RecentDealsCard = ({ item, ind, lastEle }: Props) => {
	return (
		<MobileCard
			mainHeaderText={item.gearName}
			subHeaderText={item.amount}
			mainHeaderImage={item.gearImage}
			lastEle={lastEle}
			ind={ind}
		>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Transaction date</p>
				<p className={styles.value}>{item.transactionDate}</p>
			</div>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Type</p>
				<p className={`${styles.value} ${styles.rental}`}>
					{item.transactionType}
				</p>
			</div>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Status</p>
				<p
					className={`${styles.value} ${styles.status}`}
					data-status={item.transactionStatus.toLowerCase()}
				>
					{item.transactionStatus}
				</p>
			</div>
			<div className={styles.container__details__btn_container}>
				<Button buttonType="secondary" className={styles.btn}>
					see details
				</Button>
			</div>
		</MobileCard>
	);
};

export default RecentDealsCard;
