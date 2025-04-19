"use client";
import React, { useEffect } from "react";
import styles from "./TransactionDetails.module.scss";
import {
	TransactionDetailsBody,
	TransactionDetailsHeader
} from "@/components/UserDashboard/Transactions/TransactionDetails";
import { useTransaction } from "@/hooks/useTransactions";
import { useAppSelector } from "@/store/configureStore";
import { PageLoader } from "@/shared/loaders";
import ChatBodySection from "@/components/UserDashboard/Messages/components/ChatBodySection/ChatBodySection";
import GearDetailsSection from "@/components/UserDashboard/Transactions/TransactionDetails/TransactionDetailsBody/GearDetailsSection/GearDetailsSection";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetUserMessages } from "@/app/api/hooks/messages";
import CourseTransactions from "@/components/UserDashboard/Transactions/TransactionDetails/TransactionDetailsBody/components/CoursesTransactions/CourseTransactions";

export enum DetailsView {
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
	const { userId } = useAppSelector(s => s.user);
	const { data, isFetching: isFetchingAllUserMessages } = useGetUserMessages(userId);
	const [activeView, setActiveView] = React.useState(DetailsView.OVERVIEW);
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const dealer = transaction?.isBuyer ? transaction.seller._id : transaction?.buyer._id;
	const allUserMessages: any = data;

	const messages: any = allUserMessages?.data.filter((item: any) =>
		item.participants.some((p: any) => p._id === dealer)
	);

	useEffect(() => {
		if (activeView === DetailsView.MESSAGES) {
			const current = new URLSearchParams(Array.from(searchParams.entries()));
			current.set("participantId", dealer as string);
			current.set("listingId", transaction?.listing._id as string);
			if (messages?.length) {
				current.set("activeChatId", messages[0]?._id || "");
			}
			const search = current.toString();
			const query = search ? `?${search}` : "";

			router.push(`${pathname}${query}`);
		} else {
			router.push(pathname);
		}
	}, [activeView]);

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

	if (!transaction) return <PageLoader />;
	return (
		<div className={styles.container}>
			<>
				<TransactionDetailsHeader
					activeView={activeView}
					setActiveView={setActiveView}
				/>
				{activeView === DetailsView.OVERVIEW && <TransactionDetailsBody />}
				{activeView === DetailsView.MESSAGES && (
					<div className={styles.chat_body_section}>
						{" "}
						<ChatBodySection showAllBorder={true} />
					</div>
				)}
				{activeView === DetailsView.DETAILS && (
					<GearDetailsSection transactionId={transactionId} />
				)}
			</>
		</div>
	);
};

export default TransactionDetails;
