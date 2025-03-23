import { iPostListingResp } from "@/app/api/hooks/listings/types";
import {
	IGetConversationResp,
	ListingItem,
	Message
} from "@/app/api/hooks/messages/typesx";
import { UserUpdateResp } from "@/app/api/hooks/users/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MessageData {
	_id: string;
	participants: UserUpdateResp[];
	listingItem: ListingItem;
	messages: Message[];
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface ChatMessage {
	_id: string;
	sender: {
		_id: string;
		userId: string;
		email: string;
		password: string;
		userName: string;
		isVerified: boolean;
		createdAt: string;
		__v: number;
		id: string;
	};
	message: string;
	status: string;
	timestamp: string;
	attachment: any[];
}

export interface IGetConversationMessage {
	_id: string;
	participants: string[];
	listingItem: iPostListingResp;
	messages: ChatMessage[];
	createdAt: string;
	updatedAt: string;
	__v: number;
	id: string;
	messageCount: number;
}

interface MessagesState {
	allMessages: MessageData[];
	currentChatMessages: IGetConversationMessage;
}

const initialState: MessagesState = {
	allMessages: [],
	currentChatMessages: {
		_id: "",
		participants: [],
		listingItem: {} as iPostListingResp,
		messages: [],
		createdAt: "",
		updatedAt: "",
		__v: 0,
		id: "",
		messageCount: 0
	}
};

const messagesSlice = createSlice({
	name: "messages",
	initialState,
	reducers: {
		setAllMessages(state, action: PayloadAction<MessageData[]>) {
			state.allMessages = action.payload;
		},
		setCurrentChatMessages(state, action: PayloadAction<IGetConversationMessage>) {
			state.currentChatMessages = action.payload;
		},
		addChatMessage(state, action: PayloadAction<ChatMessage>) {
			state.currentChatMessages.messages = [
				...state.currentChatMessages.messages,
				action.payload
			];
		},
		clearMessages: () => initialState
	}
});

export const { setAllMessages, setCurrentChatMessages, addChatMessage, clearMessages } =
	messagesSlice.actions;

export default messagesSlice.reducer;
