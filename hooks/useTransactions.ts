"use client";
import {
	useGetSingleTransactions,
	useGetTransactions
} from "@/app/api/hooks/transactions";
import {
	SingleTransaction,
	TransactionType,
	UserRole
} from "@/app/api/hooks/transactions/types";
import { iTransactionDetails } from "@/interfaces";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateTransaction } from "@/store/slices/transactionSlice";
import { useEffect } from "react";

export default function useTransactions(userid?: string, page: number = 1) {
	const userId = useAppSelector(s => s.user.userId);
	const { data, isFetching, error, refetch } = useGetTransactions(
		userid || userId,
		page
	);
	return {
		data: data?.data || [],
		isFetching,
		error,
		refetch,
		pagination: data?.pagination
	};
}

export function useTransaction(id?: string) {
	const {
		data: result,
		isFetching,
		error,
		refetch
	} = useGetSingleTransactions(id, { refetchInterval: 5000 });
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const formatTransaction = (data: SingleTransaction) => {
		const { _id, item, buyer, type, status, createdAt, rentalBreakdown } = data;
		const isBuyer = userId === buyer.userId;
		const transactionType =
			type === TransactionType.Sale && isBuyer
				? "Purchase"
				: type === TransactionType.Sale && !isBuyer
				? "Sale"
				: TransactionType.Rental;
		const userRole =
			transactionType === "Purchase"
				? UserRole.Buyer
				: transactionType === "Sale"
				? UserRole.Seller
				: transactionType === "Rental" && isBuyer
				? UserRole.Renter
				: UserRole.Lender;
		return {
			...data,
			id: _id,
			gearName: item ? item.productName : "Listing not available",
			transactionDate: createdAt,
			transactionType,
			transactionStatus: status,
			gearImage: item ? item.listingPhotos[0] : "",
			userRole,
			listing: item,
			isBuyer,
			rentalBreakdown
		};
	};

	useEffect(() => {
		if (result?.data) {
			const transaction = formatTransaction(result?.data);
			const stage = transaction.stages.find(t => !!t.isCurrent);
			dispatch(
				updateTransaction({
					transaction: {
						...transaction,
						metadata: {
							...(transaction?.metadata || {}),
							thirdPartyCheckup: false
						}
					},
					currentStage: stage
				})
			);
		}
	}, [result, isFetching, refetch]);

	return {
		data: result?.data ? formatTransaction(result?.data) : undefined,
		isFetching,
		error,
		refetch
	};
}
