"use client";
import React, { useState } from "react";
import styles from "./TransactionCardMob.module.scss";
import Image from "next/image";
import { Button, MobileCard } from "@/shared";
import Link from "next/link";

interface Props {
	item: any;
	lastEle?: boolean;
	ind?: number;
}

const TransactionCardMob = ({ item, lastEle, ind }: Props) => {
	return (
		<MobileCard
			mainHeaderText={item.title}
			subHeaderText={item.price}
			mainHeaderImage={item.image}
			lastEle={lastEle}
			ind={ind}
		>
			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Transaction date</p>
				<p className={styles.value}>{item.transaction_date.split("T")[0]}</p>
			</div>

			<div className={styles.container__details__detail_container}>
				<p className={styles.key}>Status</p>
				<p
					className={`${styles.value} ${styles.status}`}
					data-status={item.status}
				>
					{item.status}
				</p>
			</div>
			<Link
				href={`/admin/transactions/${item.id}`}
				className={styles.container__details__btn_container}
			>
				<Button buttonType="secondary" className={styles.btn}>
					see details
				</Button>
			</Link>
		</MobileCard>
	);
};

export default TransactionCardMob;
