"use client";
import { queryClient } from "@/app/api";
import { useAppSelector } from "@/store/configureStore";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL_SOCKET;

export const useChatSocket = (chatId?: string) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const { userId } = useAppSelector((state) => state.user)

	useEffect(() => {
		if (!chatId) return;

		// Establish socket connection
		const socketInstance = io(SOCKET_SERVER_URL,{
			withCredentials: true,
			transports: ["websocket"]
		});

		socketInstance.on("connect",()=>{
			console.log("connected to server with socket id:", socketInstance.id)
		})


		setSocket(()=>socketInstance);

		// Join a specific chat room and listen for new messages
		if (chatId) {
			socketInstance.emit("joinChat", chatId);
			socketInstance.on("getMessages", message => {
				queryClient.setQueryData(["getChatMessages", chatId], (oldData: any) => {
					return {
						...oldData,
						data: message
					};
				});
			});
		}
		// Listen for chat overview updates (all chats)
		socketInstance.on("getMessages", newChatData => {
			console.log("socket message==>", newChatData);
			queryClient.setQueryData(["getUserMessages", userId], (oldData: any) => {
				return {
					...oldData,
					data: oldData?.data?.map((chat: any) =>
						chat._id === newChatData._id ? newChatData : chat
					)
				};
			});
		});
		// Handle errors
		socketInstance.on("connect_error", err => {
			console.error("Socket connection error:", err);
		});

		//  Cleanup on unmount or when chatId changes
		return () => {
			socketInstance.disconnect();
		};
	}, [chatId, userId]);

	return { socket };
};
