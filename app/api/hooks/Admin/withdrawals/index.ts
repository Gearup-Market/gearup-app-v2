import { API_URL } from "@/app/api/url";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions
} from "@tanstack/react-query";
import { api } from "@/app/api/api";
import {
	IGetAllWithdraw,
	IGetErr,
	iPostWithdrawalRequestErr,
	iPostWithdrawalRequestResp,
	iPostWithdrawalRequestRsq
} from "./types";

export const useGetAllWithdrawals = (
	options?: UseQueryOptions<IGetAllWithdraw, IGetErr>
) =>
	useQuery<IGetAllWithdraw, IGetErr>({
		queryKey: ["getAllWithdrawals"],
		queryFn: async () =>
			(await api.get(`${API_URL.adminGetAllWithdraws}?limit=100`)).data,
		...options,
		refetchOnMount: true
	});

export const usePostWithdrawalRequest = (
	options?: UseMutationOptions<
		iPostWithdrawalRequestResp,
		iPostWithdrawalRequestErr,
		iPostWithdrawalRequestRsq & { id: string }
	>
) =>
	useMutation<
		iPostWithdrawalRequestResp,
		iPostWithdrawalRequestErr,
		iPostWithdrawalRequestRsq & { id: string }
	>({
		mutationFn: async ({ id, ...props }) =>
			(
				await api.patch(`${API_URL.adminGetAllWithdraws}/${id}`, {
					...props
				})
			).data,
		...options
	});
