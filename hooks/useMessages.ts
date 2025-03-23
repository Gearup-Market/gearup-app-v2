import { useFetchChatMessages, useGetUserMessages } from "@/app/api/hooks/messages";
import { useAppSelector, useAppDispatch } from "@/store/configureStore";
import { setAllMessages, setCurrentChatMessages } from "@/store/slices/messagesSlice";

export const useMessages = () => {
	const dispatch = useAppDispatch();
	const { userId } = useAppSelector(state => state.user);
	const { data, isFetching } = useGetUserMessages(userId);

	// Dispatch action to set all user messages
	if (data) {
		dispatch(setAllMessages(data.data));
	}

	return {
		allUserMessages: data?.data || [],
		isFetchingAllUserMessages: isFetching
	};
};

export const useCurrentChatMessages = ({ chatId }: { chatId?: string }) => {
	const dispatch = useAppDispatch();
	const {
		data: chatMessages,
		isFetching,
		refetch,
		isLoading
	} = useFetchChatMessages(chatId as string);

	// Dispatch action to set current chat messages
	if (chatMessages) {
		dispatch(setCurrentChatMessages(chatMessages?.data));
	}

	return {
		chatMessages: chatMessages?.data,
		isFetching,
		refetch,
		isLoading
	};
};
