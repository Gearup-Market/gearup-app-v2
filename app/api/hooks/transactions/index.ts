import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery
} from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { AxiosError } from "axios";
import {
	iGetSingleTransactionRes,
	iGetTransactionRes,
	iPostAddCartReq,
	iPostAddCartRes,
	iPostCartErr,
	iPostRemoveCartReq,
	iPostTransactionRes,
	iPostTransactionStageReq,
	iPostTransactionStatusReq
} from "./types";

const useAddToCart = (
	options?: Omit<
		UseMutationOptions<iPostAddCartRes, iPostCartErr, iPostAddCartReq>,
		"mutationFn"
	>
) =>
	useMutation<iPostAddCartRes, iPostCartErr, iPostAddCartReq>({
		mutationFn: async props => (await api.post(API_URL.addCart, props)).data,
		...options
	});

const useAddAllToCart = (
	options?: Omit<
		UseMutationOptions<iPostAddCartRes, iPostCartErr, iPostAddCartReq[]>,
		"mutationFn"
	>
) =>
	useMutation<iPostAddCartRes, iPostCartErr, iPostAddCartReq[]>({
		mutationFn: async props => (await api.post(API_URL.addCartMultiple, props)).data,
		...options
	});

const useRemoveFromCart = (
	options?: Omit<
		UseMutationOptions<iPostAddCartRes, iPostCartErr, iPostRemoveCartReq>,
		"mutationFn"
	>
) =>
	useMutation<iPostAddCartRes, iPostCartErr, iPostRemoveCartReq>({
		mutationFn: async props => (await api.post(API_URL.removeCart, props)).data,
		...options
	});

export type IGetErr = AxiosError<{ status: string }>;

const useGetCart = (
	userId?: string,
	options?: UseQueryOptions<iPostAddCartRes, IGetErr>
) =>
	useQuery<iPostAddCartRes, IGetErr>({
		queryKey: ["cart"],
		queryFn: async () => (await api.get(`${API_URL.getCart}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: true
	});

const usePostTransaction = (
	options?: Omit<
		UseMutationOptions<iPostTransactionRes, iPostCartErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iPostTransactionRes, iPostCartErr, any>({
		mutationFn: async props => (await api.post(API_URL.transaction, props)).data,
		...options
	});

const usePostTransactionStage = (
	options?: Omit<
		UseMutationOptions<iPostTransactionRes, iPostCartErr, iPostTransactionStageReq>,
		"mutationFn"
	>
) =>
	useMutation<iPostTransactionRes, iPostCartErr, iPostTransactionStageReq>({
		mutationFn: async (props) => { 
			const { id, ...payload } = props
			return (await api.post(`${API_URL.changeTxStage}/${id}`, payload)).data
		},
		...options
	});

	const usePostTransactionStatus = (
		options?: Omit<
			UseMutationOptions<iPostTransactionRes, iPostCartErr, iPostTransactionStatusReq>,
			"mutationFn"
		>
	) =>
		useMutation<iPostTransactionRes, iPostCartErr, iPostTransactionStatusReq>({
			mutationFn: async (props) => { 
				const { id, ...payload } = props
				return (await api.post(`${API_URL.changeTxStatus}/${id}`, payload)).data
			},
			...options
		});

const useGetTransactions = (
	userId?: string,
	options?: UseQueryOptions<iGetTransactionRes, IGetErr>
) =>
	useQuery<iGetTransactionRes, IGetErr>({
		queryKey: ["getTransactions"],
		queryFn: async () => (await api.get(`${API_URL.getTransactions}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: true
	});

const useGetSingleTransactions = (
	transactionId?: string,
	options?: Omit<UseQueryOptions<iGetSingleTransactionRes, IGetErr>, 'queryKey'>
) =>
	useQuery<iGetSingleTransactionRes, IGetErr>({
		queryKey: ["getSingleTransaction"],
		queryFn: async () =>
			(await api.get(`${API_URL.getSingleTransaction}/${transactionId}`)).data,
		...options,
		enabled: !!transactionId,
		refetchOnMount: true
	});

export {
	useAddToCart,
	useGetCart,
	useRemoveFromCart,
	usePostTransaction,
	usePostTransactionStage,
	useGetTransactions,
	useAddAllToCart,
	useGetSingleTransactions,
	usePostTransactionStatus
};