'use client';
import { queryClient } from '@/app/api';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const useChatSocket = (chatId?: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {user} = useAuth();

  useEffect(() => {
    if(!chatId) return;
    // Establish socket connection
    const socketInstance = io(SOCKET_SERVER_URL);
    setSocket(socketInstance);

    // Listen for all chats overview updates
    socketInstance.on('chatOverviewUpdate', (newChatData) => {
      console.log("i was listienrr1")
      queryClient.setQueryData(["getUserMessages", user?._id], (oldData: any) => {
        return oldData.map((chat: any) =>
          chat._id === newChatData._id ? newChatData : chat
        );
      });
    });

    // Listen for updates to the specific chat if chatId is passed
    if (chatId) {
      console.log("i was listienrr2")
      socketInstance.emit('joinChat', chatId); // Join a specific chat room
      socketInstance.on('newMessage', (message) => {
        queryClient.setQueryData(["getChatMessages", chatId], (oldData: any) => {
          return [...oldData, message];
        });
      });
    }

    return () => {
      socketInstance.disconnect();
    };
  }, [chatId, queryClient]);

  return { socket };
};
