/* eslint-disable prettier/prettier */
// routes/chat.routes.ts
import { Router } from 'express';
import ChatController from '../controller';
import ChatService from '../service';
import { Routes } from '@/types';
import { Server as SocketIOServer } from 'socket.io';
import { logger } from '@/core/utils/logger';
class ChatModule implements Routes {
    public path = '/chats';
    public router: Router = Router();
    private io?: SocketIOServer;
    private chatService?: ChatService;
    private chatController?: ChatController;

    initializeSocket(io: SocketIOServer): void {
        //logger.info('Initializing Socket.IO in Chat Module...');
        this.io = io;
        this.chatService = new ChatService(io);
        this.chatController = new ChatController(this.chatService);
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        if (!this.chatController) {
            throw new Error("ChatController is not initialized");
        }
        // console.log("Registering chat routes...");
        this.router.post(`${this.path}/new`, this.chatController.createConversation);
        this.router.get(`${this.path}//:chatId`, this.chatController.getChat);
        this.router.post(`${this.path}/:chatId/messages`, this.chatController.sendMessage);
        this.router.patch(`${this.path}/:chatId/messages/:messageId/status`, this.chatController.updateMessageStatus);

        this.router.get('/test', (req, res) => {
            res.status(200).json({ message: "Test route working" });
        });
        // console.log("Chat routes registered:", this.router.stack);
        // logger.info("Registering chat routes...");
        this.router.get('/test', (req, res) => {
            res.status(200).json({ message: "Test route working" });
        });

        this.router.patch('/:chatId/messages/:messageId/status', this.chatController.updateMessageStatus);

    }
}
export default ChatModule