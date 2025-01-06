"use client";
import { queryClient } from "@/app/api";
import { useAppSelector } from "@/store/configureStore";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL_SOCKET;

export const useChatSocket = (chatId?: string) => {
	const { userId } = useAppSelector((state) => state.user);
	
  let socket: Socket | null = null;

  useEffect(() => {
    const socketInstance = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketInstance.on("userConnected", (userId) => {
      console.log("Connected to server with socket id:", socketInstance.id);
    });

    socketInstance.emit("userConnected", { userId });

    if (chatId) {
      socketInstance.emit("joinChat", chatId);
    }

    socketInstance.on("getMessages", (data) => {
      if (data.chatId && data.message) {
        queryClient.setQueryData(["getChatMessages", data.chatId], (oldData: any) => ({
          ...oldData,
          data: data.message,
        }));
      } else if (data.newChatData) {
        queryClient.setQueryData(["getUserMessages", userId], (oldData: any) => ({
          ...oldData,
          data: oldData?.data?.map((chat: any) =>
            chat._id === data.newChatData._id ? data.newChatData : chat
          ),
        }));
      }
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      socketInstance.off("userConnected");
      socketInstance.off("getMessages");
      socketInstance.off("connect_error");
      socketInstance.disconnect();
    };
  }, [chatId, userId, queryClient]);

  return { socket };
};
