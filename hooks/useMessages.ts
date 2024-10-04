import { useFetchChatMessages, useGetUserMessages } from "@/app/api/hooks/messages";
import { useAuth } from "@/contexts/AuthContext";

export const useMessages = () => {
	const { user } = useAuth();
	const { data, isFetching } = useGetUserMessages(user?._id);
	return {
		allUserMessages: data?.data || [],
		isFetchingAllUserMessages: isFetching
	};
};

export const useCurrentChatMessages = ({ chatId }: { chatId?: string }) => {
	const { data: chatMessages, isFetching: fetchingChatMessages } = useFetchChatMessages(
		chatId as string
	);
	return {
		currentChatMessages: chatMessages,
		fetchingCurrentChatMessages: fetchingChatMessages
	};
};
