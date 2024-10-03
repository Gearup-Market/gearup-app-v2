import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { IGetAnalyticsErr, iGetAnalyticsResp } from "./types";

export const useFetchUserAnalytics = (
	userId?: string,
	options?: UseQueryOptions<iGetAnalyticsResp, IGetAnalyticsErr>
) =>
	useQuery<iGetAnalyticsResp, IGetAnalyticsErr>({
		queryKey: ["getAnalytics"],
		queryFn: async () => (await api.get(`${API_URL.getAnalytics}/${userId}`)).data,
		...options,
		enabled: !!userId,
		refetchOnMount: true
	});