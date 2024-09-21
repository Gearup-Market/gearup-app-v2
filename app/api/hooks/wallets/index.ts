import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery
} from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import {
	iPostUpdateBankResp,
	iPostUpdateBankRsq,
	iStellarTransactionResp,
	iStellarWalletResp,
	iTransferXLMReq,
	iTransferXLMResp,
	iWalletResp,
	iWTransactionResp
} from "./types";
import { AxiosError } from "axios";
import { buildUrlQuery } from "@/utils";
import { iPostUserSignInErr } from "../users/types";

export type IGetErr = AxiosError<{ status: string }>;
export type IPostErr = AxiosError<{ status: string; message: string }>;

const useGetWallet = ({
	userId,
	options
}: {
	userId?: string;
	options?: UseQueryOptions<iWalletResp, IGetErr>;
}) =>
	useQuery<iWalletResp, IGetErr>({
		queryKey: ["wallet"],
		queryFn: async () => (await api.get(`${API_URL.wallet}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: false
	});

const useGetStellarWallet = ({
	userId,
	options
}: {
	userId?: string;
	options?: UseQueryOptions<iStellarWalletResp, IGetErr>;
}) =>
	useQuery<iStellarWalletResp, IGetErr>({
		queryKey: ["stellarWallet"],
		queryFn: async () => (await api.get(`${API_URL.stellarWallet}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: false
	});

const useGetStellarTransactions = ({
	userId,
	query,
	options
}: {
	userId?: string;
	query?: {
		limit?: number;
		cursor?: string;
	};
	options?: UseQueryOptions<iStellarTransactionResp, IGetErr>;
}) =>
	useQuery<iStellarTransactionResp, IGetErr>({
		queryKey: ["stellarTransactions"],
		queryFn: async () =>
			(
				await api.get(
					`${API_URL.stellarWalletTransactions}/${userId}${buildUrlQuery(
						query
					)}`
				)
			).data,
		...options,
		enabled: !!userId,
		refetchOnMount: false
	});

const useGetWalletTransactions = ({
	userId,
	query,
	options
}: {
	userId?: string;
	query?: {
		limit?: number;
		skip?: number;
	};
	options?: UseQueryOptions<iWTransactionResp, IGetErr>;
}) =>
	useQuery<iWTransactionResp, IGetErr>({
		queryKey: ["wTransactions"],
		queryFn: async () =>
			(
				await api.get(
					`${API_URL.walletTransactions}/${userId}${buildUrlQuery(query)}`
				)
			).data,
		...options,
		enabled: !!userId,
		refetchOnMount: false
	});

const usePostTransferXLM = (
	options?: Omit<
		UseMutationOptions<iTransferXLMResp, IPostErr, iTransferXLMReq>,
		"mutationFn"
	>
) =>
	useMutation<iTransferXLMResp, IPostErr, iTransferXLMReq>({
		mutationFn: async props => (await api.post(API_URL.transferXlm, props)).data,
		...options
	});

export {
	useGetWallet,
	useGetWalletTransactions,
	useGetStellarWallet,
	useGetStellarTransactions,
	usePostTransferXLM
};
