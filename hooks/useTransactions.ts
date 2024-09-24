"use client";
import { useGetSingleTransactions, useGetTransactions } from "@/app/api/hooks/transactions";
import { useAppSelector } from "@/store/configureStore";

export default function useTransactions() {
	const userId = useAppSelector(s => s.user.userId);
	const { data, isFetching, error } = useGetTransactions(userId);
	return { data: data?.data || [], isFetching, error };
}

export function useTransaction(id?: string) {
    const { data: result, isFetching, error } = useGetSingleTransactions(id);
    return { data: result?.data, isFetching, error}
}
