/* eslint-disable prettier/prettier */
// services/chat.service.ts
import { Server as SocketIOServer } from 'socket.io';
import chatModel from '../chat/models/chat';
import { Chat, MessageStatus } from './types';  // Adjust this import according to your actual types
import { Document } from 'mongoose';
import { HttpException } from '@/core/exceptions/HttpException';

class ChatService {
    private io: SocketIOServer;
    private chat = chatModel;

    constructor(io: SocketIOServer) {
        this.io = io;
        this.initializeSocketEvents();
    }

    private initializeSocketEvents(): void {
        try {
            this.io.on('connection', (socket) => {
                console.log('New client connected:', socket.id);

                socket.on('joinChat', (chatId: string) => {
                    socket.join(chatId);
                    console.log(`User ${socket.id} joined chat ${chatId}`);
                });

                socket.on('disconnect', () => {
                    console.log('User disconnected:', socket.id);
                });
            });
        } catch (error) {
            throw new HttpException(500, error?.message);

        }
    }

    public createChat = async (participants: string[]): Promise<Chat> => {
        try {
            const newChat = await this.chat.create({
                participants,
                messages: []
            });

            // Emit an event for chat creation
            this.io.emit('chatCreated', newChat);

            // Convert Mongoose document to a plain object to satisfy the TypeScript interface expectations
            return newChat.toObject();
        } catch (error) {
            throw new HttpException(500, error?.message);

        }
    };

    public addMessage = async (chatId: string, message: string, senderId: string): Promise<Chat> => {
        try {
            const updatedChat = await this.chat.findByIdAndUpdate(
                chatId,
                { $push: { messages: { sender: senderId, message, timestamp: new Date() } } },
                { new: true }
            ).populate('messages') as Chat; // Asserting the type to be Chat

            // Emit the new message to all clients in the chat room
            this.io.to(chatId).emit('newMessage', updatedChat);
            return updatedChat;
        } catch (error) {
            throw new HttpException(500, error?.message);

        }
    };

    public getMessages = async (chatId: string): Promise<Chat> => {
        try {
            const chat = await this.chat.findById(chatId)
                .populate('participants')
                .populate('messages.sender');
            if (!chat) {
                throw new Error('Chat not found');
            }
            return chat.toObject({ virtuals: true });  // Converting to plain object, including resolving any virtuals
        } catch (error) {
            throw new HttpException(500, error?.message);

        }
    };

    // New method to handle real-time updates of message status
    public updateMessageStatus = async (chatId: string, messageId: string, status: MessageStatus): Promise<void> => {
        try {
            await this.chat.updateOne({
                "_id": chatId,
                "messages._id": messageId
            }, {
                "$set": {
                    "messages.$.status": status
                }
            });

            // Since the above operation does not return a document, you can emit without returning it
            this.io.to(chatId).emit('messageStatusUpdated', {
                messageId: messageId,
                status: status
            });
        } catch (error) {
            throw new HttpException(500, error?.message);

        }
    };
}

export default ChatService;
