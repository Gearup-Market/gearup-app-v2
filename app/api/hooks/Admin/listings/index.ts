import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { iGetListingsResp } from "../../listings/types";
import { IGetErr } from "../../listings";

export const useAdminGetAllListings = (
	options?: UseQueryOptions<iGetListingsResp, IGetErr>
) =>
	useQuery<iGetListingsResp, IGetErr>({
		queryKey: ["adminGetAllListings"],
		queryFn: async () => (await api.get(`${API_URL.adminGetAllListings}`)).data,
		...options,
		refetchOnMount: true
	});
