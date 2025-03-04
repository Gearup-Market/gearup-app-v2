import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery
} from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import {
	iGetAccountName,
	iGetBanks,
	iPostCheckPinReq,
	iPostCreateAdminMemberErr,
	iPostCreateAdminMemberResp,
	iPostCreateAminMemberReq
} from "./types";

export const usePostCreateAdminMember = (
	options?: Omit<
		UseMutationOptions<
			iPostCreateAdminMemberResp,
			iPostCreateAdminMemberErr,
			iPostCreateAminMemberReq
		>,
		"mutationFn"
	>
) =>
	useMutation<
		iPostCreateAdminMemberResp,
		iPostCreateAdminMemberErr,
		iPostCreateAminMemberReq
	>({
		mutationFn: async props =>
			(await api.post(API_URL.adminCreateMember, props)).data,
		...options
	});

export const useConfirmTransactionPin = (
	options?: Omit<
		UseMutationOptions<
			iPostCreateAdminMemberResp,
			iPostCreateAdminMemberErr,
			iPostCheckPinReq
		>,
		"mutationFn"
	>
) =>
	useMutation<iPostCreateAdminMemberResp, iPostCreateAdminMemberErr, iPostCheckPinReq>({
		mutationFn: async props =>
			(await api.post(API_URL.confirmTransactionPin, props)).data,
		...options
	});

export const useGetBanks = (options?: UseQueryOptions<iGetBanks, any>) =>
	useQuery<iGetBanks, any>({
		queryKey: ["getBanks"],
		queryFn: async () => (await api.get(`${API_URL.getBanks}`)).data,
		...options,
		refetchOnMount: true
	});

export const useGetAccountName = (
	accountNumber?: string,
	bankCode?: string,
	options?: UseQueryOptions<iGetAccountName, any>
) =>
	useQuery<iGetAccountName, any>({
		queryKey: ["getAccountName"],
		queryFn: async () =>
			(
				await api.get(
					`${API_URL.getAccountName}?accountNumber=${accountNumber}&bankCode=${bankCode}`
				)
			).data,
		...options,
		enabled: !!accountNumber && !!bankCode,
		refetchOnMount: true
	});


	export const useDeleteUserById = (
	) =>
		useMutation<any, any, any>({
			mutationFn: async props =>
				(await api.delete(`${API_URL.getAdmin}${props.userId}`, {
					...props
				})).data,
		});