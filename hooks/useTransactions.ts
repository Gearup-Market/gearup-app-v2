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

export default function useTransactions() {
	const userId = useAppSelector(s => s.user.userId);
	const { data, isFetching, error } = useGetTransactions(userId);
	return { data: data?.data || [], isFetching, error };
}

export function useTransaction(id?: string) {
	const {
		data: result,
		isFetching,
		error
	} = useGetSingleTransactions(id, { refetchInterval: 5000 });
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const formatTransaction = (data: SingleTransaction) => {
		const { _id, item, buyer, type, status, createdAt, rentalPeriod } = data;
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
			gearName: item.productName,
			transactionDate: createdAt,
			transactionType,
			transactionStatus: status,
			gearImage: item.listingPhotos[0],
			userRole,
			listing: item,
			isBuyer,
			rentalPeriod
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
	}, [result, isFetching]);

	return {
		data: result?.data ? formatTransaction(result?.data) : undefined,
		isFetching,
		error
	};
}
