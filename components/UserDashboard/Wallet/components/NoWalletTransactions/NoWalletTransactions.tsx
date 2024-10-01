import React from "react";
import styles from "./NoWalletTransactions.module.scss";
import Image from "next/image";

const NoWalletTransactions = () => {
	return (
		<div className={styles.container}>
            <div className={styles.image_container}>

			<Image
				src="/svgs/money-recive.svg"
				alt="no-transaction"
				width={60}
				height={60}
                />
                </div>
			<p className={styles.no_transaction_text}>
				Recent Transactions will be displayed here
			</p>
		</div>
	);
};

export default NoWalletTransactions;
