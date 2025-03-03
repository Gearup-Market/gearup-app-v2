"use client";
import React, { useState } from "react";
import styles from "./TransactionDetailsHeader.module.scss";
import { ChevronIcon } from "@/shared/svgs/dashboard";
import HeaderSubText from "@/components/Admin/HeaderSubText/HeaderSubText";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { formatNum } from "@/utils";

interface Props {
	slug: string;
	transaction: any;
}

const TransactionDetailsHeader = ({ slug, transaction }: Props) => {
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
			<HeaderSubText title="Transactions details" variant="normal" />
			<div className={styles.item_details}>
				<div className={styles.left}>
					<Image
						src={transaction?.item?.listingPhotos[0] || "/images/admin-img.jpg"}
						alt={transaction?.item?.productName}
						width={16}
						height={16}
					/>
					<span className={styles.right}>
						<h2>{transaction?.item?.productName}</h2>
						<p>{formatNum(transaction?.amount)}</p>
					</span>
				</div>
				<div
					className={styles.status}
					data-status={transaction?.status.toLowerCase()}
				>
					{transaction?.status}
				</div>
			</div>
		</div>
	);
};

export default TransactionDetailsHeader;
