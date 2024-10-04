import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../../api";
import { API_URL } from "../../url";
import {
	IGetMessagesResp,
	IGetMessagesErr,
	IGetConversationResp,
	ICreateChatMessageResp,
  IChatMessageReq
} from "./typesx";

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
		...options
	});

  export const useFetchChatMessages = (
    chatId?: string,
    options?: UseQueryOptions<IGetConversationResp, IGetMessagesErr>
  ) =>
    useQuery<IGetConversationResp, IGetMessagesErr>({
      queryKey: ["getUserMessages", chatId],
      queryFn: async () =>
        (await api.post(`${API_URL.getChatMessages(chatId as string)}`)).data,
      refetchOnMount: false,
      enabled: !!chatId,
      retry(failureCount, error) {
        console.log(error,"404 error")
        console.log(failureCount,"failure ocunt")
        if (error.status === 404) return false;
        return failureCount < 3;
      },
      retryDelay(failureCount, error) {
        return failureCount * 1000;
      },
      ...options
    });
  


  export const useCreateChatMessage = (
    options?: UseMutationOptions<ICreateChatMessageResp, IGetMessagesErr, { participants: string[], listingId: string, message: string }>
  ) => {
    return useMutation<ICreateChatMessageResp, IGetMessagesErr, { participants: string[], listingId: string, message: string, chatId?: string }>({
      mutationFn: async ({ participants, listingId, message, chatId }) => {
        // Perform the API call
        if(!!chatId) return
        return (
          await api.post(`${API_URL.createMessages}`, {
            participants,
            listingId,
            message,
          })
        ).data;
      },
      ...options, // Spread the options passed in case you want to override defaults
      mutationKey: ["createChatMessage"], // Optionally define mutation key for caching, etc.
      onMutate: async (variables) => {
        // Optimistically update UI before the mutation happens
        console.log("Sending message:", variables.message);
      },
      onError: (error) => {
        // Handle mutation error
        console.error("Failed to send message:", error);
      },
    });
  };

  export const useAddChatMessage = (
    options?: UseMutationOptions<ICreateChatMessageResp, IGetMessagesErr, IChatMessageReq>
  ) => {
    return useMutation<ICreateChatMessageResp, IGetMessagesErr, IChatMessageReq>({
      mutationFn: async ({ senderId, chatId, message, attachments }) => {
        // Perform the API call
        return (
          await api.post(`${API_URL.addMessage(chatId)}`, {
            senderId, chatId, message, attachments
          })
        ).data;
      },
      ...options, // Spread the options passed in case you want to override defaults
      mutationKey: ["addChatAddMessage"], // Optionally define mutation key for caching, etc.
      onMutate: async (variables) => {
        // Optimistically update UI before the mutation happens
        console.log("Sending message:", variables.message);
      },
      onError: (error) => {
        // Handle mutation error
        console.error("Failed to send message:", error);
      },
    });
  };