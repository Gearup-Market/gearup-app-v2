import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions
} from "@tanstack/react-query";
import {
	iGetListingsResp,
	iPostListingErr,
	iPostListingResp
} from "../../listings/types";
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

export const usePostApproveListing = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, any>({
		mutationFn: async props => {
			const { listingId } = props;
			delete props.listingId;
			return (
				await api.patch(`${API_URL.adminListings}/${listingId}/approve`, props)
			).data;
		},
		...options
	});

export const usePostDeclineListing = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, any>({
		mutationFn: async props => {
			const { listingId } = props;
			delete props.listingId;
			return (
				await api.patch(`${API_URL.adminListings}/${listingId}/decline`, props)
			).data;
		},
		...options
	});
