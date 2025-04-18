import { AxiosError } from "axios";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions
} from "@tanstack/react-query";
import { API_URL } from "@/app/api/url";
import { api } from "@/app/api/api";
import {
	ICreateRoleReq,
	IGetAdminRolesResp,
	IGetAllKycResp,
	IGetAllUsersResp,
	IGetErr,
	IGetKycResp,
	IGetUsersTotalResp,
	iPostAdminSignInErr,
	iPostAdminSignInResp,
	iPostAdminSignInRsq,
	iPostAdminUpdateKycRsq,
	RoleProps
} from "./types";

export const usePostCreateAdminRoles = (
	options?: Omit<
		UseMutationOptions<ICreateRoleReq, AxiosError, ICreateRoleReq>,
		"mutationFn"
	>
) =>
	useMutation<ICreateRoleReq, AxiosError, ICreateRoleReq>({
		mutationFn: async props => {
			const { roleName, permissions } = props;
			return await api.post(`${API_URL.adminSettingsRoles}/create`, {
				roleName,
				permissions: {
					metrics: {
						view: true,
						manage: true
					},
					users: {
						view: true,
						manage: true
					},
					transactions: {
						view: true,
						manage: true
					},
					wallet: {
						view: true,
						manage: true
					}
				}
			});
		},
		...options
	});

export const useGetAdminRoles = (options?: UseQueryOptions<RoleProps[], IGetErr>) =>
	useQuery<RoleProps[], IGetErr>({
		queryKey: ["getAdminRolesAndPermisssions"],
		queryFn: async () => (await api.get(`${API_URL.adminSettingsRoles}`)).data.data,
		...options,
		refetchOnMount: true
	});

export const usePostAdminSignIn = (
	options?: Omit<
		UseMutationOptions<
			iPostAdminSignInResp,
			iPostAdminSignInErr,
			iPostAdminSignInRsq
		>,
		"mutationFn"
	>
) =>
	useMutation<iPostAdminSignInResp, iPostAdminSignInErr, iPostAdminSignInRsq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.adminSignIn, {
					...props
				})
			).data,
		...options
	});

export const usePostDeactivateUser = (
	{ userId }: { userId: string },
	options?: UseMutationOptions<any, any, any>
) =>
	useMutation<any, any, any>({
		mutationFn: async props =>
			(
				await api.post(`${API_URL.adminDeactivateUser}/${userId}/deactivate`, {
					...props
				})
			).data,
		...options
	});

export const usePostAdminUpdateKyc = (
	options?: Omit<
		UseMutationOptions<any, iPostAdminSignInErr, iPostAdminUpdateKycRsq>,
		"mutationFn"
	>
) =>
	useMutation<any, iPostAdminSignInErr, iPostAdminUpdateKycRsq>({
		mutationFn: async props =>
			(
				await api.post(API_URL.adminUpdateKyc, {
					...props
				})
			).data,
		...options
	});
// ----------------------------------------------

export const useGetVerifyAdminToken = ({ token }: { token: string }) => {
	return useQuery<any, any, any>({
		queryKey: ["verifyAdminToken"],
		queryFn: async () => {
			const response = await api.get(`${API_URL.verifyAdminToken}/${token}`);
			return response.data;
		},
		refetchOnMount: true,
		retry: false
	});
};

export const useGetAdmin = (
	{ adminId }: { adminId: string },
	options?: UseQueryOptions<any, any>
) =>
	useQuery<any, any>({
		queryKey: ["admin"],
		queryFn: async () => (await api.get(`${API_URL.getAdmin}${adminId}`)).data,
		...options,
		enabled: !!adminId,
		refetchOnMount: false
	});

export const useGetAllUsers = (
	page: number,
	options?: UseQueryOptions<IGetAllUsersResp, IGetErr>
) =>
	useQuery<IGetAllUsersResp, IGetErr>({
		queryKey: ["getAllAdminUsers"],
		queryFn: async () =>
			(await api.get(`${API_URL.adminGetAllUsers}/all?page=${page}`)).data,
		...options,
		refetchOnMount: true
	});

export const useGetAllKyc = (
	page: number,
	options?: UseQueryOptions<IGetAllKycResp, IGetErr>
) =>
	useQuery<IGetAllKycResp, IGetErr>({
		queryKey: ["getAllKyc"],
		queryFn: async () =>
			(await api.get(`${API_URL.adminGetKycSubmission}/all?page=${page}`)).data,
		...options,
		refetchOnMount: true
	});

export const useGetKyc = (
	{ userId }: { userId: string },
	options?: UseQueryOptions<IGetKycResp, IGetErr>
) =>
	useQuery<IGetKycResp, IGetErr>({
		queryKey: ["getKyc"],
		queryFn: async () =>
			(await api.get(`${API_URL.adminGetKycSubmission}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: false
	});

export const useGetUsersTotal = (
	token: string,
	options?: UseQueryOptions<IGetUsersTotalResp, IGetErr>
) =>
	useQuery<IGetUsersTotalResp, IGetErr>({
		queryKey: ["getUsersCounts"],
		queryFn: async () =>
			(
				await api.get(`${API_URL.adminGetUsersTotal}`, {
					headers: { Authorization: `Bearer ${token}` }
				})
			).data,
		...options,
		refetchOnMount: true
	});

export const useGetAdminDashboard = (
	token: string,
	options?: UseQueryOptions<any, any>
) =>
	useQuery<any, any>({
		queryKey: ["getAdminDashboard"],
		queryFn: async () =>
			(
				await api.get(`${API_URL.adminDashboard}`, {
					headers: { Authorization: `Bearer ${token}` }
				})
			).data,
		...options,
		refetchOnMount: true
	});

export const useGetAdminMembers = (options?: UseQueryOptions<any, any>) =>
	useQuery<any, any>({
		queryKey: ["getAdminMembers"],
		queryFn: async () => (await api.get(`${API_URL.adminMembers}`)).data,
		...options,
		refetchOnMount: true
	});

export const usePostUpdateAdmin = (options?: UseMutationOptions<any, AxiosError, any>) =>
	useMutation<any, AxiosError, any>({
		mutationFn: async props =>
			(
				await api.post(API_URL.updateAdminUser, {
					...props
				})
			).data.data,
		...options
	});
