import { useFetchChatMessages, useGetUserMessages } from "@/app/api/hooks/messages";
import { useAppSelector } from "@/store/configureStore";

export const useMessages = () => {
	const {userId} = useAppSelector(state => state.user);
	const { data, isFetching } = useGetUserMessages(userId);
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
