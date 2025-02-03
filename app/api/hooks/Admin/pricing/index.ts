import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions
} from "@tanstack/react-query";
import { PricingData } from "./types";

export const useGetAllPricings = (options?: UseQueryOptions<PricingData, Error>) =>
	useQuery<PricingData, Error>({
		queryKey: ["getAllPricings"],
		queryFn: async () => (await api.get(API_URL.getAllPricings)).data,
		...options,
		refetchOnMount: true
	});

export const usePostPricing = (
	options?: UseMutationOptions<PricingData, Error, PricingData>
) =>
	useMutation<PricingData, Error, PricingData>({
		mutationFn: async props => (await api.put(API_URL.updatePricing, props)).data,
		...options
	});
