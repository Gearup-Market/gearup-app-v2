import { useFetchChatMessages, useGetUserMessages } from "@/app/api/hooks/messages";
import { useAppSelector, useAppDispatch } from "@/store/configureStore";
import { setAllMessages, setCurrentChatMessages } from "@/store/slices/messagesSlice";
import { useEffect } from "react";

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

	const currentMessages = useAppSelector(s => s.messages.currentChatMessages);

	// if (chatMessages) {
	//     dispatch(setCurrentChatMessages(chatMessages?.data));
	// }

	useEffect(() => {
		if (
			chatMessages &&
			chatMessages.data &&
			chatMessages.data._id !== currentMessages._id
		) {
			dispatch(setCurrentChatMessages(chatMessages.data));
		}
	}, [chatMessages, currentMessages, dispatch]);

	return {
		chatMessages: chatMessages?.data,
		isFetching,
		refetch,
		isLoading
	};
};
