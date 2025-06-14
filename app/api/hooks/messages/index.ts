import {
	useMutation,
	UseMutationOptions,
	useQuery,
	UseQueryOptions
} from "@tanstack/react-query";
import { api, queryClient } from "../../api";
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
		staleTime: 0,
		...options
	});

export const useFetchChatMessages = (
	chatId?: string,
	options?: UseQueryOptions<IGetConversationResp, IGetMessagesErr>
) =>
	useQuery<IGetConversationResp, IGetMessagesErr>({
		queryKey: ["getChatMessages", chatId],
		queryFn: async () =>
			(await api.get(`${API_URL.getChatMessages(chatId as string)}`)).data,
		refetchOnMount: true,
		enabled: !!chatId && chatId !== "",
		...options
	});

export const useCreateChatMessage = (
	options?: UseMutationOptions<
		ICreateChatMessageResp,
		IGetMessagesErr,
		{ participants: string[]; listingId: string }
	>
) => {
	return useMutation<
		ICreateChatMessageResp,
		IGetMessagesErr,
		{ participants: string[]; listingId: string }
	>({
		mutationFn: async ({ participants, listingId }) => {
			return (
				await api.post(`${API_URL.createMessages}`, {
					participants,
					listingId
				})
			).data;
		},
		...options,
		mutationKey: ["createChatMessage"]
	});
};

export const useAddChatMessage = (
	options?: UseMutationOptions<ICreateChatMessageResp, IGetMessagesErr, IChatMessageReq>
) => {
	return useMutation<ICreateChatMessageResp, IGetMessagesErr, IChatMessageReq>({
		mutationFn: async ({ senderId, chatId, message, attachments }) => {
			return (
				await api.post(`${API_URL.addMessage(chatId)}`, {
					senderId,
					chatId,
					message,
					attachments
				})
			).data;
		},
		...options,
		mutationKey: ["addChatAddMessage"]
	});
};
