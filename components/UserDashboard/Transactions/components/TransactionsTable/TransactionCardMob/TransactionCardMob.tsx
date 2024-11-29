"use client";
import React, { useState } from "react";
import styles from "./TransactionCardMob.module.scss";
import Image from "next/image";
import { Button, MobileCard } from "@/shared";
import { useRouter } from "next/navigation";

interface Props {
	item: any;
	ind?: number;
	lastEle?: boolean;
	loading: boolean;
}

const TransactionCardMob = ({ item, ind, lastEle, loading }: Props) => {
	const router = useRouter();
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
				<p className={styles.value}>{item.transactionDate.split("T")[0]}</p>
			</div>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Status</p>
				<p
					className={`${styles.value} ${styles.status}`}
					data-status={item.transactionStatus?.toLowerCase()}
				>
					{item.transactionStatus}
				</p>
			</div>
			<div className={styles.container__details__btn_container}>
				<Button
					buttonType="secondary"
					className={styles.btn}
					onClick={() => router.push(`/user/transactions/${item.id}`)}
				>
					see details
				</Button>
			</div>
		</MobileCard>
	);
};

export default TransactionCardMob;
