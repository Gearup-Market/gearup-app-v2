import {
	UseMutationOptions,
	UseQueryOptions,
	useMutation,
	useQuery
} from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import {
	iPostListingResp,
	iPostListingErr,
	iUploadImagesResp,
	iCategoryResp,
	iCategoryDetailedResp,
	iGetListingResp,
	iGetListingsResp
} from "./types";
import { AxiosError } from "axios";

const usePostCreateListing = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, any>({
		mutationFn: async props => (await api.post(API_URL.createListings, props)).data,
		...options
	});

const useUploadFiles = () =>
	useMutation<iUploadImagesResp, iPostListingErr, File[]>({
		mutationFn: async props => {
			const formData = new FormData();
			props.forEach((file, index) => {
				formData.append(`images`, file); // Append each file with a unique key
			});
			return (
				await api.post(API_URL.uploadFiles, formData, {
					headers: {
						"Content-Type": "multipart/form-data"
					}
				})
			).data;
		}
	});

const usePostRemoveListing = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, any>({
		mutationFn: async props => {
			const { listingId } = props;
			delete props.listingId;
			return (await api.post(`${API_URL.deleteListing}/${listingId}`, props)).data;
		},
		...options
	});

const usePostChangeListingStatus = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, any>({
		mutationFn: async props => {
			const { listingId } = props;
			delete props.listingId;
			return (await api.post(`${API_URL.changeListingStatus}/${listingId}`, props))
				.data;
		},
		...options
	});

const usePostChangeUserListingStatus = (
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
				await api.patch(`${API_URL.changeUserListingStatus}/${listingId}`, props)
			).data;
		},
		...options
	});

const usePostSearchListing = (
	options?: Omit<
		UseMutationOptions<iGetListingsResp, iPostListingErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iGetListingsResp, iPostListingErr, any>({
		mutationFn: async props => (await api.post(API_URL.searchListings, props)).data,
		...options
	});

const usePostUpdateListing = (
	options?: Omit<
		UseMutationOptions<iPostListingResp, iPostListingErr, any>,
		"mutationFn"
	>
) =>
	useMutation<iPostListingResp, iPostListingErr, any>({
		mutationFn: async props => {
			const { listingId } = props;
			delete props.listingId;
			return (await api.post(`${API_URL.updateListing}/${listingId}`, props)).data;
		},
		...options
	});

export type IGetErr = AxiosError<{ status: string }>;

const useGetListingById = (
	listingId?: string,
	options?: UseQueryOptions<iGetListingResp, IGetErr>
) =>
	useQuery<iGetListingResp, IGetErr>({
		queryKey: ["listingsById", listingId],
		queryFn: async () => (await api.get(`${API_URL.listingById}/${listingId}`)).data,
		...options,
		enabled: !!listingId,
		refetchOnMount: true
	});

const useGetListings = ({
	userId,
	shouldFetchAll,
	options,
	page = 1,
	subCategory,
	category,
	minPrice,
	maxPrice,
	fields,
	type
}: {
	userId?: string;
	shouldFetchAll?: boolean;
	page?: number;
	subCategory?: string;
	category?: string;
	minPrice?: string;
	maxPrice?: string;
	fields?: Record<string, string[]>;
	type?: string;
	options?: UseQueryOptions<iGetListingsResp, IGetErr>;
}) => {
	const buildQueryParams = () => {
		const params = new URLSearchParams();
		params.append("limit", "12");
		params.append("page", page.toString());

		if (subCategory) params.append("subCategory", subCategory);
		if (category) params.append("category", category);
		if (minPrice) params.append("minPrice", minPrice);
		if (maxPrice) params.append("maxPrice", maxPrice);
		if (type) params.append("type", type);
		// Append fields parameters without encoding
		if (fields) {
			Object.entries(fields).forEach(([key, values]) => {
				params.append(`fields[${key}]`, values.join(","));
			});
		}

		return params.toString().replace(/%20/g, " ");
	};

	return useQuery<iGetListingsResp, IGetErr>({
		queryKey: [
			shouldFetchAll ? "listings" : "listingsByUser",
			category,
			subCategory,
			minPrice,
			maxPrice,
			fields
		],
		queryFn: async () =>
			(
				await api.get(
					shouldFetchAll
						? `${API_URL.listings}?${buildQueryParams()}`
						: `${API_URL.listingsByUser}/${userId}?limit=12&page=${page}`
				)
			).data,
		...options,
		enabled: shouldFetchAll || !!userId,
		refetchOnMount: true
	});
};

const useGetCategories = (options?: UseQueryOptions<iCategoryResp, IGetErr>) =>
	useQuery<iCategoryResp, IGetErr>({
		queryKey: ["category"],
		queryFn: async () => (await api.get(API_URL.categories)).data,
		...options,
		refetchOnMount: true
	});

const useGetCategoriesDetailed = (
	options?: UseQueryOptions<iCategoryDetailedResp, IGetErr>
) =>
	useQuery<iCategoryDetailedResp, IGetErr>({
		queryKey: ["category_detailed"],
		queryFn: async () => (await api.get(API_URL.categoriesDetailed)).data,
		...options,
		refetchOnMount: false
	});

export {
	usePostCreateListing,
	useUploadFiles,
	usePostUpdateListing,
	usePostRemoveListing,
	usePostChangeListingStatus,
	usePostSearchListing,
	useGetListingById,
	useGetListings,
	useGetCategories,
	useGetCategoriesDetailed,
	usePostChangeUserListingStatus
};
