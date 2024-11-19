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
	IGetAllUsersResp,
	IGetErr,
	IGetUsersTotalResp,
	iPostAdminSignInErr,
	iPostAdminSignInResp,
	iPostAdminSignInRsq,
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

export const useGetAllUsers = (options?: UseQueryOptions<IGetAllUsersResp, IGetErr>) =>
	useQuery<IGetAllUsersResp, IGetErr>({
		queryKey: ["getAllAdminUsers"],
		queryFn: async () => (await api.get(`${API_URL.adminGetAllUsers}/all`)).data,
		...options,
		refetchOnMount: true
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
