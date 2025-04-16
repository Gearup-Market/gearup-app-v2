import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { iGetListingsResp } from "../../listings/types";
import { IGetErr } from "../../listings";

export const useAdminGetAllListings = (
	{ page }: { page: number },
	options?: Partial<UseQueryOptions<any, any>>
) =>
	useQuery<iGetListingsResp, IGetErr>({
		queryKey: ["adminGetAllListings"],
		queryFn: async () =>
			(await api.get(`${API_URL.adminGetAllListings}?page=${page}`)).data,
		...options,
		refetchOnMount: true
	});

export const useAdminGetAllUserListings = (
	{ userId, page }: { userId: string; page: number },
	options?: UseQueryOptions<iGetListingsResp, IGetErr>
) =>
	useQuery<iGetListingsResp, IGetErr>({
		queryKey: ["adminGetAllUserListings"],
		queryFn: async () =>
			(await api.get(`${API_URL.listingsByUser}/${userId}?page=${page}`)).data,
		...options,
		refetchOnMount: true,
		enabled: !!userId
	});
