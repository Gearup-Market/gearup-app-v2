import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { iGetListingsResp } from "../../listings/types";
import { IGetErr } from "../../listings";

export const useAdminGetAllListings = (
	options?: Partial<UseQueryOptions<any, any>>
) =>
	useQuery<iGetListingsResp, IGetErr>({
		queryKey: ["adminGetAllListings"],
		queryFn: async () => (await api.get(`${API_URL.adminGetAllListings}`)).data,
		...options,
		refetchOnMount: true
	});

export const useAdminGetAllUserListings = (
	{
		userId
	}: { userId: string },
	options?: UseQueryOptions<iGetListingsResp, IGetErr>
) =>
	useQuery<iGetListingsResp, IGetErr>({
		queryKey: ["adminGetAllUserListings"],
		queryFn: async () => (await api.get(`${API_URL.listingsByUser}/${userId}`)).data,
		...options,
		refetchOnMount: true,
		enabled: !!userId
	});
