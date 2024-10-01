import React from "react";
import styles from "./NoTransactions.module.scss";
import Image from "next/image";
import { GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@/shared";
import Link from "next/link";

const NoTransactions = () => {
	return (
		<div className={styles.container}>
			<div className={styles.image_container}>
				<Image
					src="/svgs/video.svg"
					alt="no-transaction"
					width={60}
					height={60}
				/>
			</div>
			<p className={styles.no_transaction_text}>Recent Transactions will be displayed here</p>
		</div>
	);
};

export default NoTransactions;
