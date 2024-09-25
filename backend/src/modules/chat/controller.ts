/* eslint-disable prettier/prettier */
// controllers/chat.controller.ts
import { Request, Response, NextFunction } from 'express';
import ChatService from './service';

class ChatController {
    private chatService: ChatService;

    constructor(chatService: ChatService) {
        this.chatService = chatService;
    }

    // Create a new chat conversation
    public createConversation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { participants } = req.body;
            const conversation = await this.chatService.createChat(participants);
            res.status(201).json({ success: true, data: conversation });
        } catch (error) {
            next(error);
        }
    };

    // Get all messages from a specific chat
    public getChat = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { chatId } = req.params;
            const chat = await this.chatService.getMessages(chatId);
            res.status(200).json({ success: true, data: chat });
        } catch (error) {
            next(error);
        }
    };

    // Send a new message in a specific chat
    public sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { chatId } = req.params;
            const { message, senderId } = req.body;
            const updatedChat = await this.chatService.addMessage(chatId, message, senderId);
            res.status(201).json({ success: true, data: updatedChat });
        } catch (error) {
            next(error);
        }
    };

    // Update the status of a specific message in a chat
    public updateMessageStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { chatId, messageId } = req.params;
            const { status } = req.body;
            await this.chatService.updateMessageStatus(chatId, messageId, status);
            res.status(200).json({ success: true, message: 'Message status updated successfully' });
        } catch (error) {
            next(error);
        }
    };

}

export default ChatController;
