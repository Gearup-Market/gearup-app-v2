"use client";

import { useGetStellarTransactions, useGetStellarWallet, useGetWallet, useGetWalletTransactions } from "@/app/api/hooks/wallets";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { updateWallet } from "@/store/slices/walletSlice";
import { useEffect } from "react";

export function useWallet() {
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const { data: walletResult, isFetching, refetch } = useGetWallet({ userId });

	useEffect(() => {
		if (walletResult) {
			dispatch(
				updateWallet({
					wallet: walletResult.data
				})
			);
		}
	}, [isFetching, walletResult]);

	return { walletResult, isFetching, refetch };
}

export function useWalletTransactions({
	limit = 5,
	skip = 0
}: {
	limit: number;
	skip: number;
}) {
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const {
		data: wTransactionResult,
		isFetching,
		refetch
	} = useGetWalletTransactions({
		userId,
		query: { limit, skip }
	});

	useEffect(() => {
		if (wTransactionResult) {
			dispatch(
				updateWallet({
					wTransactions: wTransactionResult.data.transactions
				})
			);
		}
	}, [isFetching, wTransactionResult, limit, skip]);

	return {
		isFetching,
		refetch,
		data: wTransactionResult?.data.transactions ?? [],
		pagination: wTransactionResult?.data.pagination ?? {
			currentPage: 0,
			totalCount: 0
		}
	};
}

export function useStellarWallet() {
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const { data: result, isFetching, refetch } = useGetStellarWallet({ userId });

	useEffect(() => {
		if (result) {
			dispatch(
				updateWallet({
					stellarWallet: result.data
				})
			);
		}
	}, [isFetching, result]);

	return { data: result?.data, isFetching, refetch };
}

export function useStellarWalletTransactions({
	limit = 5,
	cursor
}: {
	limit: number;
	cursor?: string;
}) {
	const { userId } = useAppSelector(s => s.user);
	const dispatch = useAppDispatch();

	const {
		data: result,
		isFetching,
		refetch
	} = useGetStellarTransactions({
		userId,
		query: { limit, cursor }
	});

	useEffect(() => {
		if (result) {
			dispatch(
				updateWallet({
					stellarTransactions: result.data.transactions
				})
			);
		}
	}, [isFetching, result, limit, cursor]);

	return {
		isFetching,
		refetch,
		data: result?.data.transactions ?? [],
		nextCursor: result?.data.nextCursor
	};
}
