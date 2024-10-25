
import { AxiosError } from "axios";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions
} from "@tanstack/react-query";
import { API_URL } from "@/app/api/url";
import { api } from "@/app/api/api";
import { ICreateRoleReq, IGetAdminRolesResp, IGetAllUsersResp, IGetErr, IGetUsersTotalResp, RoleProps } from "./types";


export const usePostCreateAdminRoles = (
    options?: Omit<UseMutationOptions<ICreateRoleReq, AxiosError, ICreateRoleReq>, "mutationFn">
) =>
    useMutation<ICreateRoleReq, AxiosError, ICreateRoleReq>({
        mutationFn: async props => {
            const { roleName, permissions } = props;
            return await api.post(API_URL.adminSettingsRoles, { roleName });
        },
        ...options
    });

    export const useGetAdminRoles = (
        options?: UseQueryOptions<RoleProps[], IGetErr>
    ) =>
        useQuery<RoleProps[], IGetErr>({
            queryKey: ["getAdminRolesAndPermisssions"],
            queryFn: async () => (await api.get(`${API_URL.adminSettingsRoles}`)).data.data,
            ...options,
            refetchOnMount: true
        });



        export const useGetAllUsers = (
            options?: UseQueryOptions<IGetAllUsersResp, IGetErr>
        ) =>
            useQuery<IGetAllUsersResp, IGetErr>({
                queryKey: ["getAllAdminUsers"],
                queryFn: async () => (await api.get(`${API_URL.adminGetAllUsers}/all`)).data,
                ...options,
                refetchOnMount: true
            });

        export const useGetUsersTotal= (
            options?: UseQueryOptions<IGetUsersTotalResp, IGetErr>
        ) =>
            useQuery<IGetUsersTotalResp, IGetErr>({
                queryKey: ["getUsersCounts"],
                queryFn: async () => (await api.get(`${API_URL.adminGetUsersTotal}`)).data,
                ...options,
                refetchOnMount: true
            });
           