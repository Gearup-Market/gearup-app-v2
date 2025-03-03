import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAllTransactions = (
	page: number,
	options?: UseQueryOptions<any, any>
) =>
	useQuery<any, any>({
		queryKey: ["getAllTransactions"],
		queryFn: async () =>
			(await api.get(`${API_URL.getAllTransactions}?page=${page}`)).data,
		...options,
		refetchOnMount: true
	});

export const useGetTransactionsById = (
	transactionId: string,
	options?: UseQueryOptions<any, any>
) =>
	useQuery<any, any>({
		queryKey: ["transactionById", transactionId],
		queryFn: async () =>
			(await api.get(`${API_URL.transactions}/${transactionId}`)).data,
		...options,
		enabled: !!transactionId,
		refetchOnMount: true
	});
