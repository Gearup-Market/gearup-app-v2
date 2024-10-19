import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { IGetAnalyticsErr, iGetAnalyticsResp, iGetSalesAnalyticsResp, SalesAnalyticsData } from "./types";

export const useFetchUserAnalytics = (
	userId?: string,
	options?: UseQueryOptions<iGetAnalyticsResp, IGetAnalyticsErr>
) =>
	useQuery<iGetAnalyticsResp, IGetAnalyticsErr>({
		queryKey: ["getTransactionsAnalytics"],
		queryFn: async () => (await api.get(`${API_URL.getTransactionsAnalytics}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: true
	});

export const useFetchUserSalesAnalytics = (
	userId?: string,
	options?: UseQueryOptions<SalesAnalyticsData, IGetAnalyticsErr>
) =>
	useQuery<SalesAnalyticsData, IGetAnalyticsErr>({
		queryKey: ["getSalesAnalytics"],
		queryFn: async () => (await api.get(`${API_URL.getSalesAnalytics}/${userId}`)).data.data,
		...options,
		enabled: !!userId,
		refetchOnMount: true
	});