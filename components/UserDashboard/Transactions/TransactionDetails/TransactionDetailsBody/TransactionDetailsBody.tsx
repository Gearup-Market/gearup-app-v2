import React from "react";
import styles from "./TransactionDetailsBody.module.scss";
import RentTransactions from "./components/RentTransactions/RentTransactions";
import BuyTransactions from "./components/BuySaleTransactions/BuySaleTransactions";
import CourseTransactions from "./components/CoursesTransactions/CourseTransactions";
import { useAppSelector } from "@/store/configureStore";

const TransactionDetailsBody = () => {
	const { transaction } = useAppSelector(s => s.transaction);
	// if (!transaction) return null;

	const transactionType = transaction?.transactionType;
	// console.log(transactionType);
	return (
		<div className={styles.container}>
			{transactionType === "Rental" && <RentTransactions />}
			{(transactionType === "Purchase" || transactionType === "Sale") && (
				<BuyTransactions />
			)}
			{transactionType === "courses" && <CourseTransactions item={transaction} />}
		</div>
	);
};

export default TransactionDetailsBody;
