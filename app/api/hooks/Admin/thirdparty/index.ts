import { api } from "@/app/api/api";
import { API_URL } from "@/app/api/url";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetAllThirdPartyRequests = (
    { page, status }: { page?: number, status?: string },
    options?: Partial<UseQueryOptions<any, any>>
) =>
    useQuery<any, any>({
        queryKey: ["getAllTransactions"],
        queryFn: async () =>
            (await api.get(`${API_URL.getAllThirdPartyRequests}?page=${page}&status=${status}`)).data,
        ...options,
        refetchOnMount: true
    });