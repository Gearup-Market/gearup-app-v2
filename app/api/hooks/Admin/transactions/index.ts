import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAllTransactions = (options?: UseQueryOptions<any, any>) =>
	useQuery<any, any>({
		queryKey: ["getAllTransactions"],
		queryFn: async () => (await api.get(`${API_URL.getAllTransactions}`)).data,
		...options,
		refetchOnMount: true
	});
