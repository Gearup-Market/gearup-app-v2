"use client";
import React, { useMemo } from "react";
import styles from "./TransactionDetails.module.scss";
import {
	TransactionDetailsBody,
	TransactionDetailsHeader
} from "@/components/UserDashboard/Transactions/TransactionDetails";
import { useTransaction } from "@/hooks/useTransactions";
import { useAppSelector } from "@/store/configureStore";
import { TransactionType, UserRole } from "@/app/api/hooks/transactions/types";
import { PageLoader } from "@/shared/loaders";
import { iWTransaction } from "@/app/api/hooks/wallets/types";
import { iTransactionDetails } from "@/interfaces";
import ChatBodySection from "@/components/UserDashboard/Messages/components/ChatBodySection/ChatBodySection";
import GearDetailsSection from "@/components/UserDashboard/Transactions/TransactionDetails/TransactionDetailsBody/GearDetailsSection/GearDetailsSection";

enum DetailsView {
	OVERVIEW = "overview",
	MESSAGES = "messages",
	DETAILS = "details"
}

interface Props {
	transactionId: string;
}

const TransactionDetails = ({ transactionId }: Props) => {
	const { isFetching } = useTransaction(transactionId);
	const { transaction } = useAppSelector(s => s.transaction);
	const [activeView, setActiveView] = React.useState(DetailsView.OVERVIEW);

	// const transaction: iTransactionDetails | undefined = useMemo(() => {
	//     if (data) {
	//         const { _id, item, buyer, type, status, createdAt, rentalPeriod } = data
	// 		const isBuyer = userId === buyer.userId;
	// 		const transactionType =
	// 			type === TransactionType.Sale && isBuyer
	// 				? "Purchase"
	// 				: type === TransactionType.Sale && !isBuyer
	// 				? "Sale"
	// 				: TransactionType.Rental;
	// 		const userRole =
	// 			transactionType === "Purchase"
	// 				? UserRole.Buyer
	// 				: transactionType === "Sale"
	// 				? UserRole.Seller
	// 				: transactionType === "Rental" && isBuyer
	// 				? UserRole.Renter
	// 				: UserRole.Lender;
	//         return {
	//             ...data,
	//             id: _id,
	//             gearName: item.productName,
	//             transactionDate: createdAt,
	//             transactionType,
	//             transactionStatus: status,
	//             gearImage: item.listingPhotos[0],
	//             userRole,
	//             listing: item,
	//             isBuyer,
	// 			rentalPeriod
	//         }
	// 	}
	// }, [data, isFetching]);
	return (
		<div className={styles.container}>
			{!transaction && <PageLoader />}
			{transaction && (
				<>
					<TransactionDetailsHeader />
					{activeView === DetailsView.OVERVIEW && <TransactionDetailsBody />}
					{activeView === DetailsView.MESSAGES && (
						<div className={styles.chat_body_section}>
							{" "}
							<ChatBodySection showAllBorder={true} />
						</div>
					)}
					{activeView === DetailsView.DETAILS && <GearDetailsSection />}
				</>
			)}
		</div>
	);
};

export default TransactionDetails;
