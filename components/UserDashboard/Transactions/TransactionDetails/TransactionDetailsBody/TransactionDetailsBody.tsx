import React from "react";
import styles from "./TransactionDetailsBody.module.scss";
import RentTransactions from "./components/RentTransactions/RentTransactions";
import BuyTransactions from "./components/BuySaleTransactions/BuySaleTransactions";
import CourseTransactions from "./components/CoursesTransactions/CourseTransactions";
import { useAppSelector } from "@/store/configureStore";
import SharesTransaction from "./components/sharesTransaction/SharesTransaction";
const TransactionDetailsBody = () => {
	const { transaction } = useAppSelector(s => s.transaction);

	// if (!transaction) return null;

	const transactionType = transaction?.transactionType;
	// console.log(transactionType);
	return (
		<div className={styles.container}>
			{transactionType === "Rental" && <RentTransactions />}
			{(transactionType === "Purchase" || transactionType === "Sale") &&
				transaction?.itemType !== "Course" && <BuyTransactions />}
			{transaction?.itemType === "Course" && (
				<CourseTransactions transaction={transaction} />
			)}
			{transaction?.transactionType === "Shares" && (
				<SharesTransaction transaction={transaction} />
			)}
		</div>
	);
};

export default TransactionDetailsBody;
