import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import { IGetMessagesResp, IGetMessagesErr } from "./typesx";

export const useGetUserMessages = (
  userId?: string,
  options?: UseQueryOptions<IGetMessagesResp, IGetMessagesErr>
) =>
  useQuery<IGetMessagesResp, IGetMessagesErr>({
    queryKey: ["getUserMessages", userId],
    queryFn: async () =>
      (await api.get(`${API_URL.getUserMessages(userId as string)}`)).data, 
    refetchOnMount: true, 
    enabled: !!userId,
    ...options, 
  });
