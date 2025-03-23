"use client";
import { queryClient } from "@/app/api";
import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import { addChatMessage, ChatMessage } from "@/store/slices/messagesSlice";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL_SOCKET;

export const useChatSocket = (chatId?: string) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { userId } = useAppSelector(state => state.user);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!chatId) return;

		const socketInstance = io(SOCKET_SERVER_URL, {
			withCredentials: true,
			transports: ["websocket"]
		});

		if (!socketInstance.connected) {
			socketInstance.connect();
		}

		socketInstance.on("connect", () => {
			console.log("Connected to server with socket id:", socketInstance.id);
			socketInstance.emit("userConnected", userId);
		});

		// Listen for new messages
		socketInstance.on("newMessage", ({ chatId, message }) => {
			const chatMessage: ChatMessage = {
				_id: message._id,
				sender: {
					_id: message.sender._id,
					userId: message.sender.userId,
					email: message.sender.email,
					password: "",
					userName: message.sender.userName,
					isVerified: true,
					createdAt: new Date().toISOString(),
					__v: 0,
					id: message.sender._id
				},
				message: message.message,
				status: "sent",
				timestamp: message.timestamp || new Date().toISOString(),
				attachment: message.attachments || []
			};
			dispatch(addChatMessage(chatMessage));
		});

		// Listen for all messages for a specific chat
		socketInstance.on("allMessages", messages => {
			console.log("Received all messages for chatId:", chatId);
			queryClient.setQueryData(["getChatMessages", chatId], { data: messages });
		});

		// Listen for message status updates
		socketInstance.on("messageStatusUpdated", ({ chatId, messageId, status }) => {
			console.log("Message status updated:", messageId, "to", status);
			queryClient.setQueryData(["getChatMessages", chatId], (oldData: any) => ({
				...oldData,
				data: oldData.data.map((msg: any) =>
					msg._id === messageId ? { ...msg, status } : msg
				)
			}));
		});

		// Handle errors from the server
		socketInstance.on("error", error => {
			console.error("Socket error:", error.message);
		});

		setSocket(socketInstance);

		// Join the chat room
		socketInstance.emit("joinChat", chatId);

		return () => {
			socketInstance.disconnect();
		};
	}, [chatId, userId]);

	// Function to send a message
	const sendMessage = (message: string) => {
		if (socket) {
			socket.emit("sendMessage", { chatId, message, senderId: userId });
		}
	};

	// Function to get messages for the chat
	const getMessages = () => {
		if (socket) {
			socket.emit("getMessages", chatId);
		}
	};

	// Function to update message status
	const updateMessageStatus = (messageId: string, newStatus: string) => {
		if (socket) {
			socket.emit("updateMessage", { chatId, messageId, newStatus });
		}
	};

	return { socket, sendMessage, getMessages, updateMessageStatus };
};
